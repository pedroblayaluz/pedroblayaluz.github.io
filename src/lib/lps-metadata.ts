export interface LPMetadata {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  spotifyEmbedId: string;
  spotifyType: 'track' | 'album';
  youtubeEmbedId: string;
  image: string;
  backgroundColor?: string;
  accentColor?: string;
}

export const lpsData: LPMetadata[] = [
  {
    slug: 'sddsorkut',
    title: 'sdds orkut',
    emoji: '💜',
    description: 'Escuta agora 🌷',
    spotifyEmbedId: '1wvKiucBlfbGwKNgwox6kG',
    spotifyType: 'track',
    youtubeEmbedId: 'Z7onMZBUI7A',
    image: '/albums/sdds-orkut.jpg',
    backgroundColor: '#f7f1ff',
  },
  {
    slug: 'millennial',
    title: 'Millennial',
    emoji: '🏔️',
    description: 'Escuta agora 🌷',
    spotifyEmbedId: '3nMD0enYUV1bDuKgj4HLVl',
    spotifyType: 'album',
    youtubeEmbedId: 'rGuLEts10KI',
    image: '/albums/millennial.jpg',
    backgroundColor: '#f7f1ff',
  },
  {
    slug: 'sonholucido',
    title: 'Sonho Lúcido',
    emoji: '🧙🏻‍♂️',
    description: 'Escuta agora 🌷',
    spotifyEmbedId: '2O8lNoPJK2OTDwY85pPG9I',
    spotifyType: 'track',
    youtubeEmbedId: 'aAVAkcR-cR0',
    image: '/albums/sonho-lucido.jpg',
    backgroundColor: '#f7f1ff',
  },
  {
    slug: 'sentido',
    title: '$entid0',
    emoji: '👁️‍🗨️',
    description: 'Escuta agora 🌷',
    spotifyEmbedId: '06IUbzyxdblX6gy9FNmT3c',
    spotifyType: 'track',
    youtubeEmbedId: 'EhJ9prXb0N8',
    image: '/albums/millennial.jpg', // Parte do album millennial
    backgroundColor: '#f7f1ff',
  },
  {
    slug: 'meioblackmirror',
    title: 'meio black mirror',
    emoji: '📱',
    description: 'Escuta agora 🌷',
    spotifyEmbedId: '0PPD0gayhsn7SYOONsasXW',
    spotifyType: 'track',
    youtubeEmbedId: 'B6mL1C84B4U',
    image: '/albums/millennial.jpg', // Parte do album millennial
    backgroundColor: '#f7f1ff',
  },
  {
    slug: 'macacosurbanos',
    title: 'macacos urbanos',
    emoji: '🙈',
    description: 'Escuta agora 🌷',
    spotifyEmbedId: '1QakFtnk72N1DOEcU0OV1q',
    spotifyType: 'track',
    youtubeEmbedId: 'QTpMTBv3cj4',
    image: '/albums/millennial.jpg', // Parte do album millennial
    backgroundColor: '#f7f1ff',
  },
  {
    slug: 'euacho',
    title: 'eu acho',
    emoji: '🌾',
    description: 'Escuta agora 🌷',
    spotifyEmbedId: '3lvGyHDUIlAM5ipm6cmobg',
    spotifyType: 'track',
    youtubeEmbedId: 'FeE7907bBHA',
    image: '/albums/millennial.jpg', // Parte do album millennial
    backgroundColor: '#f7f1ff',
  },
  {
    slug: 'nosquereminfelizes',
    title: 'nos querem infelizes.',
    emoji: '😞',
    description: 'Escuta agora 🌷',
    spotifyEmbedId: '3z6ucuggkQxdffEZPRMiID',
    spotifyType: 'track',
    youtubeEmbedId: '31O2xUpBgo0',
    image: '/albums/infelizes.jpg',
    backgroundColor: '#f7f1ff',
  },
  {
    slug: 'ghosting',
    title: 'Ghosting com o mundo',
    emoji: '👻',
    description: 'Escuta agora 🌷',
    spotifyEmbedId: '6t8wNssH4bNZVcw5HlyVo6',
    spotifyType: 'track',
    youtubeEmbedId: 'rYWLafROaSc',
    image: '/albums/ghosting.jpg',
    backgroundColor: '#f7f1ff',
  },
  {
    slug: '1000caminhos',
    title: '1000 Caminhos',
    emoji: '🎸',
    description: 'Escuta agora 🌷',
    spotifyEmbedId: '6qj9Q3dQmrwGR8tTPFJKuH',
    spotifyType: 'track',
    youtubeEmbedId: 'NRdQ2uLZBuo',
    image: '/albums/1000-caminhos.jpg',
    backgroundColor: '#f7f1ff',
  },
];

export function getLPBySlug(slug: string): LPMetadata | undefined {
  return lpsData.find((lp) => lp.slug === slug);
}

export function getAllLPSlugs(): string[] {
  return lpsData.map((lp) => lp.slug);
}
