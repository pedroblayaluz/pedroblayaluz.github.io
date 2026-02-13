'use client';

import { TIMELINE_HEADER_PLATFORMS, TIMELINE_EXPANDED_PLATFORMS } from '@/lib/platforms';
import { StreamingCard } from '@/components/common/ui/StreamingCard';

interface Release {
  id: string;
  title: string;
  monthName: string;
  month: number; // 1-12
  year: number;
  albumArt: string;
}

const releases: Release[] = [
  {
    id: 'sdds-orkut',
    title: 'sdds orkut',
    monthName: 'Janeiro',
    month: 1,
    year: 2025,
    albumArt: '/optimized/albums/sdds-orkut-thumb.jpg',
  },
  {
    id: 'sonho-lucido',
    title: 'Sonho Lúcido',
    monthName: 'Junho',
    month: 6,
    year: 2023,
    albumArt: '/optimized/albums/sonho-lucido-thumb.jpg',
  },
  {
    id: '1000-caminhos',
    title: '1000 Caminhos',
    monthName: 'Abril',
    month: 4,
    year: 2023,
    albumArt: '/optimized/albums/1000-caminhos-thumb.jpg',
  },
  {
    id: 'ghosting',
    title: 'Ghosting com o mundo',
    monthName: 'Setembro',
    month: 9,
    year: 2021,
    albumArt: '/optimized/albums/ghosting-thumb.jpg',
  },
  {
    id: 'infelizes',
    title: 'nos querem infelizes. :(',
    monthName: 'Julho',
    month: 7,
    year: 2020,
    albumArt: '/optimized/albums/infelizes-thumb.jpg',
  },
  {
    id: 'millennial',
    title: 'Millennial',
    monthName: 'Novembro',
    month: 11,
    year: 2019,
    albumArt: '/optimized/albums/millennial-thumb.jpg',
  },
];

export function MusicTimeline() {
  // Group releases by year
  const releasesByYear = releases.reduce((acc, release) => {
    const year = release.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(release);
    return acc;
  }, {} as Record<number, Release[]>);

  // Get years in descending order (newest first)
  const years = Object.keys(releasesByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-4 top-0 w-1 h-full"
            style={{
              background: 'linear-gradient(to bottom, #a397eb, #d4c5f9)',
            }}
          />

          {/* Releases grouped by year */}
          <div className="space-y-8">
            {years.map((year, yearIndex) => (
              <div key={year}>
                {/* Year Divider - horizontal line on timeline */}
                {yearIndex > 0 && (
                  <div className="relative mb-8" style={{ height: '20px', display: 'flex', alignItems: 'center' }}>
                    <div className="absolute left-4 w-32 h-0.5" style={{ backgroundColor: '#e0d5f0' }} />
                    <h3
                      className="text-xs font-semibold absolute"
                      style={{
                        color: '#999',
                        fontWeight: 350,
                        whiteSpace: 'nowrap',
                        transform: 'rotate(-90deg) translateX(-100%)',
                        transformOrigin: 'right center',
                        left: '-30px',
                      }}
                    >
                      {year}
                    </h3>
                  </div>
                )}

                {/* Releases for this year */}
                {releasesByYear[year].map((release, idx) => {
                  const isLatest = year === years[0] && idx === 0;

                  return (
                    <div key={release.id} className="relative pl-16 mb-6">
                      <StreamingCard
                        title={release.title}
                        releaseId={release.id}
                        headerPlatforms={TIMELINE_HEADER_PLATFORMS}
                        expandedPlatforms={TIMELINE_EXPANDED_PLATFORMS}
                        albumArt={release.albumArt}
                        monthYear={`${release.monthName} de ${release.year}`}
                        isLatest={isLatest}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
