/**
 * Mapping of release IDs to platform-specific URLs
 * This ensures each release has working, direct links to all platforms
 * Based on LP metadata with Spotify and YouTube IDs
 */

export interface ReleasePlatformLinks {
  [platformKey: string]: string;
}

export const releasePlatformLinks: Record<string, ReleasePlatformLinks> = {
  'sdds-orkut': {
    spotify: 'https://open.spotify.com/track/1wvKiucBlfbGwKNgwox6kG',
    youtube: 'https://www.youtube.com/watch?v=Z7onMZBUI7A',
    appleMusic: 'https://music.apple.com/br/song/sdds-orkut/1781080667',
    amazon: 'https://music.amazon.com/tracks/B0DNKRMDVL',
    deezer: 'https://link.deezer.com/s/32rhgyPlDTUhxGko06ABh',
  },
  'sonho-lucido': {
    spotify: 'https://open.spotify.com/track/2O8lNoPJK2OTDwY85pPG9I',
    youtube: 'https://www.youtube.com/watch?v=aAVAkcR-cR0',
    appleMusic: 'https://music.apple.com/br/artist/pedroluz/1462177131',
    amazon: 'https://www.amazonmusic.com/artists/B08NMJDH25',
    deezer: 'https://www.deezer.com/artist/6089502',
  },
  '1000-caminhos': {
    spotify: 'https://open.spotify.com/track/6qj9Q3dQmrwGR8tTPFJKuH',
    youtube: 'https://www.youtube.com/watch?v=NRdQ2uLZBuo',
    appleMusic: 'https://music.apple.com/br/artist/pedroluz/1462177131',
    amazon: 'https://www.amazonmusic.com/artists/B08NMJDH25',
    deezer: 'https://www.deezer.com/artist/6089502',
  },
  'ghosting': {
    spotify: 'https://open.spotify.com/track/6t8wNssH4bNZVcw5HlyVo6',
    youtube: 'https://www.youtube.com/watch?v=rYWLafROaSc',
    appleMusic: 'https://music.apple.com/br/artist/pedroluz/1462177131',
    amazon: 'https://www.amazonmusic.com/artists/B08NMJDH25',
    deezer: 'https://www.deezer.com/artist/6089502',
  },
  'infelizes': {
    spotify: 'https://open.spotify.com/track/3z6ucuggkQxdffEZPRMiID',
    youtube: 'https://www.youtube.com/watch?v=31O2xUpBgo0',
    appleMusic: 'https://music.apple.com/br/artist/pedroluz/1462177131',
    amazon: 'https://www.amazonmusic.com/artists/B08NMJDH25',
    deezer: 'https://www.deezer.com/artist/6089502',
  },
  'millennial': {
    spotify: 'https://open.spotify.com/album/3nMD0enYUV1bDuKgj4HLVl',
    youtube: 'https://www.youtube.com/watch?v=rGuLEts10KI',
    appleMusic: 'https://music.apple.com/br/artist/pedroluz/1462177131',
    amazon: 'https://www.amazonmusic.com/artists/B08NMJDH25',
    deezer: 'https://www.deezer.com/artist/6089502',
  },
  // Individual tracks from Millennial album
  'sentido': {
    spotify: 'https://open.spotify.com/track/06IUbzyxdblX6gy9FNmT3c',
    youtube: 'https://www.youtube.com/watch?v=EhJ9prXb0N8',
    appleMusic: 'https://music.apple.com/br/artist/pedroluz/1462177131',
    amazon: 'https://www.amazonmusic.com/artists/B08NMJDH25',
    deezer: 'https://www.deezer.com/artist/6089502',
  },
  'meioblackmirror': {
    spotify: 'https://open.spotify.com/track/0PPD0gayhsn7SYOONsasXW',
    youtube: 'https://www.youtube.com/watch?v=B6mL1C84B4U',
    appleMusic: 'https://music.apple.com/br/artist/pedroluz/1462177131',
    amazon: 'https://www.amazonmusic.com/artists/B08NMJDH25',
    deezer: 'https://www.deezer.com/artist/6089502',
  },
  'macacosurbanos': {
    spotify: 'https://open.spotify.com/track/1QakFtnk72N1DOEcU0OV1q',
    youtube: 'https://www.youtube.com/watch?v=QTpMTBv3cj4',
    appleMusic: 'https://music.apple.com/br/artist/pedroluz/1462177131',
    amazon: 'https://www.amazonmusic.com/artists/B08NMJDH25',
    deezer: 'https://www.deezer.com/artist/6089502',
  },
  'euacho': {
    spotify: 'https://open.spotify.com/track/3lvGyHDUIlAM5ipm6cmobg',
    youtube: 'https://www.youtube.com/watch?v=FeE7907bBHA',
    appleMusic: 'https://music.apple.com/br/artist/pedroluz/1462177131',
    amazon: 'https://www.amazonmusic.com/artists/B08NMJDH25',
    deezer: 'https://www.deezer.com/artist/6089502',
  },
};

// Mapping of LP slugs to release IDs
export const lpSlugToReleaseId: Record<string, string> = {
  sddsorkut: 'sdds-orkut',
  sonholucido: 'sonho-lucido',
  '1000caminhos': '1000-caminhos',
  ghosting: 'ghosting',
  nosquereminfelizes: 'infelizes',
  millennial: 'millennial',
  sentido: 'sentido',
  meioblackmirror: 'meioblackmirror',
  macacosurbanos: 'macacosurbanos',
  euacho: 'euacho',
};

export function getReleasePlatformUrl(releaseId: string, platformKey: string): string | undefined {
  return releasePlatformLinks[releaseId]?.[platformKey];
}

export function getReleaseIdFromLPSlug(lpSlug: string): string | undefined {
  return lpSlugToReleaseId[lpSlug];
}
