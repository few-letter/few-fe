"use client";

import Image from "next/image";
import Link from "next/link";
import { CLIENT_ROUTES } from "@/shared/constants";
import { useMixpanel } from "@/shared/providers";
import { cn } from "@/lib/utils";
import { MIXPANEL_EVENT, WORLDS } from "@/shared/constants";
import { World } from "@/shared/types";
import { usePathname } from "next/navigation";

const WorldLink = ({ world }: { world: World }) => {
  const pathname = usePathname();
  const isActive = pathname === world.url;

  return (
    <Link
      href={world.url}
      className={cn("font-sub5 text-semibold", isActive && "text-blue3")}
    >
      {world.name}
    </Link>
  );
};

export const Header = ({ underline = true }: { underline?: boolean }) => {
  const mixpanel = useMixpanel();

  return (
    <div
      className={`border-gray3 fixed top-0 left-0 z-20 flex w-full items-center justify-center border-b-1 bg-white px-16 py-16 ${
        underline ? "border-b-1" : "border-b-0"
      }`}
    >
      <div className="flex max-w-1200 flex-1 items-center justify-between">
        <div className="flex items-center gap-40">
          <Link href={CLIENT_ROUTES.HOME}>
            <Image
              src="/images/logo/few.png"
              alt="logo"
              width={64}
              height={32}
            />
          </Link>
          <div className="flex items-center gap-24">
            {WORLDS.map((world) => (
              <WorldLink world={world} key={world.type} />
            ))}
          </div>
        </div>
        <p className="flex items-center justify-center">
          <span className="font-sub5 text-gray8 hidden md:block">
            보고싶은 뉴스 선택하고&nbsp;
          </span>
          <span className="font-sub5 text-blue3">
            <Link
              href={CLIENT_ROUTES.SUBSCRIPTION}
              onClick={() =>
                mixpanel?.track(MIXPANEL_EVENT.HOME_NAV_SUBSCRIBE_CLICK)
              }
            >
              무료 구독하기
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};
