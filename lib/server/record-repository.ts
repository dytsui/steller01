import records from "@/data/demo/records.json";
import type { DemoRecord } from "@/lib/types";

export function listDemoRecords() {
  return records as DemoRecord[];
}

export function getDemoRecordById(recordId: string) {
  return (records as DemoRecord[]).find((item) => item.id === recordId) ?? null;
}
