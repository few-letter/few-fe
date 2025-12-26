"use client";

import { useEffect } from "react";

import { MIXPANEL_EVENT } from "@/shared/constants";
import { useMixpanel } from "@/shared/providers";

export const HomeTracker = () => {
  const mixpanel = useMixpanel();

  useEffect(() => {
    if (mixpanel) {
      mixpanel.track(MIXPANEL_EVENT.HOME_MAIN_APPEAR);
    }
  }, [mixpanel]);

  return null;
};
