'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function ScrollNavigation() {
  const router = useRouter();
  const hasNavigatedRef = useRef(false);
  const lastScrollTimeRef = useRef<number>(0);

  useEffect(() => {
    // Add extra scrollable content to the page
    const extendPage = () => {
      const spacer = document.createElement('div');
      spacer.id = 'scroll-spacer';
      spacer.style.height = '200vh';
      spacer.style.pointerEvents = 'none';
      document.body.appendChild(spacer);
    };

    extendPage();

    const handleScroll = () => {
      if (hasNavigatedRef.current) return;

      const now = Date.now();
      if (now - lastScrollTimeRef.current < 50) return;
      lastScrollTimeRef.current = now;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Trigger navigation when user scrolls past 30% of the extended page
      if (scrollTop > docHeight * 0.3) {
        hasNavigatedRef.current = true;
        navigateToArte();
      }
    };

    const navigateToArte = () => {
      // Remove spacer
      const spacer = document.getElementById('scroll-spacer');
      if (spacer) spacer.remove();

      // Smooth transition
      const overlay = document.createElement('div');
      overlay.id = 'page-transition-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        opacity: 0;
        z-index: 1000;
        pointer-events: none;
        transition: opacity 500ms ease-in-out;
      `;
      document.body.appendChild(overlay);

      // Scroll to top while overlaying
      window.scrollTo({ top: 0, behavior: 'auto' });

      // Fade in
      requestAnimationFrame(() => {
        overlay.style.opacity = '1';
      });

      // Navigate after animation
      setTimeout(() => {
        router.push('/main');
      }, 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      const spacer = document.getElementById('scroll-spacer');
      if (spacer) spacer.remove();
      const overlay = document.getElementById('page-transition-overlay');
      if (overlay) overlay.remove();
    };
  }, [router]);

  return null;
}
