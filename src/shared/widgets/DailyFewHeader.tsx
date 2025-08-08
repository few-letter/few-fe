import Link from "next/link";
import { formatKoreanDate } from "../utils";

export const DailyFewHeader = () => {
  const currentDate = formatKoreanDate(new Date());
  return (
    <div className="pt-16 pb-16 lg:pt-60 lg:pb-24">
      <div className="hidden lg:block">
        <span className="font-heading4 text-blue3">{currentDate}</span>
        <span className="font-heading4 text-gray10">&nbsp;데일리 few.</span>
      </div>
      <div className="block rounded-sm bg-black px-16 py-12 lg:hidden">
        <Link href="/" className="font-body5 text-blue3">
          🗞️ 보고 싶은 카테고리 무료 구독
        </Link>
      </div>
    </div>
  );
};
