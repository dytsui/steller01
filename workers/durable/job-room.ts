import type { JobProgressState } from "../types";

export class JobRoom {
  private snapshot: JobProgressState | null = null;

  setProgress(state: JobProgressState) {
    this.snapshot = state;
    return this.snapshot;
  }

  getProgress() {
    return this.snapshot;
  }

  clear() {
    this.snapshot = null;
  }
}
