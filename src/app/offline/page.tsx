"use client";

import Image from "next/image";

export default function OfflinePage() {
  return (
    <section className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-16 px-16">
      <Image src="/images/logo/few.png" alt="logo" width={64} height={32} />
      <div className="flex flex-col items-center gap-8">
        <p className="font-body4 text-gray9 text-center">
          인터넷 연결을 확인해 주세요.
        </p>
        <p className="font-body6 text-gray7 text-center">
          네트워크 연결이 없어 페이지를 불러올 수 없습니다.
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="bg-gray10 font-body6 hover:bg-gray9 mt-16 w-full cursor-pointer rounded-sm px-88 py-12 text-white transition-colors"
      >
        다시 시도
      </button>
    </section>
  );
}
