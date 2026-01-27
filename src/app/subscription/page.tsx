import { Banner, Header } from "@/shared/components";
import { SubscribeForm } from "@/shared/widgets";

export const metadata = {
  title: "Subscribe",
  description: "Subscribe",
};

export default async function SubscribePage() {
  return (
    <>
      <Header />
      <div className="mt-64">
        <Banner />
        <section className="m-auto max-w-588 px-16 pb-60 md:mt-48 md:pb-120">
          <SubscribeForm />
        </section>
      </div>
    </>
  );
}
