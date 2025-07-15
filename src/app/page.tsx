export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="font-heading1 text-gray-900">
          폰트 타이포그래피 테스트
        </h1>

        {/* Pretendard Heading 스타일 */}
        <section className="space-y-4">
          <h2 className="font-heading2 text-gray-800">
            Pretendard Heading 스타일
          </h2>
          <div className="space-y-2 rounded-lg bg-white p-6 shadow-sm">
            <p className="font-heading1 text-black">
              font-heading1 (1.75rem, 700) - 메인 제목 - Black
            </p>
            <p className="font-heading2 text-gray8">
              font-heading2 (1.75rem, 600) - 섹션 제목 - Gray8
            </p>
            <p className="font-heading3 text-blue4">
              font-heading3 (1.5rem, 700) - 서브 제목 - Blue4
            </p>
            <p className="font-heading4 text-gray7">
              font-heading4 (1.5rem, 600) - 서브 제목 - Gray7
            </p>
          </div>
        </section>

        {/* Pretendard Sub 스타일 */}
        <section className="space-y-4">
          <h2 className="font-heading2 text-gray-800">Pretendard Sub 스타일</h2>
          <div className="space-y-2 rounded-lg bg-white p-6 shadow-sm">
            <p className="font-sub1 text-black">
              font-sub1 (1.25rem, 700) - 서브 제목 1 - Black
            </p>
            <p className="font-sub2 text-gray8">
              font-sub2 (1.25rem, 600) - 서브 제목 2 - Gray8
            </p>
            <p className="font-sub3 text-blue4">
              font-sub3 (1.125rem, 700) - 서브 제목 3 - Blue4
            </p>
            <p className="font-sub4 text-gray7">
              font-sub4 (1.125rem, 600) - 서브 제목 4 - Gray7
            </p>
            <p className="font-sub5 text-gray6">
              font-sub5 (1rem, 600) - 서브 제목 5 - Gray6
            </p>
            <p className="font-sub6 text-gray5">
              font-sub6 (0.875rem, 600) - 서브 제목 6 - Gray5
            </p>
          </div>
        </section>

        {/* Pretendard Body 스타일 */}
        <section className="space-y-4">
          <h2 className="font-heading2 text-gray-800">
            Pretendard Body 스타일
          </h2>
          <div className="space-y-2 rounded-lg bg-white p-6 shadow-sm">
            <p className="font-body1 text-black">
              font-body1 (1.125rem, 500) - 본문 1 Medium - Black
            </p>
            <p className="font-body2 text-gray8">
              font-body2 (1.125rem, 400) - 본문 2 Regular - Gray8
            </p>
            <p className="font-body3 text-gray7">
              font-body3 (1rem, 500) - 본문 3 Medium - Gray7
            </p>
            <p className="font-body4 text-gray6">
              font-body4 (1rem, 400) - 본문 4 Regular - Gray6
            </p>
            <p className="font-body5 text-gray5">
              font-body5 (0.875rem, 500) - 본문 5 Medium - Gray5
            </p>
            <p className="font-body6 text-gray4">
              font-body6 (0.875rem, 400) - 본문 6 Regular - Gray4
            </p>
          </div>
        </section>

        {/* Pretendard Caption 스타일 */}
        <section className="space-y-4">
          <h2 className="font-heading2 text-gray-800">
            Pretendard Caption 스타일
          </h2>
          <div className="space-y-2 rounded-lg bg-white p-6 shadow-sm">
            <p className="font-caption1 text-blue4">
              font-caption1 (0.75rem, 600) - 캡션 1 Semibold - Blue4
            </p>
            <p className="font-caption2 text-gray6">
              font-caption2 (0.75rem, 500) - 캡션 2 Medium - Gray6
            </p>
            <p className="font-caption3 text-gray5">
              font-caption3 (0.75rem, 400) - 캡션 3 Regular - Gray5
            </p>
          </div>
        </section>

        {/* Pretendard Underlined 스타일 */}
        <section className="space-y-4">
          <h2 className="font-heading2 text-gray-800">
            Pretendard Underlined 스타일
          </h2>
          <div className="space-y-2 rounded-lg bg-white p-6 shadow-sm">
            <p className="font-underlined1 text-blue3">
              font-underlined1 (0.875rem, 400) - 밑줄 텍스트 - Blue3
            </p>
          </div>
        </section>

        {/* Numans Body 스타일 */}
        <section className="space-y-4">
          <h2 className="font-heading2 text-gray-800">Numans Body 스타일</h2>
          <div className="space-y-2 rounded-lg bg-white p-6 shadow-sm">
            <p className="font-numans-body1 text-black">
              font-numans-body1 (1.25rem, 400) - Numans 본문 1 - Black
            </p>
            <p className="font-numans-body2 text-gray8">
              font-numans-body2 (1.125rem, 400) - Numans 본문 2 - Gray8
            </p>
            <p className="font-numans-body3 text-gray7">
              font-numans-body3 (1rem, 400) - Numans 본문 3 - Gray7
            </p>
            <p className="font-numans-body4 text-gray6">
              font-numans-body4 (0.875rem, 400) - Numans 본문 4 - Gray6
            </p>
          </div>
        </section>

        {/* Numans Caption 스타일 */}
        <section className="space-y-4">
          <h2 className="font-heading2 text-gray-800">Numans Caption 스타일</h2>
          <div className="space-y-2 rounded-lg bg-white p-6 shadow-sm">
            <p className="font-numans-caption1 text-red3">
              font-numans-caption1 (0.75rem, 700) - Numans 캡션 1 Bold - Red3
            </p>
            <p className="font-numans-caption2 text-gray5">
              font-numans-caption2 (0.625rem, 400) - Numans 캡션 2 Regular -
              Gray5
            </p>
          </div>
        </section>

        {/* 색상 테스트 섹션 */}
        <section className="space-y-4">
          <h2 className="font-heading2 text-gray-800">색상 테스트</h2>
          <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
            <div className="space-y-2">
              <p className="font-body1 text-black">Black (#0c121b)</p>
              <p className="font-body1 text-white">White (#ffffff)</p>
              <p className="font-body1 text-gray1">Gray1 (#f7f7f7)</p>
              <p className="font-body1 text-gray2">Gray2 (#e9e9e9)</p>
              <p className="font-body1 text-gray3">Gray3 (#d1d1d1)</p>
              <p className="font-body1 text-gray4">Gray4 (#bfc7d4)</p>
              <p className="font-body1 text-gray5">Gray5 (#a1acbd)</p>
              <p className="font-body1 text-gray6">Gray6 (#818ca0)</p>
              <p className="font-body1 text-gray7">Gray7 (#657084)</p>
              <p className="font-body1 text-gray8">Gray8 (#4c5667)</p>
              <p className="font-body1 text-gray9">Gray9 (#37404f)</p>
              <p className="font-body1 text-gray10">Gray10 (#212531)</p>
            </div>
            <div className="space-y-2">
              <p className="font-body1 text-blue4">Blue4 (#073068)</p>
              <p className="font-body1 text-blue3">Blue3 (#14beee)</p>
              <p className="font-body1 text-blue2">Blue2 (#7ae1fe)</p>
              <p className="font-body1 text-blue1">Blue1 (#eaf7ff)</p>
            </div>
            <div className="space-y-2">
              <p className="font-body1 text-red3">Red3 (#ff5152)</p>
              <p className="font-body1 text-red2">Red2 (#ff6b6b)</p>
              <p className="font-body1 text-red1">Red1 (#ffeeee)</p>
            </div>
          </div>
        </section>

        {/* Badge 색상 테스트 */}
        <section className="space-y-4">
          <h2 className="font-heading2 text-gray-800">Badge 색상 테스트</h2>
          <div className="flex flex-wrap gap-2">
            <div className="bg-badge-purple font-caption1 rounded px-3 py-1 text-white">
              Purple Badge
            </div>
            <div className="bg-badge-yellow font-caption1 rounded px-3 py-1 text-white">
              Yellow Badge
            </div>
            <div className="bg-badge-pink font-caption1 rounded px-3 py-1 text-white">
              Pink Badge
            </div>
            <div className="bg-badge-blue font-caption1 rounded px-3 py-1 text-white">
              Blue Badge
            </div>
            <div className="bg-badge-red font-caption1 rounded px-3 py-1 text-white">
              Red Badge
            </div>
            <div className="bg-badge-green font-caption1 rounded px-3 py-1 text-white">
              Green Badge
            </div>
          </div>
        </section>

        {/* 실제 사용 예시 */}
        <section className="space-y-4">
          <h2 className="font-heading2 text-gray-800">실제 사용 예시</h2>
          <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
            <h3 className="font-heading3 text-black">프로젝트 제목</h3>
            <p className="font-body1 text-gray8">
              이것은 프로젝트의 메인 설명입니다. 사용자가 읽기 편한 크기와 줄
              간격으로 설정되어 있습니다.
            </p>
            <div className="flex items-center gap-2">
              <span className="font-caption3 text-gray5">
                작성일: 2024년 1월 15일
              </span>
              <span className="font-caption2 text-blue3">#태그</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="bg-badge-purple font-caption3 rounded px-2 py-1 text-white">
                #React
              </div>
              <div className="bg-badge-blue font-caption3 rounded px-2 py-1 text-white">
                #TypeScript
              </div>
              <div className="bg-badge-yellow font-caption3 rounded px-2 py-1 text-white">
                #Tailwind
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
