/**
 * Centralized data configuration
 * Keep component data separate from component logic
 */

export interface Poetry {
  filename: string;
  title: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const POETRY_DATA: Poetry[] = [
  { filename: '4212.png', title: '4212' },
  { filename: 'a vida.png', title: 'A Vida' },
  { filename: 'afinando.png', title: 'Afinando' },
  { filename: 'amor_outro.png', title: 'Amor Outro' },
  { filename: 'apaz2.png', title: 'A Paz' },
  { filename: 'arvores.jpg', title: 'Árvores' },
  { filename: 'comoloca.png', title: 'Como Loca' },
  { filename: 'droga.png', title: 'Droga' },
  { filename: 'escatologicos.jpg', title: 'Escatológicos' },
  { filename: 'estranho.png', title: 'Estranho' },
  { filename: 'et.png', title: 'E.T.' },
  { filename: 'eu.png', title: 'Eu' },
  { filename: 'gif.gif', title: 'GIF' },
  { filename: 'incrivel.png', title: 'Incrível' },
  { filename: 'jerusalem.png', title: 'Jerusalém' },
  { filename: 'letras.png', title: 'Letras' },
  { filename: 'love.png', title: 'Love' },
  { filename: 'mundo.png', title: 'Mundo' },
  { filename: 'nada-tudo.png', title: 'Nada-Tudo' },
  { filename: 'poeira estelar.png', title: 'Poeira Estelar' },
  { filename: 'poesiabraco.png', title: 'Poesia Braço' },
  { filename: 'por-que2.png', title: 'Por Quê?' },
  { filename: 'pressa.png', title: 'Pressa' },
  { filename: 'riso.jpg', title: 'Riso' },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'criatura',
    title: 'Uma criaturinha interessante',
    description: 'Um encontro inusitado na beira do rio',
    image: 'criatura',
  },
  {
    id: 'sta_marta',
    title: 'Farol de Santa Marta',
    description: 'o velho, a Kombi e a decisão de pegar a estrada',
    image: '03',
  },
];

export const SLIDER_POSITIONS = [
  { id: 'musica', label: 'Música', emoji: '🎸' },
  { id: 'poesia', label: 'Poesia', emoji: '🌷' },
  { id: 'outros', label: 'Escrita', emoji: '✍️' },
];
