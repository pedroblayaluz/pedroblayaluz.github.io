'use client';

import Image from "next/image";
import { FaSpotify, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import { DecoratedPageLayout } from '@/components/common/layouts';

export function CoverContent() {
  return (
    <DecoratedPageLayout>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-56px)] flex items-center justify-center relative overflow-hidden px-4 py-20">
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* Profile Picture with Name */}
          <div className="mb-20 flex items-center gap-6 justify-start">
            <div 
              className="w-24 h-24 overflow-hidden flex-shrink-0"
            >
              <Image
                src="https://avatars.githubusercontent.com/pedroblayaluz"
                alt="Pedro Blaya Luz"
                width={96}
                height={96}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex-shrink-0">
                <Image
                  src="/pedroluz.ico"
                  alt="pedroluz"
                  width={24}
                  height={24}
                />
              </div>
              <h1 className="text-3xl md:text-4xl" style={{ fontWeight: 350, color: '#222', margin: 0 }}>
                pedroluz
              </h1>
            </div>
          </div>
          
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Escuta Agora Card */}
            <div 
              className="p-8 md:p-10 rounded-lg hover:shadow-xl transition-shadow duration-300"
              style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 8px rgba(138, 92, 255, 0.08)'
              }}
            >
              <h2 className="text-2xl md:text-3xl mb-8" style={{ fontWeight: 350, color: '#222' }}>
                escuta agora 🌷
              </h2>
              <div className="flex flex-col gap-4">
                {/* Spotify */}
                <a 
                  href="https://open.spotify.com/artist/2rj8ccj3Z0rfVh18nxzZUQ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                >
                  <FaSpotify size={32} style={{ color: '#1DB954', flexShrink: 0 }} />
                  <span style={{ fontWeight: 350, color: '#1a1a1a', fontSize: '1rem' }}>Spotify</span>
                </a>

                {/* YouTube */}
                <a 
                  href="https://www.youtube.com/@pedroluzer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                >
                  <FaYoutube size={32} style={{ color: '#FF0000', flexShrink: 0 }} />
                  <span style={{ fontWeight: 350, color: '#1a1a1a', fontSize: '1rem' }}>Youtube</span>
                </a>
              </div>
            </div>

            {/* Redes Sociais Card */}
            <div 
              className="p-8 md:p-10 rounded-lg hover:shadow-xl transition-shadow duration-300"
              style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 8px rgba(138, 92, 255, 0.08)'
              }}
            >
              <h2 className="text-2xl md:text-3xl mb-8" style={{ fontWeight: 350, color: '#222' }}>
                siga nas redes sociais
              </h2>
              <div className="flex flex-col gap-4">
                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/pedroluz._" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                >
                  <FaInstagram size={32} style={{ color: '#E1306C', flexShrink: 0 }} />
                  <span style={{ fontWeight: 350, color: '#1a1a1a', fontSize: '1rem' }}>Instagram</span>
                </a>

                {/* TikTok */}
                <a 
                  href="https://www.tiktok.com/@_pedroluz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity"
                >
                  <FaTiktok size={32} style={{ color: '#000000', flexShrink: 0 }} />
                  <span style={{ fontWeight: 350, color: '#1a1a1a', fontSize: '1rem' }}>Tiktok</span>
                </a>
              </div>
            </div>
          </div>

          {/* Software Card */}
          <div className="mt-8 w-full max-w-sm mx-auto">
            <a 
              href="https://blaya.ia.br" 
              target="_blank"
              rel="noopener noreferrer"
              className="block p-8 md:p-10 rounded-lg text-center hover:shadow-xl transition-shadow duration-300"
              style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 8px rgba(138, 92, 255, 0.08)',
                textDecoration: 'none'
              }}
            >
              <div style={{ fontWeight: 350, color: '#222', fontSize: '1.5rem' }}>
                software 👾
              </div>
            </a>
          </div>
        </div>
      </section>
    </DecoratedPageLayout>
  );
}
