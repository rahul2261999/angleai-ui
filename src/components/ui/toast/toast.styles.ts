import styled, { css, keyframes } from 'styled-components';
import { Toast} from 'radix-ui';
import { ToastVariant } from './toast.types';
import { media } from '@/styles/breakpoints';

const VIEWPORT_PADDING = {
  mobile: 16,
  desktop: 25,
};

const TOAST_WIDTH = {
  mobile: '90vw',
  desktop: '420px',
};

const slideIn = keyframes`
  from {
    transform: translateX(calc(100% + ${VIEWPORT_PADDING.desktop}px));
  }
  to {
    transform: translateX(0);
  }
`;

const hide = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const swipeOut = keyframes`
  from {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }
  to {
    transform: translateX(calc(100% + ${VIEWPORT_PADDING.desktop}px));
  }
`;

export const ToastViewport = styled(Toast.Viewport)`
  position: fixed;
  bottom: ${VIEWPORT_PADDING.mobile}px;
  right: ${VIEWPORT_PADDING.mobile}px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: ${TOAST_WIDTH.mobile};
  max-width: 420px;
  min-width: 300px;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;

  ${media.sm} {
    bottom: ${VIEWPORT_PADDING.desktop}px;
    right: ${VIEWPORT_PADDING.desktop}px;
    width: ${TOAST_WIDTH.desktop};
  }
`;

const getVariantStyles = (variant: ToastVariant) => {
  const variants = {
    success: css`
      background: #ffffff;
      border-left: 4px solid #10B981;
      color: #059669;
    `,
    error: css`
      background: #ffffff;
      border-left: 4px solid #EF4444;
      color: #DC2626;
    `,
    warning: css`
      background: #ffffff;
      border-left: 4px solid #F59E0B;
      color: #D97706;
    `,
    info: css`
      background: #ffffff;
      border-left: 4px solid #3B82F6;
      color: #2563EB;
    `,
  };
  return variants[variant];
};

export const ToastRoot = styled(Toast.Root)<{ $variant: ToastVariant }>`
  position: relative;
  border-radius: 8px;
  padding: 15px;
  display: grid;
  grid-template-areas: 
    "title title title close"
    "description description action action"
    "description description action action";
  grid-template-columns: 1fr auto 32px;
  grid-template-rows: auto auto auto;
  gap: 6px;
  box-shadow: 
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  width: 100%;

  ${({ $variant }) => getVariantStyles($variant)}

  ${media.sm} {
    grid-template-areas: 
      "title action close"
      "description action close";
    grid-template-columns: minmax(0, 1fr) auto 32px;
    grid-template-rows: auto 1fr;
    padding: 15px;
    gap: 8px;
    align-items: center;
  }

  &[data-state="open"] {
    animation: ${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[data-state="closed"] {
    animation: ${hide} 100ms ease-in forwards;
  }
  &[data-swipe="move"] {
    transform: translateX(var(--radix-toast-swipe-move-x));
  }
  &[data-swipe="cancel"] {
    transform: translateX(0);
    transition: transform 200ms ease-out;
  }
  &[data-swipe="end"] {
    animation: ${swipeOut} 100ms ease-out forwards;
  }
`;

export const ToastTitle = styled(Toast.Title)`
  grid-area: title;
  margin: 0;
  font-weight: 500;
  font-size: 15px;
  line-height: 1.4;
  color: inherit;
  padding-right: 8px;
`;

export const ToastDescription = styled(Toast.Description)`
  grid-area: description;
  margin: 0;
  font-size: 13px;
  line-height: 1.3;
  color: #666666;
  padding-right: 8px;
  line-break: anywhere;
`;

export const ToastAction = styled(Toast.Action)`
  grid-area: action;
  display: flex;
  align-items: flex-start;
  justify-content: stretch;
  margin-top: 4px;

  ${media.sm} {
    margin: 0;
    align-items: center;
    justify-content: flex-end;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-weight: 500;
    font-size: 13px;
    padding: 0 12px;
    height: 32px;
    background-color: ${props => props.style?.backgroundColor || 'transparent'};
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
    width: 100%;
    max-width: 200px;
    white-space: nowrap;

    ${media.sm} {
      width: auto;
      min-width: 100px;
    }

    &:hover {
      opacity: 0.9;
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;

export const ToastClose = styled(Toast.Close)`
  grid-area: close;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  color: #666666;
  transition: all 0.2s ease;
  cursor: pointer;
  margin-left: auto;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;