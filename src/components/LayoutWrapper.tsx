'use client';

import { usePathname } from "next/navigation";
import { Navbar } from "./index";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === '/' || pathname === '/landing';

  // Don't render Navbar for landing page - it has its own header
  return (
    <>
      {!isLanding && <Navbar />}
      <main className={isLanding ? '' : 'pt-14'} style={{ backgroundColor: '#f7f1ff' }}>
        {children}
      </main>
    </>
  );
}
