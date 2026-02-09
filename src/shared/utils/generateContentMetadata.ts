import type { Metadata } from "next";

import { getContentDetail } from "@/shared/remotes";
import { SITE_URL, SITE_NAME } from "@/shared/constants";

export const generateContentMetadata = async (
  id: string,
  basePath: string,
): Promise<Metadata> => {
  try {
    const response = await getContentDetail(id);
    const { headline, summary, thumbnailImageUrl, createdAt } = response.data;
    const description =
      summary.length > 155 ? summary.slice(0, 155) + "…" : summary;
    const url = `${SITE_URL}${basePath}/${id}`;

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
    return {
      title: SITE_NAME,
    };
  }
};
