'use client';

import { ReactNode } from 'react';
import { STYLES } from '@/lib/styles/tokens';
import { CloseButton } from './CloseButton';

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
  maxHeight?: string;
  showCloseButton?: boolean;
  closeButtonVariant?: 'dark' | 'light';
  contentStyle?: React.CSSProperties;
}

/**
 * Reusable modal component
 * Eliminates ~150+ lines of duplicated modal code from PoetryGrid and ProjectsGrid
 */
export function GenericModal({
  isOpen,
  onClose,
  children,
  maxWidth = '90vw',
  maxHeight = '90vh',
  showCloseButton = true,
  closeButtonVariant = 'dark',
  contentStyle = {},
}: GenericModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: STYLES.colors.overlay.dark,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: STYLES.zIndex.menuDropdown,
        padding: STYLES.spacing.md,
        backdropFilter: 'blur(4px)',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          maxWidth,
          maxHeight,
          borderRadius: STYLES.borderRadius.medium,
          overflow: 'auto',
          boxShadow: STYLES.shadows.modal,
          backgroundColor: '#fff',
          padding: '2rem',
          ...contentStyle,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <CloseButton onClick={onClose} variant={closeButtonVariant} />
        )}
        {children}
      </div>
    </div>
  );
}
