import type { Metadata } from "next";

import { CLIENT_ROUTES } from "@/shared/constants";
import { generateContentMetadata } from "@/shared/utils";
import { DetailPageLayout } from "@/shared/widgets";

interface LocalNewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: LocalNewsDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  return generateContentMetadata(id, CLIENT_ROUTES.LOCAL);
}

export default async function LocalNewsDetailPage({
  params,
}: LocalNewsDetailPageProps) {
  const { id } = await params;

  return <DetailPageLayout id={id} />;
}
