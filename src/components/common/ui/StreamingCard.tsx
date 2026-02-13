'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlatformLinks } from './PlatformLinks';

interface StreamingCardProps {
  title: string;
  headerPlatforms: readonly string[];
  expandedPlatforms: readonly string[];
  releaseId?: string;
  albumArt?: string;
  monthYear?: string;
  isLatest?: boolean;
  defaultExpanded?: boolean;
  hideTitle?: boolean;
  hideBorder?: boolean;
}

export function StreamingCard({
  title,
  headerPlatforms,
  expandedPlatforms,
  releaseId,
  albumArt,
  monthYear,
  isLatest = false,
  defaultExpanded = false,
  hideTitle = false,
  hideBorder = false,
}: StreamingCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="w-full text-left"
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
    >
      <div
        className="p-5 rounded-lg border-2 transition-all duration-300 hover:shadow-lg relative"
        style={{
          backgroundColor: isExpanded ? '#ffffff' : '#f9f5ff',
          borderColor: isExpanded ? '#ffffff' : '#d4c5f9',
        }}
      >
        {/* Badge "Último lançamento" */}
        {isLatest && (
          <div
            className="absolute -top-3 -right-0 px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: '#a397eb' }}
          >
            Último lançamento
          </div>
        )}

        {/* Card Header */}
        <div className="flex gap-4 items-start">
          {/* Album Art (optional) */}
          {albumArt && (
            <div className="flex-shrink-0 w-20 h-20 rounded overflow-hidden">
              <Image
                src={albumArt}
                alt={title}
                width={80}
                height={80}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            {!hideTitle && (
              <>
                <h3
                  className="text-base font-semibold truncate"
                  style={{ color: '#222', fontWeight: 350 }}
                >
                  {title}
                </h3>
              </>
            )}
            {monthYear && (
              <p style={{ color: '#888', fontSize: '0.85rem' }}>
                {monthYear}
              </p>
            )}

            {/* Header Links - only logos */}
            <div className="flex gap-2 mt-1">
              <PlatformLinks platformKeys={headerPlatforms} title={title} releaseId={releaseId} compact />
            </div>
          </div>
        </div>

        {/* Expanded Links Section */}
        {isExpanded && (
          <div className="mt-4 pt-4">
            <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '12px', fontWeight: 500 }}>
              Escute no seu streaming 🌷
            </p>
            <PlatformLinks platformKeys={expandedPlatforms} title={title} releaseId={releaseId} />
          </div>
        )}
      </div>
    </button>
  );
}
