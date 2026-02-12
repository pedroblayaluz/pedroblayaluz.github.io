/**
 * Design tokens - Centralized styling across the application
 * Use these constants to maintain consistency and reduce duplication
 */

export const STYLES = {
  colors: {
    primary: '#a397eb',
    background: '#f7f1ff',
    text: {
      primary: '#1a1a1a',
      secondary: '#666',
      tertiary: '#9b96ab',
    },
    overlay: {
      dark: 'rgba(0, 0, 0, 0.8)',
      light: 'rgba(0, 0, 0, 0.6)',
      card: 'rgba(138, 92, 255, 0.08)',
      cardHover: 'rgba(138, 92, 255, 0.15)',
    },
    backgrounds: {
      light: '#f0e6ff',
      lighter: '#f5f0ff',
    },
  },

  shadows: {
    light: '0 4px 12px rgba(138, 92, 255, 0.08)',
    medium: '0 12px 32px rgba(138, 92, 255, 0.15)',
    modal: '0 20px 60px rgba(0, 0, 0, 0.3)',
    card: '0 2px 8px rgba(138, 92, 255, 0.15)',
  },

  transitions: {
    smooth: '0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    quick: '0.2s ease',
    default: 'all 0.3s ease',
  },

  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '16px',
    circle: '50%',
  },

  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
  },

  typography: {
    heading: {
      h1: {
        fontSize: '2rem',
        fontWeight: '600',
        lineHeight: '1.2',
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: '600',
        lineHeight: '1.3',
      },
      h3: {
        fontSize: '1.15rem',
        fontWeight: '600',
        lineHeight: '1.3',
      },
    },
    body: {
      default: {
        fontSize: '0.95rem',
        lineHeight: '1.6',
      },
      small: {
        fontSize: '0.85rem',
        lineHeight: '1.5',
      },
    },
  },

  zIndex: {
    background: 0,
    decorations: 1,
    content: 100,
    menuBackdrop: 999,
    menuDropdown: 1000,
    navbar: 1001,
  },
} as const;

// Common hover animation profiles
export const HOVER_EFFECTS = {
  scaleUp: {
    scale: 1.05,
    shadowActive: STYLES.shadows.medium,
  },
  scaleUpLarge: {
    scale: 1.02,
    translateY: -8,
    shadowActive: STYLES.shadows.medium,
  },
  subtleScale: {
    scale: 1.02,
    shadowActive: STYLES.shadows.light,
  },
} as const;
