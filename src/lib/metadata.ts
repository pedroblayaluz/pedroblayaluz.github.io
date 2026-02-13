import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pedroluz.com.br";

export const defaultMetadata: Metadata = {
  title: "pedroluz",
  description: "arte e software 🌷👾",
  openGraph: {
    title: "pedroluz",
    description: "arte e software 🌷👾",
    url: baseUrl,
    siteName: "pedroluz",
    images: [
      {
        url: `${baseUrl}/optimized/mountains-desktop.jpg`,
        width: 1200,
        height: 630,
        alt: "Mountains",
      },
      {
        url: `${baseUrl}/pedroluz.ico`,
        width: 512,
        height: 512,
        alt: "pedroluz",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
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
  };
}
