import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { CoverContent } from "@/components/sections/cover";

export const metadata: Metadata = createMetadata(
  "Portfólio",
  "Música, poesia, código e histórias",
  "/pedroluz.ico"
);

export default function CoverPage() {
  return <CoverContent />;
}
