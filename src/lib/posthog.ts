import { env } from "@/config/env";
import { PostHog } from "posthog-node";

export default function PostHogClient() {
  const posthogKey = env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!posthogKey) {
    throw new Error("NEXT_PUBLIC_POSTHOG_KEY is not defined.");
  }

  const posthogClient = new PostHog(posthogKey, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  return posthogClient;
}
