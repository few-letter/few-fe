import { Banner } from "@/shared/components";

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
      <Banner />
      {children}
    </>
  );
}
