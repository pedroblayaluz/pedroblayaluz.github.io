'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaSpotify, FaYoutube } from 'react-icons/fa';

interface Release {
  id: string;
  title: string;
  monthName: string;
  month: number; // 1-12
  year: number;
  albumArt: string;
  spotifyUrl: string;
  youtubeUrl: string;
  spotifyEmbedId?: string;
}

const releases: Release[] = [
  {
    id: 'sdds-orkut',
    title: 'sdds orkut',
    monthName: 'Janeiro',
    month: 1,
    year: 2025,
    albumArt: '/albums/sdds-orkut.jpg',
    spotifyUrl: 'https://open.spotify.com/album/0MDgodFJyErPHRnU7A9pYj',
    youtubeUrl: 'https://www.youtube.com/@pedroluzer',
    spotifyEmbedId: '0MDgodFJyErPHRnU7A9pYj',
  },
  {
    id: 'sonho-lucido',
    title: 'Sonho Lúcido',
    monthName: 'Junho',
    month: 6,
    year: 2023,
    albumArt: '/albums/sonho-lucido.jpg',
    spotifyUrl: 'https://open.spotify.com/album/0LfVOLHrNtITtZIJmsd7py',
    youtubeUrl: 'https://www.youtube.com/@pedroluzer',
    spotifyEmbedId: '0LfVOLHrNtITtZIJmsd7py',
  },
  {
    id: '1000-caminhos',
    title: '1000 Caminhos',
    monthName: 'Abril',
    month: 4,
    year: 2023,
    albumArt: '/albums/1000-caminhos.jpg',
    spotifyUrl: 'https://open.spotify.com/album/1Hqe0yXsACIfPb0ZyhUufn',
    youtubeUrl: 'https://www.youtube.com/@pedroluzer',
    spotifyEmbedId: '1Hqe0yXsACIfPb0ZyhUufn',
  },
  {
    id: 'ghosting',
    title: 'Ghosting com o mundo',
    monthName: 'Setembro',
    month: 9,
    year: 2021,
    albumArt: '/albums/ghosting.jpg',
    spotifyUrl: 'https://open.spotify.com/album/36XhWrkbXCrojgIBLESVMV',
    youtubeUrl: 'https://www.youtube.com/@pedroluzer',
    spotifyEmbedId: '36XhWrkbXCrojgIBLESVMV',
  },
  {
    id: 'infelizes',
    title: 'nos querem infelizes. :(',
    monthName: 'Julho',
    month: 7,
    year: 2020,
    albumArt: '/albums/infelizes.jpg',
    spotifyUrl: 'https://open.spotify.com/album/1UXpCvAVmVYsSrxyeeGKw3',
    youtubeUrl: 'https://www.youtube.com/@pedroluzer',
    spotifyEmbedId: '1UXpCvAVmVYsSrxyeeGKw3',
  },
  {
    id: 'millennial',
    title: 'Millennial',
    monthName: 'Novembro',
    month: 11,
    year: 2019,
    albumArt: '/albums/millennial.jpg',
    spotifyUrl: 'https://open.spotify.com/album/3nMD0enYUV1bDuKgj4HLVl',
    youtubeUrl: 'https://www.youtube.com/@pedroluzer',
    spotifyEmbedId: '3nMD0enYUV1bDuKgj4HLVl',
  },
];

export function MusicTimeline() {
  const [expanded, setExpanded] = useState(0);

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
                  const globalIndex = releases.indexOf(release);

                  return (
                    <div key={release.id} className="relative pl-16 mb-6">
                      {/* Card */}
                      <button
                        onClick={() => setExpanded(expanded === globalIndex ? -1 : globalIndex)}
                        className="w-full text-left"
                      >
                        <div
                          className="p-5 rounded-lg border-2 transition-all duration-300 hover:shadow-lg relative"
                          style={{
                            backgroundColor: expanded === globalIndex ? '#ffffff' : '#f9f5ff',
                            borderColor: expanded === globalIndex ? '#a397eb' : '#d4c5f9',
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
                          <div className="flex gap-4">
                            {/* Album Art */}
                            <div className="flex-shrink-0 w-20 h-20 rounded overflow-hidden">
                              <Image
                                src={release.albumArt}
                                alt={release.title}
                                width={80}
                                height={80}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                priority
                              />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <h3
                                className="text-base font-semibold truncate"
                                style={{ color: '#222', fontWeight: 350 }}
                              >
                                {release.title}
                              </h3>
                              <p style={{ color: '#888', fontSize: '0.85rem' }}>
                                {release.monthName} de {release.year}
                              </p>

                              {/* Links */}
                              <div className="flex gap-3 mt-3">
                                <a
                                  href={release.spotifyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:opacity-70 transition-opacity"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <FaSpotify size={16} style={{ color: '#1DB954' }} />
                                </a>
                                <a
                                  href={release.youtubeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:opacity-70 transition-opacity"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <FaYoutube size={16} style={{ color: '#FF0000' }} />
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* Expanded Player */}
                          {expanded === globalIndex && (
                            <div className="mt-5 pt-5 border-t border-purple-200">
                              <iframe
                                src={`https://open.spotify.com/embed/album/${release.spotifyEmbedId}?utm_source=generator`}
                                width="100%"
                                height="152"
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                style={{ borderRadius: '6px' }}
                              />
                            </div>
                          )}
                        </div>
                      </button>
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
