import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PortfolioContent } from "@/components/PortfolioContent";

export const metadata: Metadata = createMetadata(
  "Portfólio",
  "Música, poesia, código e histórias",
  "/pedroluz.ico"
);

export default function PortfolioPage() {
  return <PortfolioContent />;
}
