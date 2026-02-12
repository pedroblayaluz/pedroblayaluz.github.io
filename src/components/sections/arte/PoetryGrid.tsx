'use client';

import Image from 'next/image';
import { useState } from 'react';
import { GenericModal } from '@/components/common/ui';
import { POETRY_DATA, Poetry } from '@/lib/data';
import { STYLES } from '@/lib/styles/tokens';
import { useHoverEffect } from '@/hooks/useHoverEffect';

/**
 * Poetry grid gallery with modal viewer
 * Refactored to use: GenericModal, external data, useHoverEffect hook
 */
export function PoetryGrid() {
  const [selectedPoetry, setSelectedPoetry] = useState<Poetry | null>(null);
  const { handlers: cardHandlers, getStyle: getCardStyle } = useHoverEffect({
    scaleEntrance: 1.05,
    shadowActive: STYLES.shadows.light,
  });

  return (
    <>
      {/* Grid de poesias */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: STYLES.spacing.sm,
          padding: `${STYLES.spacing.xl} ${STYLES.spacing.sm}`,
          margin: '0 auto',
          maxWidth: '600px',
        }}
      >
        {POETRY_DATA.map((poetry, index) => {
          const poetryName = poetry.filename.replace(/\.[^.]+$/, '');
          return (
            <div
              key={index}
              onClick={() => setSelectedPoetry(poetry)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: STYLES.borderRadius.small,
                cursor: 'pointer',
                aspectRatio: '1',
                ...getCardStyle(),
              }}
              {...cardHandlers}
            >
              <Image
                src={`/optimized/poesias/${poetryName}-thumb.jpg`}
                alt={poetry.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          );
        })}
      </div>

      {/* Reusable modal */}
      <GenericModal
        isOpen={!!selectedPoetry}
        onClose={() => setSelectedPoetry(null)}
        closeButtonVariant="dark"
      >
        {selectedPoetry && (
          <Image
            src={`/optimized/poesias/${selectedPoetry.filename.replace(/\.[^.]+$/, '')}-full.jpg`}
            alt={selectedPoetry.title}
            width={800}
            height={800}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        )}
      </GenericModal>
    </>
  );
}
