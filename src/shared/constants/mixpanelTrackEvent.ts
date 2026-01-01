export const MIXPANEL_EVENT = {
  SESSION_START: "session_start",
  HOME_MAIN_APPEAR: "home_main_appear",
  HOME_CATEGORY_CLICK: "home_category_click",
  HOME_NAV_SUBSCRIBE_CLICK: "home_nav_subscribe_click",
  HOME_MAIN_SUBSCRIBE_CLICK: "home_main_subscribe_click",
  SUBSCRIBE_CATEGORY_CHECK: "subscribe_category_check",
  SUBSCRIBE_CATEGORY_CLICK: "subscription_category_click",
  SUBSCRIBE_SUBMIT_BUTTON_CLICK: "subscription_submit_button_click",
} as const;

export type MixpanelEvent =
  (typeof MIXPANEL_EVENT)[keyof typeof MIXPANEL_EVENT];
