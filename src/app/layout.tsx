import "./globals.css";
import { Metadata } from "next";
import { LayoutWrapper } from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "pedroluz",
  description: "Música, poesia, código e histórias.",
  metadataBase: new URL('https://pedroluz.com'),
  openGraph: {
    title: "pedroluz",
    description: "Música, poesia, código e histórias.",
    url: "https://pedroluz.com",
    siteName: "pedroluz",
    images: [
      {
        url: "/pedroluz.ico",
        width: 256,
        height: 256,
        alt: "pedroluz",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "pedroluz",
    description: "Música, poesia, código e histórias.",
    images: ["/pedroluz.ico"],
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
