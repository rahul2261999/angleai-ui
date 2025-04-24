import styled from 'styled-components';

import { media } from '@/styles/breakpoints';
import Link from 'next/link';
import { ViewMode } from '@/types/kb-manager';

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 32px;
  width: 100%;
  flex-wrap: wrap;

  ${media.md} {
    flex-wrap: nowrap;
    gap: 24px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 280px;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--gray-12);
    margin: 0;
    letter-spacing: -0.02em;

    ${media.md} {
      font-size: 1.75rem;
    }
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;

  ${media.md} {
    gap: 16px;
    flex-wrap: nowrap;
    flex-shrink: 0;
  }
`;

export const Description = styled.p`
  color: var(--gray-11);
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;

  ${media.md} {
    font-size: 0.9375rem;
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  align-items: center;
  background: var(--gray-3);
  border-radius: 8px;
  padding: 4px;
  margin-right: auto;

  ${media.md} {
    margin-right: 0;
    order: 2;
  }
`;

export const ToggleButton = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? 'var(--bg-color-primary)' : 'transparent'};
  border: none;
  padding: 8px;
  cursor: pointer;
  color: ${props => props.$active ? 'var(--gray-12)' : 'var(--gray-8)'};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  min-width: 36px;

  &:hover {
    color: var(--gray-12);
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

export const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--gray-11);
  text-decoration: none;
  font-size: 0.875rem;
  padding: 8px 0;
  transition: color 0.2s ease;

  &:hover {
    color: var(--gray-12);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const CreateButton = styled.button`
  background: var(--blue-9);
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: var(--blue-10);
  }

  svg {
    width: 16px;
    height: 16px;

    ${media.md} {
      width: 18px;
      height: 18px;
    }
  }
`;

export const Content = styled.div<{ $view: ViewMode }>`
  margin-top: 24px;
  width: 100%;

  ${props => props.$view === 'grid' && `
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

    ${media.sm} {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }

    ${media.md} {
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 24px;
    }

    ${media.lg} {
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    }

    ${media.xl} {
      grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
      gap: 28px;
    }
  `}

  ${props => props.$view === 'list' && `
    display: flex;
    flex-direction: column;
    gap: 12px;
  `}
`;