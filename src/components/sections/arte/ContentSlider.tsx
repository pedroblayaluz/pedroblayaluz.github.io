'use client';

import { useState, useRef, useEffect, ReactNode, useContext, createContext } from 'react';
import Image from 'next/image';
import { SLIDER_POSITIONS } from '@/lib/data';
import { STYLES } from '@/lib/styles/tokens';

interface SliderContextType {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const SliderContext = createContext<SliderContextType | undefined>(undefined);

function useSliderContext() {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error('useSliderContext must be used within ContentSlider');
  }
  return context;
}

/**
 * Content Slider Component with Compound Components pattern
 * Allows flexible composition and reduces coupling
 */
export function ContentSlider({ children }: { children: ReactNode }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SliderContext.Provider value={{ selectedIndex, setSelectedIndex }}>
      <div style={{ width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </SliderContext.Provider>
  );
}

/**
 * Title section of the slider
 */
ContentSlider.Title = function Title() {
  return (
    <div className="mb-4 px-4 md:px-4">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 flex-shrink-0">
          <Image
            src="/pedroluz.ico"
            alt="Arte"
            width={24}
            height={24}
          />
        </div>
        <h2
          className="text-3xl md:text-4xl"
          style={{ fontWeight: 350, color: '#222', margin: 0 }}
        >
          Arte
        </h2>
      </div>
    </div>
  );
};

/**
 * Track section with buttons and slider control
 */
ContentSlider.Track = function Track() {
  const { selectedIndex, setSelectedIndex } = useSliderContext();
  const [isDragging, setIsDragging] = useState(false);
  const [dotPositions, setDotPositions] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Calculate dot positions based on button centers
  useEffect(() => {
    if (containerRef.current && buttonRefs.current.every(ref => ref)) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const positions = buttonRefs.current.map((button) => {
        if (!button) return 0;
        const rect = button.getBoundingClientRect();
        const centerX = rect.left - containerRect.left + rect.width / 2;
        return (centerX / containerRect.width) * 100;
      });
      setDotPositions(positions);
    }
  }, []);

  const updatePosition = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const percentage = (clientX - rect.left) / rect.width;
      const clampedPercentage = Math.max(0, Math.min(1, percentage));

      let closestIndex = 0;
      let closestDistance = Math.abs(clampedPercentage * 100 - dotPositions[0]);

      for (let i = 1; i < dotPositions.length; i++) {
        const distance = Math.abs(clampedPercentage * 100 - dotPositions[i]);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      setSelectedIndex(closestIndex);
    }
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    updatePosition(e.clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dotPositions]);

  const selected = SLIDER_POSITIONS[selectedIndex];
  const sliderPercentage = dotPositions.length > 0 ? dotPositions[selectedIndex] : 0;

  return (
    <div ref={containerRef} style={{ position: 'relative', marginBottom: '1.5rem', padding: '0' }}>
      {/* Grid layout for buttons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '2rem',
          position: 'relative',
          padding: '0 0.5rem',
          boxSizing: 'border-box',
        }}
      >
        {SLIDER_POSITIONS.map((position, index) => (
          <div key={`item-${position.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              onClick={() => setSelectedIndex(index)}
              onMouseDown={handleMouseDown}
              style={{
                width: '100%',
                padding: STYLES.spacing.xs + ' ' + STYLES.spacing.xs,
                borderRadius: STYLES.borderRadius.small,
                border: 'none',
                cursor: 'pointer',
                transition: STYLES.transitions.default,
                backgroundColor: selectedIndex === index ? '#ffffff' : STYLES.colors.backgrounds.light,
                color: selectedIndex === index ? '#1a1a1a' : STYLES.colors.text.tertiary,
                fontWeight: 500,
                fontSize: '0.75rem',
                fontFamily: 'Arial, Helvetica, sans-serif',
                textTransform: 'lowercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: STYLES.spacing.xs,
                boxShadow: selectedIndex === index ? STYLES.shadows.card : 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <span>{position.emoji}</span>
              <span>{position.label}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Track with dots and moving ball */}
      <div
        style={{
          position: 'relative',
          height: '2px',
          backgroundColor: '#e0d4f7',
          borderRadius: '1px',
          cursor: 'pointer',
          width: dotPositions.length > 0 ? `${dotPositions[dotPositions.length - 1] - dotPositions[0]}%` : '100%',
          marginLeft: `${dotPositions.length > 0 ? dotPositions[0] : 0}%`,
        }}
        onMouseDown={handleMouseDown}
        onClick={handleTrackClick}
      >
        {/* Static position dots */}
        {dotPositions.map((dotPos, index) => (
          <div
            key={`dot-${index}`}
            style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#d4c5f9',
              top: '50%',
              left: `${(dotPos - dotPositions[0]) / (dotPositions[dotPositions.length - 1] - dotPositions[0]) * 100}%`,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Moving slider ball */}
        {dotPositions.length > 0 && (
          <div
            style={{
              position: 'absolute',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              top: '50%',
              left: `${(sliderPercentage - dotPositions[0]) / (dotPositions[dotPositions.length - 1] - dotPositions[0]) * 100}%`,
              transform: 'translate(-50%, -50%)',
              cursor: isDragging ? 'grabbing' : 'grab',
              transition: isDragging ? 'none' : STYLES.transitions.smooth,
              boxShadow: 'none',
              zIndex: 10,
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: '#ffffff',
              fontWeight: 'bold',
            }}
            onMouseDown={handleMouseDown}
          >
            {selected.emoji}
          </div>
        )}
      </div>

      {/* Clickable areas - one for each button */}
      <div style={{ position: 'relative', width: '100%', height: '0' }}>
        {SLIDER_POSITIONS.map((position, index) => {
          const oneThird = 100 / 3;
          const leftPercent = index * oneThird;
          return (
            <div
              key={`clickable-${index}`}
              style={{
                position: 'absolute',
                top: '-60px',
                left: `${leftPercent}%`,
                width: `${oneThird}%`,
                height: '80px',
                cursor: 'pointer',
                zIndex: 5,
              }}
              onClick={() => setSelectedIndex(index)}
              onMouseDown={handleMouseDown}
            />
          );
        })}
      </div>
    </div>
  );
};

/**
 * Content area that renders child components based on selected index
 */
ContentSlider.Content = function Content({ children }: { children: ReactNode }) {
  return (
    <div style={{ marginTop: STYLES.spacing.md, minHeight: '1000px' }}>
      {children}
    </div>
  );
};

/**
 * Individual panel for slider content
 */
ContentSlider.Panel = function Panel({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const { selectedIndex } = useSliderContext();
  const panelIndex = SLIDER_POSITIONS.findIndex((pos) => pos.id === id);

  if (selectedIndex !== panelIndex) return null;

  return <>{children}</>;
};
