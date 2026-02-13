'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LPMetadata } from '@/lib/lps-metadata';
import { FaSpotify, FaYoutube, FaInstagram, FaTiktok, FaLinkedin, FaGithub } from "react-icons/fa";
import { DecoratedPageLayout } from '@/components/common/layouts';
import { getReleaseIdFromLPSlug } from '@/lib/releases-links';
import { StreamingCard } from '@/components/common/ui/StreamingCard';
import { TIMELINE_HEADER_PLATFORMS, TIMELINE_EXPANDED_PLATFORMS } from '@/lib/platforms';

interface LPPageProps {
  lp: LPMetadata;
}

export function LPPage({ lp }: LPPageProps) {
  // Get the release ID from LP slug
  const releaseId = getReleaseIdFromLPSlug(lp.slug);
  const monthYear = lp.monthName && lp.year ? `${lp.monthName} de ${lp.year}` : undefined;
  const albumArt = releaseId ? `/optimized/albums/${releaseId}-thumb.jpg` : undefined;

  return (
    <DecoratedPageLayout backgroundColor={lp.backgroundColor || '#f7f1ff'}>
      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px', position: 'relative', paddingTop: '80px' }}>
        {/* Streaming Card */}
        <div style={{ marginBottom: '40px' }}>
          <StreamingCard
            title={lp.title}
            releaseId={releaseId}
            headerPlatforms={TIMELINE_HEADER_PLATFORMS}
            expandedPlatforms={TIMELINE_EXPANDED_PLATFORMS}
            albumArt={albumArt}
            monthYear={monthYear}
            defaultExpanded={true}
          />
        </div>

        {/* Social Links */}
        <div 
          className="p-5 sm:p-8 md:p-10 rounded-lg hover:shadow-xl transition-shadow duration-300"
          style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(138, 92, 255, 0.08)'
          }}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl mb-5 sm:mb-8 text-center" style={{ fontWeight: 350, color: '#222' }}>
            Me acompanhe
          </h2>
          <div className="flex flex-wrap gap-3 sm:gap-6 justify-center">
            {/* Spotify */}
            <a 
              href="https://open.spotify.com/artist/2rj8ccj3Z0rfVh18nxzZUQ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <FaSpotify size={24} className="sm:block hidden" style={{ color: '#1DB954', flexShrink: 0 }} />
              <FaSpotify size={20} className="hidden max-sm:block" style={{ color: '#1DB954', flexShrink: 0 }} />
            </a>

            {/* YouTube */}
            <a 
              href="https://www.youtube.com/@pedroluzer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <FaYoutube size={24} className="sm:block hidden" style={{ color: '#FF0000', flexShrink: 0 }} />
              <FaYoutube size={20} className="hidden max-sm:block" style={{ color: '#FF0000', flexShrink: 0 }} />
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/pedroluz._" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <FaInstagram size={24} className="sm:block hidden" style={{ color: '#E1306C', flexShrink: 0 }} />
              <FaInstagram size={20} className="hidden max-sm:block" style={{ color: '#E1306C', flexShrink: 0 }} />
            </a>

            {/* TikTok */}
            <a 
              href="https://www.tiktok.com/@_pedroluz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <FaTiktok size={24} className="sm:block hidden" style={{ color: '#000000', flexShrink: 0 }} />
              <FaTiktok size={20} className="hidden max-sm:block" style={{ color: '#000000', flexShrink: 0 }} />
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/pedroblayaluz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <FaLinkedin size={24} className="sm:block hidden" style={{ color: '#0A66C2', flexShrink: 0 }} />
              <FaLinkedin size={20} className="hidden max-sm:block" style={{ color: '#0A66C2', flexShrink: 0 }} />
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/pedroblayaluz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <FaGithub size={24} className="sm:block hidden" style={{ color: '#333333', flexShrink: 0 }} />
              <FaGithub size={20} className="hidden max-sm:block" style={{ color: '#333333', flexShrink: 0 }} />
            </a>
          </div>
        </div>

        {/* Padding for mountains */}
        <div style={{ height: '400px' }} />
      </main>
    </DecoratedPageLayout>
  );
}
