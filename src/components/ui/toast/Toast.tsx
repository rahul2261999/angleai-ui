'use client';

import React from 'react';
import { X } from 'lucide-react';
import { ToastProps } from './toast.types';
import {
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from './toast.styles';

const variantColors = {
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
};

export const Toast: React.FC<ToastProps & { id: string; onRemove: (id: string) => void }> = ({
  id,
  title,
  description,
  variant = 'info',
  action,
  onRemove,
  duration,
}) => {
  const handleOpenChange = (open: boolean) => {
    if (!open) onRemove(id);
  };

  return (
    <ToastRoot
      $variant={variant}
      duration={duration}
      onOpenChange={handleOpenChange}
    >
      {title && <ToastTitle>{title}</ToastTitle>}
      {description && <ToastDescription>{description}</ToastDescription>}
      
      {action && (
        <ToastAction asChild altText={action.altText}>
          <button
            onClick={action.onClick}
            style={{
              backgroundColor: variantColors[variant],
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            {action.label}
          </button>
        </ToastAction>
      )}
      
      <ToastClose asChild>
        <div>
          <X size={18} />
        </div>
      </ToastClose>
    </ToastRoot>
  );
}; 