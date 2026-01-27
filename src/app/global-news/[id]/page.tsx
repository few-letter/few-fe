import { DetailPageLayout } from "@/shared/widgets";

interface GlobalNewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function GlobalNewsDetailPage({
  params,
}: GlobalNewsDetailPageProps) {
  const { id } = await params;

  return <DetailPageLayout id={id} />;
}
