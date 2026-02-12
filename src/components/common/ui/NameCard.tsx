'use client';

import Image from "next/image";

export const NameCard = ({ variant = 1 }: { variant?: 1 | 2 | 3 }) => {
  if (variant === 1) {
    // Version 1: Minimalist line with floating effect
    return (
      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div className="h-32 flex items-start justify-center pt-8">
          <div
            className="animate-pulse"
            style={{
              textShadow: '0 2px 8px rgba(168, 85, 247, 0.2)',
            }}
          >
            <h1 className="text-5xl md:text-6xl font-light tracking-widest" style={{ color: '#a855f7', letterSpacing: '0.2em' }}>
              pedroluz
            </h1>
            <div className="h-0.5 w-24 mx-auto mt-2" style={{ backgroundColor: '#c084fc', opacity: 0.5 }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 2) {
    // Version 2: Minimal border box with icon
    return (
      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div className="h-32 flex items-center justify-center pt-8">
          <div
            className="px-8 py-4 rounded-lg"
            style={{
              border: '2px solid rgba(168, 85, 247, 0.3)',
              backgroundColor: 'rgba(168, 85, 247, 0.05)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex-shrink-0">
                <Image
                  src="/pedroluz.ico"
                  alt="pedroluz"
                  width={20}
                  height={20}
                />
              </div>
              <h1 className="text-2xl md:text-3xl font-light" style={{ color: '#a855f7', margin: 0 }}>
                pedroluz
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Version 3: Gradient text with subtle background
  return (
    <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
      <div className="h-32 flex items-center justify-center pt-8">
        <div
          className="px-8 py-3 rounded"
          style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.05))',
          }}
        >
          <h1
            className="text-4xl md:text-5xl font-light tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
            }}
          >
            pedroluz
          </h1>
        </div>
      </div>
    </div>
  );
};
