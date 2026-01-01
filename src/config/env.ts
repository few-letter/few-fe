export const env = {
  MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? "",
  ENABLE_MIXPANEL: process.env.NEXT_PUBLIC_ENABLE_MIXPANEL === "true",
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? "",
} as const;
