"use client";

import { useEffect } from "react";
import { MixpanelService } from "@/lib/mixpanel";

export const MixpanelProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    const isServer = typeof window === "undefined";

    if (isServer) return;

    const mixpanelService = MixpanelService.getInstance();

    mixpanelService.startSession();
  }, []);

  return <>{children}</>;
};
