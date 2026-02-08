"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CLIENT_ROUTES } from "@/shared/constants";
import { useMixpanel } from "@/shared/providers";
import { cn } from "@/lib/utils";
import { MIXPANEL_EVENT, WORLDS } from "@/shared/constants";
import { World } from "@/shared/types";
import { Menu } from "lucide-react";
import { MobileSheet } from "./MobileSheet";

const WorldLink = ({
  world,
  onClick,
  variant = "desktop",
}: {
  world: World;
  onClick?: () => void;
  variant?: "desktop" | "mobile";
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === world.url || pathname.startsWith(`${world.url}/`);

  return (
    <Link
      href={world.url}
      onClick={onClick}
      className={
        variant === "desktop"
          ? cn("font-sub5 text-semibold", isActive && "text-blue3")
          : cn("font-heading1", isActive ? "text-blue3" : "text-black")
      }
    >
      {world.name}
    </Link>
  );
};

export const Header = ({ underline = true }: { underline?: boolean }) => {
  const pathname = usePathname();
  const mixpanel = useMixpanel();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div
        className={`border-gray3 fixed top-0 left-0 z-20 flex w-full items-center justify-center border-b-1 bg-white px-16 py-16 ${
          underline ? "border-b-1" : "border-b-0"
        }`}
      >
        <div className="flex max-w-1200 flex-1 items-center justify-between">
          <div className="flex items-center gap-40">
            <Link href={CLIENT_ROUTES.LOCAL}>
              <Image
                src="/images/logo/few.png"
                alt="logo"
                width={64}
                height={32}
              />
            </Link>
            <div className="hidden items-center gap-24 md:flex">
              {WORLDS.map((world) => (
                <WorldLink world={world} key={world.type} />
              ))}
            </div>
          </div>
          <p className="hidden items-center justify-center md:flex">
            <span className="font-sub5 text-gray8">
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
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="메뉴 열기"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      <MobileSheet
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      >
        <nav className="flex flex-col items-center gap-16 py-16">
          {WORLDS.map((world) => (
            <WorldLink
              key={world.type}
              world={world}
              variant="mobile"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          ))}
          <Link
            href={CLIENT_ROUTES.SUBSCRIPTION}
            onClick={() => {
              mixpanel?.track(MIXPANEL_EVENT.HOME_NAV_SUBSCRIBE_CLICK);
              setIsMobileMenuOpen(false);
            }}
            className={cn(
              "font-heading1",
              pathname === CLIENT_ROUTES.SUBSCRIPTION
                ? "text-blue3"
                : "text-black",
            )}
          >
            무료 구독
          </Link>
        </nav>
      </MobileSheet>
    </>
  );
};
