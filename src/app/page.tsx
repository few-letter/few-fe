import { Header, NewsCard } from "@/shared/components";

export default function Home() {
  return (
    <div className="m-auto max-w-1200">
      <Header />
      <main className="flex justify-center py-24">
        <div className="flex w-full max-w-1200 flex-col gap-24 px-16 sm:flex-row">
          <div className="flex-1"></div>
          <div className="hidden flex-1 sm:block"></div>
        </div>
      </main>
    </div>
  );
}
