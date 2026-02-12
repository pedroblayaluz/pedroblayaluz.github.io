/**
 * Centralized z-index configuration
 * Layer order from back to front:
 * 0: Background/Decorative elements (mountains, background)
 * 1: Lightning and snowflakes animations
 * 100: Page content (main, cards, containers)
 * 999: Mobile menu backdrop (if needed)
 * 1000: Navigation menu dropdown
 * 1001: Navigation header/navbar
 */

export const LAYERS = {
  // Background elements (mountains, etc)
  BACKGROUND: 0,
  
  // Decorative animations
  DECORATIONS: 1,
  
  // Main page content
  CONTENT: 100,
  
  // Mobile menu
  MENU_BACKDROP: 999,
  MENU_DROPDOWN: 1000,
  
  // Navigation bar (always on top)
  NAVBAR: 1001,
} as const;
