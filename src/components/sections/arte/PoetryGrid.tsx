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
      <style>{`
        .poetry-grid {
          display: grid;
          gap: ${STYLES.spacing.sm};
          padding: ${STYLES.spacing.xl} ${STYLES.spacing.xs};
          margin: 0 auto;
          max-width: 600px;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .poetry-grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          }
        }
        @media (min-width: 769px) {
          .poetry-grid {
            grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          }
        }
      `}</style>
      
      {/* Grid de poesias */}
      <div className="poetry-grid">
        {POETRY_DATA.map((poetry, index) => {
          const poetryName = poetry.filename.replace(/\.[^.]+$/, '');
          const isGif = poetry.filename.toLowerCase().endsWith('.gif');
          const thumbSrc = isGif 
            ? `/optimized/poesias/${poetry.filename}`
            : `/optimized/poesias/${poetryName}-thumb.jpg`;
          
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
                src={thumbSrc}
                alt={poetry.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                unoptimized={isGif}
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
        contentStyle={{
          padding: 0,
          boxShadow: 'none',
          borderRadius: 0,
          overflow: 'hidden',
          maxWidth: '95vw',
          maxHeight: '95vh',
        }}
      >
        {selectedPoetry && (() => {
          const isGif = selectedPoetry.filename.toLowerCase().endsWith('.gif');
          const fullSrc = isGif
            ? `/optimized/poesias/${selectedPoetry.filename}`
            : `/optimized/poesias/${selectedPoetry.filename.replace(/\.[^.]+$/, '')}-full.jpg`;
          
          return (
            <Image
              src={fullSrc}
              alt={selectedPoetry.title}
              width={800}
              height={800}
              style={{ 
                width: '100%',
                height: 'auto',
                maxWidth: '95vw',
                maxHeight: '95vh',
                objectFit: 'contain'
              }}
              unoptimized={isGif}
            />
          );
        })()}
      </GenericModal>
    </>
  );
}
