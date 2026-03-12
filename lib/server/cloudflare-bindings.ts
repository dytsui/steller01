export type CloudflareRuntimeBindings = Partial<CloudflareEnv>;

export function getCloudflareBindings(): CloudflareRuntimeBindings {
  const globalEnv = (globalThis as { __ENV__?: CloudflareRuntimeBindings }).__ENV__;
  return globalEnv ?? {};
}

export function canUseExternalAnalysis(bindings = getCloudflareBindings()) {
  return Boolean(bindings.EXTERNAL_ANALYSIS_ENDPOINT);
}

export function canUseLLMReport(bindings = getCloudflareBindings()) {
  return Boolean(bindings.LLM_REPORT_ENDPOINT);
}
