'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { LightningAnimation, SnowflakesAnimation } from '@/components/animations';
import { LAYERS } from '@/lib/layerConfig';

interface DecoratedPageLayoutProps {
  children: ReactNode;
  backgroundColor?: string;
  showMountains?: boolean;
  showAnimations?: boolean;
}

/**
 * Factory component for pages with decorative elements
 * Handles consistent layering of: mountains, lightning, snowflakes, and content
 */
export function DecoratedPageLayout({
  children,
  backgroundColor = '#f7f1ff',
  showMountains = true,
  showAnimations = true,
}: DecoratedPageLayoutProps) {
  return (
    <div
      style={{
        backgroundColor,
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Decorative animations container */}
      {showAnimations && (
        <div style={{ position: 'relative', zIndex: LAYERS.DECORATIONS }}>
          <LightningAnimation />
          <SnowflakesAnimation />
        </div>
      )}

      {/* Mountains background - fixed */}
      {showMountains && (
        <div
          className="fixed bottom-0 left-0 right-0 pointer-events-none"
          style={{
            width: '100%',
            height: '600px',
            zIndex: LAYERS.BACKGROUND,
          }}
        >
          <Image
            src="/optimized/mountains-desktop.png"
            alt="Mountains"
            width={1920}
            height={600}
            priority
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 0%',
            }}
            className="hidden md:block"
            sizes="100vw"
          />
          {/* Mobile: Use mobile-optimized version */}
          <Image
            src="/optimized/mountains-mobile.jpg"
            alt="Mountains"
            width={1280}
            height={400}
            priority
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 0%',
            }}
            className="block md:hidden"
            sizes="100vw"
          />
        </div>
      )}

      {/* Content layer */}
      <div
        style={{
          position: 'relative',
          zIndex: LAYERS.CONTENT,
        }}
      >
        {children}
      </div>
    </div>
  );
}
