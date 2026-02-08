import type { Metadata } from "next";
import { DetailPageLayout } from "@/shared/widgets";
import { getContentDetail } from "@/shared/remotes";
import { SITE_URL, CLIENT_ROUTES } from "@/shared/constants";

interface LocalNewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: LocalNewsDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await getContentDetail(id);
    const { headline, summary, thumbnailImageUrl, createdAt } = response.data;
    const description = summary.length > 155 ? summary.slice(0, 155) + "…" : summary;
    const url = `${SITE_URL}${CLIENT_ROUTES.LOCAL}/${id}`;

    return {
      title: headline,
      description,
      openGraph: {
        type: "article",
        title: headline,
        description,
        url,
        ...(thumbnailImageUrl && {
          images: [{ url: thumbnailImageUrl, alt: headline }],
        }),
        publishedTime: createdAt,
      },
      twitter: {
        card: "summary_large_image",
        title: headline,
        description,
        ...(thumbnailImageUrl && { images: [thumbnailImageUrl] }),
      },
      alternates: {
        canonical: url,
      },
    };
  } catch {
    return {};
  }
}

export default async function LocalNewsDetailPage({
  params,
}: LocalNewsDetailPageProps) {
  const { id } = await params;

  return <DetailPageLayout id={id} />;
}
