import styled from 'styled-components';
import { media } from '@/styles/breakpoints';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const Card = styled.div`
  background: var(--bg-color-primary);
  border: 1px solid var(--gray-4);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  position: relative;
  overflow: visible;
  height: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02),
              0 4px 8px rgba(0, 0, 0, 0.02);

  ${media.md} {
    padding: 24px;
    gap: 20px;
  }

  &:hover {
    border-color: var(--blue-6);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05),
                0 8px 24px rgba(0, 0, 0, 0.05),
                0 16px 32px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: linear-gradient(180deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(var(--blue-6-rgb), 0.04) 50%,
      rgba(var(--blue-6-rgb), 0.08) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
`;

export const IconWrapper = styled.div`
  width: 52px;
  height: 52px;
  position: relative;
  flex-shrink: 0;
  transition: all 0.3s ease;
  border-radius: 10px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-2);

  ${media.md} {
    width: 56px;
    height: 56px;
    padding: 10px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
  align-items: flex-start;
  justify-content: center;
  height: 100%;

  ${media.md} {
    gap: 6px;
  }
`;

export const FileName = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-12);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  line-height: 1.4;

  ${media.md} {
    font-size: 0.9375rem;
  }
`;

export const FileInfo = styled.div`
  font-size: 0.75rem;
  color: var(--gray-8);
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;

  span {
    display: flex;
    align-items: center;
    gap: 4px;
    background: var(--gray-2);
    padding: 4px 6px;
    border-radius: 6px;
    color: var(--gray-11);
    font-weight: 500;
    white-space: nowrap;

    ${media.md} {
      padding: 4px 8px;
    }
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  flex-shrink: 0;
  position: relative;
  z-index: 10;
  height: 100%;
  padding: 4px;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  color: var(--gray-8);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
  z-index: 20;

  ${media.md} {
    padding: 8px;
  }
  
  &:hover {
    background: var(--gray-3);
    color: var(--gray-11);
  }

  svg {
    width: 18px;
    height: 18px;

    ${media.md} {
      width: 20px;
      height: 20px;
    }
  }
`;

export const DropdownContent = styled(DropdownMenu.Content)`
  min-width: 180px;
  background: var(--bg-color-primary);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid var(--gray-4);
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
  will-change: transform, opacity;
  animation: none;

  &[data-state="open"] {
    animation: dropdownSlideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-state="closed"] {
    animation: dropdownSlideOut 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes dropdownSlideIn {
    from {
      opacity: 0;
      transform: translateY(-4px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes dropdownSlideOut {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(-4px) scale(0.95);
    }
  }
`;

export const DropdownItem = styled(DropdownMenu.Item)`
  all: unset;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 8px;
  color: var(--gray-11);
  font-size: 0.875rem;
  transition: all 0.15s ease;
  user-select: none;
  outline: none;
  
  &:hover {
    background: var(--gray-3);
    transform: translateX(2px);
  }
  
  &[data-highlighted] {
    background: var(--gray-3);
  }

  svg {
    width: 16px;
    height: 16px;
    color: var(--gray-9);
    transition: color 0.15s ease;
  }

  &[data-destructive] {
    color: var(--red-11);
    
    svg {
      color: var(--red-11);
    }

    &:hover {
      background: var(--red-3);
    }
  }
`;