import { Banner, Header } from "@/shared/components";

export const metadata = {
  title: "Subscribe",
  description: "Subscribe",
};

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="mt-64">
        <Banner />
        {children}
      </div>
    </>
  );
}
