import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pedroluz.com";

export const defaultMetadata: Metadata = {
  title: "pedroluz",
  description: "Música, poesia, código e histórias.",
};

export function createMetadata(
  title: string,
  description: string,
  image?: string
): Metadata {
  const imageUrl = image ? `${baseUrl}${image}` : `${baseUrl}/pedroluz.ico`;

  return {
    title: `${title} | pedroluz`,
    description,
    openGraph: {
      title: `${title} | pedroluz`,
      description,
      url: baseUrl,
      siteName: "pedroluz",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "pt_BR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | pedroluz`,
      description,
      images: [imageUrl],
    },
  };
}
