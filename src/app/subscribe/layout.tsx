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
    <div className="mt-64">
      <Banner />
      {children}
    </div>
  );
}
