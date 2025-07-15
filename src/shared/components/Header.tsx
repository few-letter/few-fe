import Image from "next/image";

export default function Header({ underline = true }: { underline?: boolean }) {
  return (
    <div
      className={`border-gray3 flex w-full items-center justify-center border-b-1 px-16 py-16 sm:px-24 md:px-40 lg:px-120 ${
        underline ? "border-b-1" : "border-b-0"
      }`}
    >
      <div className="flex max-w-1024 flex-1 justify-between">
        <Image
          src="/images/logo/Logo_FEW_Dark.png"
          alt="logo"
          width={64}
          height={32}
        />
        <p className="flex items-center justify-center">
          <span className="font-sub5 text-gray8 hidden md:block">
            보고싶은 뉴스 선택하고&nbsp;
          </span>
          <span className="font-sub5 text-blue3">무료 구독하기</span>
        </p>
      </div>
    </div>
  );
}
