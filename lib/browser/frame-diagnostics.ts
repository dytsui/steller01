"use client";

import type { ScreenDiagnostics } from "@/lib/analysis/types";
import { clamp, round } from "@/lib/utils";

function metricsFromPixels(data: Uint8ClampedArray, width: number, height: number) {
  const luminance = new Array<number>(width * height);
  let sum = 0;
  let brightPixels = 0;
  let edgeEnergy = 0;

  for (let i = 0; i < data.length; i += 4) {
    const luma = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
    const idx = i / 4;
    luminance[idx] = luma;
    sum += luma;
    if (luma > 0.92) brightPixels += 1;
  }

  const mean = sum / luminance.length;
  let variance = 0;
  const rows = new Array<number>(height).fill(0);

  for (let y = 0; y < height; y += 1) {
    let rowSum = 0;
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const value = luminance[idx];
      variance += (value - mean) ** 2;
      rowSum += value;

      if (x < width - 1 && y < height - 1) {
        const dx = Math.abs(value - luminance[idx + 1]);
        const dy = Math.abs(value - luminance[idx + width]);
        edgeEnergy += dx + dy;
      }
    }
    rows[y] = rowSum / width;
  }

  let rowVariance = 0;
  const rowMean = rows.reduce((a, b) => a + b, 0) / rows.length;
  for (const row of rows) rowVariance += (row - rowMean) ** 2;

  const borderSize = Math.max(6, Math.round(Math.min(width, height) * 0.05));
  let borderEnergy = 0;
  let innerEnergy = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = y * width + x;
      const boundary = x < borderSize || y < borderSize || x >= width - borderSize || y >= height - borderSize;
      const local = luminance[idx];
      const next = luminance[Math.min(idx + 1, luminance.length - 1)];
      const e = Math.abs(local - next);
      if (boundary) borderEnergy += e;
      else innerEnergy += e;
    }
  }

  return {
    brightnessMean: mean,
    contrast: Math.sqrt(variance / luminance.length),
    glareRatio: brightPixels / luminance.length,
    edgeDensity: clamp(edgeEnergy / luminance.length * 2, 0, 1),
    borderConfidence: clamp(borderEnergy / Math.max(innerEnergy, 0.001), 0, 1),
    bandingScore: clamp(rowVariance * 9, 0, 1)
  };
}

function estimateSubjectScale(data: Uint8ClampedArray, width: number, height: number) {
  const cx1 = Math.floor(width * 0.2);
  const cx2 = Math.floor(width * 0.8);
  const cy1 = Math.floor(height * 0.1);
  const cy2 = Math.floor(height * 0.95);

  let active = 0;
  let total = 0;
  for (let y = cy1; y < cy2; y += 1) {
    for (let x = cx1; x < cx2; x += 1) {
      const idx = (y * width + x) * 4;
      const luma = (0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2]) / 255;
      if (luma < 0.7 && luma > 0.08) active += 1;
      total += 1;
    }
  }
  return clamp(active / total * 1.25, 0, 1);
}

export async function sampleVideoDiagnostics(file: File): Promise<ScreenDiagnostics> {
  const url = URL.createObjectURL(file);
  const video = document.createElement("video");
  video.src = url;
  video.muted = true;
  video.playsInline = true;

  await new Promise<void>((resolve, reject) => {
    video.onloadeddata = () => resolve();
    video.onerror = () => reject(new Error("Failed to load video"));
  });

  const width = Math.max(320, video.videoWidth || 640);
  const height = Math.max(180, video.videoHeight || 360);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas not supported");

  const positions = [0.08, 0.25, 0.5, 0.75, 0.92];
  const samples = [];

  for (const position of positions) {
    video.currentTime = Math.max(0, Math.min((video.duration || 1) * position, (video.duration || 1) - 0.05));
    await new Promise<void>((resolve) => {
      video.onseeked = () => resolve();
    });
    ctx.drawImage(video, 0, 0, width, height);
    const image = ctx.getImageData(0, 0, width, height);
    const base = metricsFromPixels(image.data, width, height);
    samples.push({
      ...base,
      subjectScale: estimateSubjectScale(image.data, width, height)
    });
  }

  URL.revokeObjectURL(url);

  const aggregate = samples.reduce((acc, item) => {
    Object.entries(item).forEach(([key, value]) => {
      acc[key as keyof typeof item] = ((acc[key as keyof typeof item] ?? 0) + value) as never;
    });
    return acc;
  }, {} as Record<string, number>);

  const mean = Object.fromEntries(
    Object.entries(aggregate).map(([key, value]) => [key, value / samples.length])
  ) as Record<string, number>;

  const anglePenalty = clamp(
    Math.abs(samples[0].borderConfidence - samples[samples.length - 1].borderConfidence) * 0.4 +
      Math.max(0, 0.36 - mean.edgeDensity),
    0,
    1
  );

  return {
    brightnessMean: round(mean.brightnessMean, 3),
    contrast: round(mean.contrast, 3),
    glareRatio: round(mean.glareRatio, 3),
    edgeDensity: round(mean.edgeDensity, 3),
    borderConfidence: round(mean.borderConfidence, 3),
    subjectScale: round(mean.subjectScale, 3),
    anglePenalty: round(anglePenalty, 3),
    bandingScore: round(mean.bandingScore, 3),
    warnings: []
  };
}
