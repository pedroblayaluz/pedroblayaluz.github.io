'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Poetry {
  filename: string;
  title: string;
}

const poesias: Poetry[] = [
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

export function PoetryGrid() {
  const [selectedPoetry, setSelectedPoetry] = useState<Poetry | null>(null);

  return (
    <>
      {/* Grid de poesias */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '0.75rem',
        padding: '2rem 0.5rem',
        margin: '0 auto',
        maxWidth: '600px',
      }}>
        {poesias.map((poetry, index) => (
          <div
            key={index}
            onClick={() => setSelectedPoetry(poetry)}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '8px',
              cursor: 'pointer',
              aspectRatio: '1',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(138, 92, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Image
              src={`/poesias/${poetry.filename}`}
              alt={poetry.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>

      {/* Modal da poesia selecionada */}
      {selectedPoetry && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setSelectedPoetry(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              backgroundColor: '#fff',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/poesias/${selectedPoetry.filename}`}
              alt={selectedPoetry.title}
              width={800}
              height={800}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            
            {/* Fechar modal */}
            <button
              onClick={() => setSelectedPoetry(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
