interface CloudflareEnv {
  APP_NAME: string;
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_DEFAULT_LOCALE: "en" | "zh-CN";
  NEXT_PUBLIC_ENABLE_DEMO_DATA: "0" | "1";
  EXTERNAL_ANALYSIS_ENDPOINT?: string;
  EXTERNAL_ANALYSIS_TOKEN?: string;
  LLM_REPORT_ENDPOINT?: string;
  LLM_REPORT_TOKEN?: string;
  GEMINI_MODEL?: string;
  GEMINI_API_BASE?: string;
  GEMINI_API_KEY?: string;
  GOOGLE_API_KEY?: string;
  DB?: D1Database;
  VIDEOS_BUCKET?: R2Bucket;
  EXPORTS_BUCKET?: R2Bucket;
  ANALYSIS_QUEUE?: Queue;
  JOB_ROOM?: DurableObjectNamespace;
  ASSETS?: Fetcher;
}
