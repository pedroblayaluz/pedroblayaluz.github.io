'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MusicTimeline } from './MusicTimeline';
import { PoetryGrid } from './PoetryGrid';
import { ProjectsGrid } from './ProjectsGrid';

interface SliderPosition {
  id: string;
  label: string;
  emoji: string;
}

const positions: SliderPosition[] = [
  { id: 'musica', label: 'Música', emoji: '🎸' },
  { id: 'poesia', label: 'Poesia', emoji: '🌷' },
  { id: 'outros', label: 'Escrita', emoji: '✍️' },
];

export function ContentSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dotPositions, setDotPositions] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = positions[selectedIndex];

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

  const renderContent = () => {
    switch (selected.id) {
      case 'musica':
        return <MusicTimeline />;
      case 'poesia':
        return <PoetryGrid />;
      case 'outros':
        return <ProjectsGrid />;
      default:
        return null;
    }
  };

  const updatePosition = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const percentage = (clientX - rect.left) / rect.width;
      const clampedPercentage = Math.max(0, Math.min(1, percentage));
      
      // Find closest dot position
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

  const sliderPercentage = dotPositions.length > 0 ? dotPositions[selectedIndex] : 0;

  return (
    <div style={{ width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      {/* Title */}
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

      {/* Labels and Slider Track */}
      <div ref={containerRef} style={{ position: 'relative', marginBottom: '1.5rem', padding: '0' }}>
        {/* Grid layout for buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem', position: 'relative' }}>
          {positions.map((position, index) => (
            <div key={`item-${position.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Button */}
              <button
                ref={(el) => { buttonRefs.current[index] = el; }}
                onClick={() => setSelectedIndex(index)}
                onMouseDown={handleMouseDown}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: selectedIndex === index ? '#ffffff' : '#f0e6ff',
                  color: selectedIndex === index ? '#1a1a1a' : '#9b96ab',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  textTransform: 'lowercase',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: selectedIndex === index ? '0 2px 8px rgba(138, 92, 255, 0.15)' : 'none',
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
                transition: isDragging ? 'none' : 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
          {positions.map((position, index) => {
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

      {/* Content Area */}
      <div style={{ marginTop: '1rem', minHeight: '1000px' }}>
        {renderContent()}
      </div>
    </div>
  );
}
