import { FaSpotify, FaYoutube, FaApple, FaAmazon, FaDeezer, FaItunes } from 'react-icons/fa';

export interface Platform {
  name: string;
  icon: typeof FaSpotify;
  color: string;
  getUrl: (title?: string) => string;
}

export const platforms: Record<string, Platform> = {
  spotify: {
    name: 'Spotify',
    icon: FaSpotify,
    color: '#1DB954',
    getUrl: () => 'https://open.spotify.com/artist/6uRcjE0rK3XCDn3XpZMFUL',
  },
  youtube: {
    name: 'YouTube',
    icon: FaYoutube,
    color: '#FF0000',
    getUrl: () => 'https://www.youtube.com/@pedroluzer',
  },
  appleMusic: {
    name: 'Apple Music',
    icon: FaApple,
    color: '#555555',
    getUrl: () => 'https://music.apple.com/br/artist/pedroluz/1462177131',
  },
  amazon: {
    name: 'Amazon Music',
    icon: FaAmazon,
    color: '#FF9900',
    getUrl: () => 'https://www.amazonmusic.com/artists/B08NMJDH25',
  },
  deezer: {
    name: 'Deezer',
    icon: FaDeezer,
    color: '#FF0080',
    getUrl: () => 'https://www.deezer.com/artist/6089502',
  },
};

// Platform keys for different contexts
export const LP_PLATFORMS = ['spotify', 'youtube', 'appleMusic', 'amazon', 'deezer'] as const;
export const TIMELINE_HEADER_PLATFORMS = ['spotify', 'youtube'] as const;
export const TIMELINE_EXPANDED_PLATFORMS = ['spotify', 'youtube', 'deezer', 'appleMusic', 'amazon'] as const;