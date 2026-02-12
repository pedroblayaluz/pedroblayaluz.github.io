// Common Components (ui, layouts, navigation)
export * from './common';

// Section Components (cover, arte, lps)
export * from './sections';

// Animations
export { CloudsAnimation, LightningAnimation, SnowflakesAnimation } from './animations';

// Re-export section components explicitly
export { PoetryGrid, ProjectsGrid, MusicTimeline, ContentSlider } from './sections/arte';
export { CoverContent } from './sections/cover';
export { LPPage } from './sections/lps';
export { ScrollNavigation } from './common/navigation';
