'use client';

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/common/ui";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  // Don't render Navbar for landing page - it has its own header
  return (
    <>
      {!isLanding && <Navbar />}
      <main className={isLanding ? '' : 'pt-14'} style={{ backgroundColor: '#f7f1ff', margin: 0, padding: 0 }}>
        {children}
      </main>
    </>
  );
}
