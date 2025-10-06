import Image from "next/image";
import Link from "next/link";

export const Header = ({ underline = true }: { underline?: boolean }) => {
  return (
    <div
      className={`border-gray3 fixed top-0 left-0 z-20 flex w-full items-center justify-center border-b-1 bg-white px-16 py-16 ${
        underline ? "border-b-1" : "border-b-0"
      }`}
    >
      <div className="flex max-w-1200 flex-1 justify-between">
        <Link href="/">
          <Image src="/images/logo/few.png" alt="logo" width={64} height={32} />
        </Link>
        <p className="flex items-center justify-center">
          <span className="font-sub5 text-gray8 hidden md:block">
            보고싶은 뉴스 선택하고&nbsp;
          </span>
          <span className="font-sub5 text-blue3">
            <Link href="/subscribe">무료 구독하기</Link>
          </span>
        </p>
      </div>
    </div>
  );
};
