import mixpanel from "mixpanel-browser";

export class MixpanelService {
  private static instance: MixpanelService;
  private static isProduction = process.env.NODE_ENV === "production";

  constructor() {
    if (!process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
      throw new Error("NEXT_PUBLIC_MIXPANEL_TOKEN is not set");
    }

    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
      debug: !MixpanelService.isProduction,
      track_pageview: "full-url",
      persistence: "localStorage",
      //SessionReplay
      record_sessions_percent: MixpanelService.isProduction ? 100 : 0,
      record_idle_timeout_ms: 1800000, //30minutes
      record_max_ms: 3600000, // 1 hour
      autocapture: false,
      record_heatmap_data: true,
    });
  }

  public static getInstance(): MixpanelService {
    if (!MixpanelService.instance) {
      MixpanelService.instance = new MixpanelService();
    }
    return MixpanelService.instance;
  }

  public startSession() {
    mixpanel.track("session_start", {
      page: window.location.pathname,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
    });
  }

  public track(event: string, properties?: Record<string, unknown>) {
    mixpanel.track(event, properties);
  }

  public trackPageView(pageName: string) {
    mixpanel.track_pageview({
      page: pageName,
    });
  }

  public identifySubscriber(email: string) {
    mixpanel.identify(email);
    mixpanel.people.set({
      $email: email,
      subscription_date: new Date().toISOString(),
    });
  }

  public startSessionRecording() {
    mixpanel.start_session_recording();
  }

  public stopSessionRecording() {
    mixpanel.stop_session_recording();
  }

  public reset() {
    mixpanel.reset();
  }
}