import { DetailPageLayout } from "@/shared/widgets";

interface LocalNewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function LocalNewsDetailPage({
  params,
}: LocalNewsDetailPageProps) {
  const { id } = await params;

  return <DetailPageLayout id={id} />;
}
