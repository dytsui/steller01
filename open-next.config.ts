import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  default: {
    override: {
      incrementalCache: async () => ({
        get: async () => null,
        set: async () => undefined,
        revalidateTag: async () => undefined
      })
    }
  }
});
