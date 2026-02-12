'use client';

import Image from 'next/image';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 'criatura',
    title: 'Uma criaturinha interessante',
    description: 'Um encontro inusitado na beira do rio',
    image: '/projetos/criatura/criatura.png',
  },
  {
    id: 'sta_marta',
    title: 'Farol de Santa Marta',
    description: 'o velho, a Kombi e a decisão de pegar a estrada',
    image: '/projetos/sta_marta/03.jpg',
  },
];

export function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>('');

  const handleProjectClick = async (project: Project) => {
    setSelectedProject(project);
    try {
      const response = await fetch(`/projetos/${project.id}.md`);
      const content = await response.text();
      setMarkdownContent(content);
    } catch (error) {
      console.error('Error loading project:', error);
      setMarkdownContent('Erro ao carregar o projeto');
    }
  };



  return (
    <>
      {/* Grid de projetos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2.5rem',
          padding: '3rem 2rem',
          margin: '0 auto',
          maxWidth: '1200px',
        }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project)}
            style={{
              cursor: 'pointer',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 12px rgba(138, 92, 255, 0.08)',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(138, 92, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(138, 92, 255, 0.08)';
            }}
          >
            {/* Image Container - Square with centered crop */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '240px',
                backgroundColor: '#f5f0ff',
                overflow: 'hidden',
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ 
                  objectFit: 'cover', 
                  objectPosition: 'center center',
                }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Gradient overlay at bottom for better text readability */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '60px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.1), transparent)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 
                style={{ 
                  margin: '0 0 0.75rem 0', 
                  fontSize: '1.15rem', 
                  fontWeight: '600', 
                  color: '#1a1a1a',
                  lineHeight: '1.3',
                }}
              >
                {project.title}
              </h3>
              
              <p 
                style={{ 
                  margin: 0, 
                  fontSize: '0.95rem', 
                  color: '#666', 
                  lineHeight: '1.5',
                  flex: 1,
                }}
              >
                {project.description}
              </p>
              
              {/* Read more indicator */}
              <div 
                style={{
                  marginTop: '1rem',
                  fontSize: '0.85rem',
                  color: '#a397eb',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                Ler
                <span style={{ transition: 'transform 0.3s ease' }}>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal do projeto selecionado */}
      {selectedProject && (
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
            overflowY: 'auto',
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: '12px',
              overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              backgroundColor: '#fff',
              padding: '2rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fechar modal */}
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'sticky',
                top: '1rem',
                right: '1rem',
                float: 'right',
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
                zIndex: 10,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)')}
            >
              ✕
            </button>

            {/* Markdown content */}
            <div
              style={{
                fontSize: '0.95rem',
                lineHeight: '1.6',
                color: '#333',
                maxWidth: '800px',
              }}
            >
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem', marginTop: '1.5rem', color: '#222' }}>
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', marginTop: '1.25rem', color: '#333' }}>
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => (
                    <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
                      {children}
                    </p>
                  ),
                  img: ({ src, alt }) => {
                    if (typeof src !== 'string') return null;
                    let imageSrc = src;
                    // Convert relative paths to absolute paths
                    if (imageSrc.startsWith('./')) {
                      imageSrc = '/projetos' + imageSrc.substring(1);
                    }
                    return (
                      <img
                        src={imageSrc}
                        alt={alt || 'Project image'}
                        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px', margin: '1.5rem 0', objectFit: 'cover', objectPosition: 'center top' }}
                      />
                    );
                  },
                  hr: () => (
                    <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #ddd' }} />
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#a397eb', textDecoration: 'none', borderBottom: '1px solid #a397eb' }}
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
