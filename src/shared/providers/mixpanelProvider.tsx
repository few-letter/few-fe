"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { env } from "@/config/env";
import { MixpanelService } from "@/lib/mixpanel";

const MixpanelContext = createContext<MixpanelService | null>(null);

export const useMixpanel = () => useContext(MixpanelContext);

export const MixpanelProvider = ({ children }: { children: ReactNode }) => {
  const [mixpanel, setMixpanel] = useState<MixpanelService | null>(null);

  useEffect(() => {
    if (!env.ENABLE_MIXPANEL) return;

    const service = MixpanelService.getInstance();
    service.startSession();
    setMixpanel(service);
  }, []);

  return (
    <MixpanelContext.Provider value={mixpanel}>
      {children}
    </MixpanelContext.Provider>
  );
};
