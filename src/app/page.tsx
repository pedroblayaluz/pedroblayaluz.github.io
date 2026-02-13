'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaSpotify, FaYoutube, FaInstagram, FaTiktok, FaLinkedin, FaGithub } from "react-icons/fa";
import { LightningAnimation, SnowflakesAnimation, ContentSlider, MusicTimeline, PoetryGrid, ProjectsGrid, ScrollNavigation } from "@/components";

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling past 200px
      setShowNavbar(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        headerRef.current?.contains(target) ||
        navRef.current?.contains(target)
      ) {
        return; // click was inside header or nav, ignore
      }
      setMobileMenuOpen(false);
    };

    // Use timeout so the opening click doesn't immediately close
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Menu hover handlers (avoid inline complex expressions in JSX)
  const handleMenuEnter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.backgroundColor = '#f2e6ff';
  };

  const handleMenuLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
  };

  return (
    <>
      {/* Navbar - appears on scroll */}
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 h-14 bg-white flex items-center px-4 shadow-sm transition-opacity duration-300 cursor-pointer ${
          showNavbar ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ fontWeight: 350, zIndex: 9999 }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <h2 className="m-0 text-lg text-gray-900 flex items-center gap-2" style={{ fontWeight: 350, pointerEvents: 'none' }}>
          <div className="w-5 h-5 flex-shrink-0">
            <Image
              src="/pedroluz.ico"
              alt="pedroluz"
              width={20}
              height={20}
            />
          </div>
          <span>pedroluz</span>
        </h2>

        {/* Burger Menu Button - visual only */}
        <div className="flex flex-col gap-1.5 ml-auto pointer-events-none">
          <span className={`block w-7 h-0.5 transition-all ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`} style={{ backgroundColor: '#a397eb' }}></span>
          <span className={`block w-7 h-0.5 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: '#a397eb' }}></span>
          <span className={`block w-7 h-0.5 transition-all ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} style={{ backgroundColor: '#a397eb' }}></span>
        </div>
      </header>

      {/* Menu */}
      <nav ref={navRef} className={`fixed top-14 left-0 right-0 bg-white shadow-sm transition-opacity duration-300 ${mobileMenuOpen && showNavbar ? 'block' : 'hidden'}`} style={{ zIndex: 9998 }}>
        <ul className="list-none p-2 m-0 space-y-1">
          <li><a href="#home" className="block px-3 py-2.5 rounded text-base cursor-pointer" style={{ color: '#6b629d', fontWeight: 350, textDecoration: 'none' }} onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave} onClick={() => setMobileMenuOpen(false)}>página inicial</a></li>
          <li><a href="#arte" className="block px-3 py-2.5 rounded text-base cursor-pointer" style={{ color: '#6b629d', fontWeight: 350, textDecoration: 'none' }} onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave} onClick={() => setMobileMenuOpen(false)}>arte</a></li>
          <li><a href="#musica" className="block px-3 py-2.5 rounded text-base cursor-pointer" style={{ color: '#6b629d', fontWeight: 350, textDecoration: 'none' }} onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave} onClick={() => setMobileMenuOpen(false)}>música</a></li>
          <li><a href="#poesia" className="block px-3 py-2.5 rounded text-base cursor-pointer" style={{ color: '#6b629d', fontWeight: 350, textDecoration: 'none' }} onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave} onClick={() => setMobileMenuOpen(false)}>poesia</a></li>
          <li><a href="https://blaya.ia.br" target="_blank" rel="noopener noreferrer" className="block px-3 py-2.5 rounded text-base cursor-pointer" style={{ color: '#6b629d', fontWeight: 350, textDecoration: 'none' }} onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave} onClick={() => setMobileMenuOpen(false)}>software</a></li>
        </ul>
      </nav>

      <div style={{ backgroundColor: '#f7f1ff' }}>
        {/* SECTION 1: Landing / Profile */}
        <div id="home" className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#f7f1ff', scrollMarginTop: '3.5rem' }}>
          {/* Animations */}
          <LightningAnimation />
          <SnowflakesAnimation />

          {/* Mountains Background - Fixed */}
          <div 
            className="fixed bottom-0 left-0 right-0 pointer-events-none"
            style={{
              width: '100%',
              height: '600px',
              zIndex: 1
            }}
          >
            <Image
              src="/optimized/mountains-desktop.jpg"
              alt="Mountains"
              width={1920}
              height={600}
              priority
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 0%'
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
                objectPosition: 'center 0%'
              }}
              className="block md:hidden"
              sizes="100vw"
            />
          </div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 50 }}>
            <style>{`
              .card-description {
                margin: 0 !important;
                max-height: 0;
                overflow: hidden;
                opacity: 0;
                transition: max-height 0.3s ease, opacity 0.3s ease;
              }
              
              button:hover .card-description,
              a:hover .card-description {
                margin-top: 0.75rem !important;
                max-height: 500px;
                opacity: 1;
              }
            `}</style>

            {/* Profile Section - Top */}
            <section className="px-4 md:px-8 lg:px-16 pt-16 md:pt-20 pb-8">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 justify-center">
                  <div 
                    className="w-16 h-16 overflow-hidden flex-shrink-0 rounded-full"
                    style={{
                      boxShadow: '0 4px 12px rgba(138, 92, 255, 0.2)',
                      border: '2px solid rgba(168, 85, 247, 0.2)'
                    }}
                  >
                    <Image
                      src="https://avatars.githubusercontent.com/pedroblayaluz"
                      alt="Pedro Blaya Luz"
                      width={64}
                      height={64}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <h1 className="text-2xl" style={{ fontWeight: 350, color: '#222', margin: 0 }}>
                    pedroluz
                  </h1>
                </div>
              </div>
            </section>

            {/* Buttons Section - Middle */}
            <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24 pb-12">
              <div className="max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Arte Button */}
                  <a
                    href="#arte"
                    className="rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer border-none flex flex-col items-center justify-center text-left"
                    style={{
                      backgroundColor: '#ffffff',
                      boxShadow: '0 2px 8px rgba(138, 92, 255, 0.1)',
                      minHeight: '80px',
                      padding: '1rem',
                      textDecoration: 'none'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex-shrink-0">
                        <Image
                          src="/pedroluz.ico"
                          alt="Arte"
                          width={24}
                          height={24}
                        />
                      </div>
                      <h2 className="text-2xl" style={{ fontWeight: 350, color: '#1a1a1a', margin: 0 }}>
                        Arte
                      </h2>
                    </div>
                    <p className="card-description" style={{ fontWeight: 300, color: '#555', margin: '0.75rem 0 0 0', fontSize: '0.95rem', lineHeight: '1.5', textAlign: 'left' }}>
                      Desde pequeno escrevo música e poesia como uma maneira de tentar encontrar algum sentido pra vida em meio a distopia em curso.
                    </p>
                  </a>

                  {/* Software Button */}
                  <a
                    href="https://blaya.ia.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer border-none flex flex-col items-center justify-center text-left"
                    style={{
                      backgroundColor: '#1f1f1f',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                      minHeight: '80px',
                      padding: '1rem',
                      textDecoration: 'none'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex-shrink-0">
                        <Image
                          src="/mountains.ico"
                          alt="Software"
                          width={40}
                          height={40}
                        />
                      </div>
                      <h2 className="text-2xl" style={{ fontWeight: 350, color: '#ffffff', margin: 0 }}>
                        Software
                      </h2>
                    </div>
                    <p className="card-description" style={{ fontWeight: 300, color: '#e0e0e0', margin: '0.75rem 0 0 0', fontSize: '0.95rem', lineHeight: '1.5', textAlign: 'left' }}>
                      Former biologist, found my vocation in data and AI. I've built end-to-end data solutions across multiple industries: dashboards and analysis, data pipelines, predictive models, and agentic AI.
                    </p>
                  </a>
                </div>
              </div>
            </section>

            {/* Socials Section */}
            <section className="px-4 md:px-8 lg:px-16 py-12 pb-20">
              <div className="max-w-2xl mx-auto">
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
              </div>
            </section>
          </div>
        </div>

        {/* SECTION 2: Arte / Main Content */}
        <div id="arte" className="min-h-screen text-gray-900 relative md:overflow-x-hidden" style={{ backgroundColor: '#f7f1ff', scrollMarginTop: '3.5rem' }}>
          {/* Mountains Background - Fixed */}
          <div 
            className="fixed bottom-0 left-0 right-0 pointer-events-none"
            style={{
              width: '100%',
              height: '600px',
              zIndex: 1
            }}
          >
            <Image
              src="/optimized/mountains-desktop.jpg"
              alt="Mountains"
              width={1920}
              height={600}
              priority
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 0%'
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
                objectPosition: 'center 0%'
              }}
              className="block md:hidden"
              sizes="100vw"
            />
          </div>

          {/* Content - relative z-index so it appears on top */}
          <div style={{ position: 'relative', zIndex: 50 }}>
            {/* Hero Section */}
            <section className="min-h-[calc(100vh-56px)] flex items-center justify-center relative overflow-hidden px-4 md:px-8 lg:px-16 py-8">
              <div className="relative z-10 w-full">
                {/* Content Slider */}
                <ContentSlider>
                  <ContentSlider.Title />
                  <ContentSlider.Track />
                  <ContentSlider.Content>
                    <ContentSlider.Panel id="musica">
                      <MusicTimeline />
                    </ContentSlider.Panel>
                    <ContentSlider.Panel id="poesia">
                      <PoetryGrid />
                    </ContentSlider.Panel>
                    <ContentSlider.Panel id="outros">
                      <ProjectsGrid />
                    </ContentSlider.Panel>
                  </ContentSlider.Content>
                </ContentSlider>
              </div>
            </section>
          </div>
        </div>

        {/* SECTION 3: Poesia */}
        <div id="poesia" className="text-gray-900 relative md:overflow-x-hidden" style={{ backgroundColor: '#f7f1ff', scrollMarginTop: '3.5rem' }}>
          {/* Mountains Background - Fixed */}
          <div 
            className="fixed bottom-0 left-0 right-0 pointer-events-none"
            style={{
              width: '100%',
              height: '600px',
              zIndex: 1
            }}
          >
            <Image
              src="/optimized/mountains-desktop.jpg"
              alt="Mountains"
              width={1920}
              height={600}
              priority
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 0%'
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
                objectPosition: 'center 0%'
              }}
              className="block md:hidden"
              sizes="100vw"
            />
          </div>

          {/* Content - relative z-index so it appears on top */}
          <div style={{ position: 'relative', zIndex: 50 }}>
            {/* Hero Section */}
            <section className="flex items-center justify-center relative overflow-hidden px-4 md:px-8 lg:px-16 py-8">
              <div className="relative z-10 max-w-6xl mx-auto w-full">
                
                {/* Poesia content will go here */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
