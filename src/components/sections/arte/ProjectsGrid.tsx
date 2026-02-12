'use client';

import Image from 'next/image';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { GenericModal } from '@/components/common/ui';
import { PROJECTS_DATA, Project } from '@/lib/data';
import { STYLES } from '@/lib/styles/tokens';
import { useHoverEffect } from '@/hooks/useHoverEffect';

/**
 * Projects grid gallery with modal viewer
 * Refactored to use: GenericModal, external data, useHoverEffect hook
 */
export function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>('');

  const { handlers: cardHandlers, getStyle: getCardStyle } = useHoverEffect({
    scaleEntrance: 1.02,
    translateYEntrance: -8,
    shadowActive: STYLES.shadows.medium,
  });

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
          gap: STYLES.spacing['2xl'],
          padding: `${STYLES.spacing.xl} ${STYLES.spacing.lg}`,
          margin: '0 auto',
          maxWidth: '1200px',
        }}
      >
        {PROJECTS_DATA.map((project) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project)}
            style={{
              cursor: 'pointer',
              borderRadius: STYLES.borderRadius.large,
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              boxShadow: STYLES.shadows.light,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              ...getCardStyle(),
            }}
            {...cardHandlers}
          >
            {/* Image Container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '240px',
                backgroundColor: STYLES.colors.backgrounds.lighter,
                overflow: 'hidden',
              }}
            >
              <Image
                src={`/optimized/projetos/${project.id}/${project.image}-thumb.jpg`}
                alt={project.title}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center center',
                }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
              {/* Gradient overlay */}
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
            <div
              style={{
                padding: STYLES.spacing.lg,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h3
                style={{
                  margin: `0 0 ${STYLES.spacing.sm} 0`,
                  ...STYLES.typography.heading.h3,
                  color: STYLES.colors.text.primary,
                }}
              >
                {project.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  ...STYLES.typography.body.default,
                  color: STYLES.colors.text.secondary,
                  flex: 1,
                }}
              >
                {project.description}
              </p>

              {/* Read more indicator */}
              <div
                style={{
                  marginTop: STYLES.spacing.md,
                  fontSize: STYLES.typography.body.small.fontSize,
                  color: STYLES.colors.primary,
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: STYLES.spacing.xs,
                }}
              >
                Ler
                <span style={{ transition: STYLES.transitions.default }}>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reusable modal with markdown content */}
      <GenericModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        maxHeight="90vh"
        contentStyle={{ overflowY: 'auto', maxWidth: '90vw' }}
      >
        {selectedProject && (
          <div
            style={{
              fontSize: STYLES.typography.body.default.fontSize,
              lineHeight: STYLES.typography.body.default.lineHeight,
              color: STYLES.colors.text.primary,
              maxWidth: '800px',
            }}
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1
                    style={{
                      ...STYLES.typography.heading.h1,
                      marginBottom: STYLES.spacing.md,
                      marginTop: STYLES.spacing.lg,
                      color: STYLES.colors.text.primary,
                    }}
                  >
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2
                    style={{
                      ...STYLES.typography.heading.h2,
                      marginBottom: STYLES.spacing.sm,
                      marginTop: `calc(${STYLES.spacing.lg} * 1.25)`,
                      color: STYLES.colors.text.primary,
                    }}
                  >
                    {children}
                  </h2>
                ),
                p: ({ children }) => (
                  <p
                    style={{
                      marginBottom: STYLES.spacing.md,
                      lineHeight: '1.7',
                    }}
                  >
                    {children}
                  </p>
                ),
                img: ({ src, alt }) => {
                  if (typeof src !== 'string') return null;
                  let imageSrc = src;
                  if (imageSrc.startsWith('./')) {
                    imageSrc = '/projetos' + imageSrc.substring(1);
                  }
                  return (
                    <img
                      src={imageSrc}
                      alt={alt || 'Project image'}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: STYLES.borderRadius.small,
                        margin: `${STYLES.spacing.lg} 0`,
                        objectFit: 'cover',
                        objectPosition: 'center top',
                      }}
                    />
                  );
                },
                hr: () => (
                  <hr
                    style={{
                      margin: `${STYLES.spacing.xl} 0`,
                      border: 'none',
                      borderTop: `1px solid #ddd`,
                    }}
                  />
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: STYLES.colors.primary,
                      textDecoration: 'none',
                      borderBottom: `1px solid ${STYLES.colors.primary}`,
                    }}
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        )}
      </GenericModal>
    </>
  );
}
