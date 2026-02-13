import "./globals.css";
import { Metadata } from "next";
import { LayoutWrapper } from "@/components/common/layouts";

export const metadata: Metadata = {
  title: "pedroluz",
  description: "arte e software 🌷👾",
  metadataBase: new URL('https://pedroluz.com.br'),
  openGraph: {
    title: "pedroluz",
    description: "arte e software 🌷👾",
    url: "https://pedroluz.com.br",
    siteName: "pedroluz",
    images: [
      {
        url: "/optimized/mountains-desktop-social.jpg",
        width: 1200,
        height: 630,
        alt: "Mountains",
      },
      {
        url: "/pedroluz.ico",
        width: 512,
        height: 512,
        alt: "pedroluz",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className="antialiased text-gray-900"
        style={{ fontWeight: 350, fontFamily: 'sans-serif', margin: 0, padding: 0 }}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
