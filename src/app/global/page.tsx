import { Header } from "@/shared/components";
import { getRefreshDate, formatDateToYYYYMMDD } from "@/shared/utils";
import { DailyFewHeader } from "@/shared/widgets";

export default async function Home() {
  const newsDate = getRefreshDate(new Date());
  const newsDateFormatted = formatDateToYYYYMMDD(newsDate);
  return (
    <>
      <Header />
      <main className="m-auto max-w-1200">
        <section className="px-16">
          <DailyFewHeader currentDate={newsDateFormatted} />
          <div className="flex w-full flex-col gap-24 overflow-hidden pb-40 md:flex-row"></div>
        </section>
        <div className="bg-gray2 h-16 w-full lg:hidden" />
        <section className="px-16"></section>
      </main>
    </>
  );
}
