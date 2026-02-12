'use client';

import { STYLES } from '@/lib/styles/tokens';

interface CloseButtonProps {
  onClick: () => void;
  label?: string;
  variant?: 'dark' | 'light';
}

/**
 * Reusable close button for modals
 * Eliminates repetitive styling across components
 */
export function CloseButton({ 
  onClick, 
  label = '✕',
  variant = 'dark' 
}: CloseButtonProps) {
  const bgColor = variant === 'dark' 
    ? STYLES.colors.overlay.light
    : 'rgba(255, 255, 255, 0.8)';
  
  const bgColorHover = variant === 'dark'
    ? STYLES.colors.overlay.dark
    : 'rgba(255, 255, 255, 1)';

  const textColor = variant === 'dark' ? '#fff' : '#333';

  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: STYLES.spacing.md,
        right: STYLES.spacing.md,
        width: '40px',
        height: '40px',
        borderRadius: STYLES.borderRadius.circle,
        backgroundColor: bgColor,
        color: textColor,
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: STYLES.transitions.quick,
        zIndex: 10,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = bgColorHover;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = bgColor;
      }}
      aria-label="Close modal"
    >
      {label}
    </button>
  );
}
