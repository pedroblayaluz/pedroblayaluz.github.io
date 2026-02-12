import { useCallback, CSSProperties } from 'react';

interface HoverEffectConfig {
  scaleEntrance?: number;
  scaleLeave?: number;
  shadowActive?: string;
  shadowLeave?: string;
  translateYEntrance?: number;
  duration?: string;
}

interface HoverHandlers {
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
}

const DEFAULT_TRANSITION = '0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';

/**
 * Custom hook for reusable hover effects
 * Reduces duplication of hover animations across components
 */
export function useHoverEffect(config: HoverEffectConfig = {}): {
  handlers: HoverHandlers;
  getStyle: (baseStyle?: CSSProperties) => CSSProperties;
} {
  const {
    scaleEntrance = 1.05,
    scaleLeave = 1,
    shadowActive = '0 12px 32px rgba(138, 92, 255, 0.15)',
    shadowLeave = '0 4px 12px rgba(138, 92, 255, 0.08)',
    translateYEntrance = 0,
    duration = DEFAULT_TRANSITION,
  } = config;

  const onMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const element = e.currentTarget as HTMLElement;
    element.style.transform = `scale(${scaleEntrance}) translateY(${translateYEntrance}px)`;
    element.style.boxShadow = shadowActive;
    element.style.transition = duration;
  }, [scaleEntrance, shadowActive, translateYEntrance, duration]);

  const onMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const element = e.currentTarget as HTMLElement;
    element.style.transform = `scale(${scaleLeave}) translateY(0)`;
    element.style.boxShadow = shadowLeave;
    element.style.transition = duration;
  }, [scaleLeave, shadowLeave, duration]);

  const getStyle = useCallback((baseStyle: CSSProperties = {}): CSSProperties => {
    return {
      ...baseStyle,
      transition: duration,
      boxShadow: shadowLeave,
    };
  }, [shadowLeave, duration]);

  return {
    handlers: { onMouseEnter, onMouseLeave },
    getStyle,
  };
}
