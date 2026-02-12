'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LPMetadata } from '@/lib/lps-metadata';
import { FaSpotify, FaYoutube, FaInstagram, FaTiktok, FaLinkedin, FaGithub, FaApple, FaAmazon } from "react-icons/fa";
import { DecoratedPageLayout } from '@/components/common/layouts';

interface LPPageProps {
  lp: LPMetadata;
}

export function LPPage({ lp }: LPPageProps) {
  return (
    <DecoratedPageLayout backgroundColor={lp.backgroundColor || '#f7f1ff'}>
      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px', position: 'relative' }}>
            {/* Listen on all platforms */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '40px 30px',
                boxShadow: '0 4px 16px rgba(138, 92, 255, 0.12)',
                marginBottom: '40px',
              }}
            >
              {/* Album Image */}
              <div style={{ marginBottom: '30px', borderRadius: '12px', overflow: 'hidden', height: '300px', position: 'relative' }}>
                <Image
                  src={`/optimized/albums/${lp.slug}-full.jpg`}
                  alt={lp.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  sizes="(max-width: 640px) 90vw, 600px"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>

              {/* Title Section */}
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1
                  style={{
                    fontSize: '3.2em',
                    fontWeight: 'bold',
                    margin: '0 0 20px 0',
                    color: '#1a1a1a',
                  }}
                >
                  {lp.title} {lp.emoji}
                </h1>
              </div>

              <h2 style={{ fontSize: '1.2em', margin: '0 0 30px 0', color: '#666', textAlign: 'center' }}>
                escute agora no seu streaming 🌷
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* Spotify */}
                <a
                  href={`https://open.spotify.com/search/${lp.title}%20pedroluz`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px 0',
                    textDecoration: 'none',
                    color: '#1a1a1a',
                    transition: 'opacity 0.3s',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f0f0f0',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <FaSpotify size={28} style={{ color: '#1DB954', flexShrink: 0 }} />
                  <span style={{ fontSize: '1.15em' }}>Spotify</span>
                </a>

                {/* YouTube */}
                <a
                  href={`https://www.youtube.com/results?search_query=${lp.title}%20pedroluz`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px 0',
                    textDecoration: 'none',
                    color: '#1a1a1a',
                    transition: 'opacity 0.3s',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f0f0f0',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <FaYoutube size={28} style={{ color: '#FF0000', flexShrink: 0 }} />
                  <span style={{ fontSize: '1.15em' }}>YouTube</span>
                </a>

                {/* Apple Music */}
                <a
                  href="https://music.apple.com/br/artist/pedroluz/1462177131"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px 0',
                    textDecoration: 'none',
                    color: '#1a1a1a',
                    transition: 'opacity 0.3s',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f0f0f0',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <FaApple size={28} style={{ color: '#555555', flexShrink: 0 }} />
                  <span style={{ fontSize: '1.15em' }}>Apple Music</span>
                </a>

                {/* Deezer */}
                <a
                  href="https://www.deezer.com/search?q=pedroluz"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px 0',
                    textDecoration: 'none',
                    color: '#1a1a1a',
                    transition: 'opacity 0.3s',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f0f0f0',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <span style={{ fontSize: '1.3em', flexShrink: 0 }}>🎵</span>
                  <span style={{ fontSize: '1.15em' }}>Deezer</span>
                </a>

                {/* Amazon Music */}
                <a
                  href="https://music.amazon.com/artists/B07RKDK84Z/pedroluz"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px 0',
                    textDecoration: 'none',
                    color: '#1a1a1a',
                    transition: 'opacity 0.3s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  <FaAmazon size={28} style={{ color: '#FF9900', flexShrink: 0 }} />
                  <span style={{ fontSize: '1.15em' }}>Amazon Music</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '30px 25px',
                boxShadow: '0 4px 16px rgba(138, 92, 255, 0.12)',
              }}
            >
              <h2 style={{ fontSize: '1.2em', margin: '0 0 20px 0', color: '#1a1a1a', textAlign: 'center' }}>
                Me acompanhe
              </h2>
              <div className="flex gap-6 justify-center" style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {/* Spotify Social */}
                <a 
                  href="https://open.spotify.com/artist/2rj8ccj3Z0rfVh18nxzZUQ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                  style={{ textDecoration: 'none' }}
                >
                  <FaSpotify size={32} style={{ color: '#1DB954' }} />
                </a>

                {/* YouTube Social */}
                <a 
                  href="https://www.youtube.com/@pedroluzer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                  style={{ textDecoration: 'none' }}
                >
                  <FaYoutube size={32} style={{ color: '#FF0000' }} />
                </a>

                {/* Instagram Social */}
                <a 
                  href="https://www.instagram.com/pedroluz._" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                  style={{ textDecoration: 'none' }}
                >
                  <FaInstagram size={32} style={{ color: '#E1306C' }} />
                </a>

                {/* TikTok Social */}
                <a 
                  href="https://www.tiktok.com/@_pedroluz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                  style={{ textDecoration: 'none' }}
                >
                  <FaTiktok size={32} style={{ color: '#000000' }} />
                </a>

                {/* LinkedIn Social */}
                <a 
                  href="https://linkedin.com/in/pedroblayaluz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                  style={{ textDecoration: 'none' }}
                >
                  <FaLinkedin size={32} style={{ color: '#0A66C2' }} />
                </a>

                {/* GitHub Social */}
                <a 
                  href="https://github.com/pedroblayaluz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                  style={{ textDecoration: 'none' }}
                >
                  <FaGithub size={32} style={{ color: '#333333' }} />
                </a>
              </div>
            </div>

            {/* Padding for mountains */}
            <div style={{ height: '400px' }} />
      </main>
    </DecoratedPageLayout>
  );
}
