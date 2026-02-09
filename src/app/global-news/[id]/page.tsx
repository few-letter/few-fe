import type { Metadata } from "next";

import { CLIENT_ROUTES } from "@/shared/constants";
import { generateContentMetadata } from "@/shared/utils";
import { DetailPageLayout } from "@/shared/widgets";

interface GlobalNewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: GlobalNewsDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  return generateContentMetadata(id, CLIENT_ROUTES.GLOBAL);
}

export default async function GlobalNewsDetailPage({
  params,
}: GlobalNewsDetailPageProps) {
  const { id } = await params;

  return <DetailPageLayout id={id} />;
}
