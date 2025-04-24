import { ReactNode } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  title?: string;
  description: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
    altText: string;
  };
  children?: ReactNode;
}

export interface ToastContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  description: string;
  variant: ToastVariant;
  duration: number;
  action?: ToastProps['action'];
}

export interface ToastProviderProps {
  children: ReactNode;
  swipeDirection?: 'up' | 'right' | 'down' | 'left';
  swipeThreshold?: number;
  duration?: number;
}

export interface ToastContextType {
  toasts: ToastState[];
  addToast: (props: ToastProps) => void;
  removeToast: (id: string) => void;
  success: (props: Omit<ToastProps, 'variant'>) => void;
  error: (props: Omit<ToastProps, 'variant'>) => void;
  warning: (props: Omit<ToastProps, 'variant'>) => void;
  info: (props: Omit<ToastProps, 'variant'>) => void;
}

export interface ToastState extends Omit<ToastProps, 'children'> {
  id: string;
} 