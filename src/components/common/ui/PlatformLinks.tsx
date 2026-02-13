'use client';

import { platforms } from '@/lib/platforms';
import { getReleasePlatformUrl } from '@/lib/releases-links';

interface PlatformLinksProps {
  platformKeys: readonly string[];
  title?: string;
  releaseId?: string;
  compact?: boolean;
}

export function PlatformLinks({ platformKeys, title, releaseId, compact = false }: PlatformLinksProps) {
  const getUrl = (key: string) => {
    if (releaseId) {
      const directUrl = getReleasePlatformUrl(releaseId, key);
      if (directUrl) return directUrl;
    }
    return platforms[key].getUrl(title);
  };

  if (compact) {
    // Header mode: only logos, clickable, no button styling
    return (
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {platformKeys.map((key) => {
          const platform = platforms[key];
          const IconComponent = platform.icon;

          return (
            <a
              key={key}
              href={getUrl(key)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
              }}
            >
              <IconComponent size={16} style={{ color: platform.color }} />
            </a>
          );
        })}
      </div>
    );
  }

  // Expanded mode: buttons with labels, responsive
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        justifyContent: 'center',
      }}
      className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center"
    >
      {platformKeys.map((key) => {
        const platform = platforms[key];
        const IconComponent = platform.icon;

        return (
          <a
            key={key}
            href={getUrl(key)}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:shadow-sm transition-shadow w-full sm:w-auto"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: 'none',
              textDecoration: 'none',
              color: '#1a1a1a',
              fontSize: '0.85rem',
            }}
          >
            <IconComponent size={13} style={{ color: platform.color }} />
            <span>{platform.name}</span>
          </a>
        );
      })}
    </div>
  );
}
