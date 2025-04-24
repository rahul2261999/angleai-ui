"use client";

import React, { createContext, useCallback, useState } from "react";
import * as RadixToast from "@radix-ui/react-toast";
import {
  ToastProviderProps,
  ToastProps,
  ToastContextType,
  ToastState,
  ToastVariant,
} from "./toast.types";
import { Toast } from "./Toast";
import { ToastViewport } from "./toast.styles";

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  swipeDirection = "right",
  swipeThreshold = 50,
  duration = 5000,
}) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const addToast = useCallback(
    (props: ToastProps) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { ...props, id }]);

      // Auto remove toast after duration
      if (props.duration !== 0) {
        const toastDuration = props.duration || duration;
        setTimeout(() => {
          removeToast(id);
        }, toastDuration);
      }
    },
    [duration]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const createVariantToast = useCallback(
    (variant: ToastVariant) => (props: Omit<ToastProps, "variant">) => {
      addToast({ ...props, variant });
    },
    [addToast]
  );

  const contextValue: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    success: createVariantToast("success"),
    error: createVariantToast("error"),
    warning: createVariantToast("warning"),
    info: createVariantToast("info"),
  };

  return (
    <ToastContext.Provider value={contextValue}>
      <RadixToast.Provider
        duration={duration}
        swipeDirection={swipeDirection}
        swipeThreshold={swipeThreshold}
      >
        {children}

        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
            action={toast.action}
            duration={toast.duration || duration}
            onRemove={removeToast}
          />
        ))}

        <ToastViewport hotkey={["F8"]} />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
};
