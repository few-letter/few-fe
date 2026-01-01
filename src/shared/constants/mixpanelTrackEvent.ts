export const MIXPANEL_EVENT = {
  SESSION_START: "session_start",
  HOME_MAIN_APPEAR: "home_main_appear",
  HOME_CATEGORY_CLICK: "home_category_click",
  HOME_NAV_SUBSCRIBE_CLICK: "home_nav_subscribe_click",
  HOME_MAIN_SUBSCRIBE_CLICK: "home_main_subscribe_click",
} as const;

export type MixpanelEvent =
  (typeof MIXPANEL_EVENT)[keyof typeof MIXPANEL_EVENT];
