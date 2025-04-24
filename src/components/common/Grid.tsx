import { ReactNode } from 'react';
import styled from 'styled-components';
import { mediaQueries } from '@/styles/breakpoints';

interface GridProps {
  children: ReactNode;
  gap?: string;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  className?: string;
}

interface GridItemProps {
  children: ReactNode;
  span?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  className?: string;
}

const StyledGrid = styled.div<{ gap?: string; columns?: GridProps['columns'] }>`
  display: grid;
  gap: ${({ gap }) => gap || '1rem'};
  
  /* Default for smallest screens */
  grid-template-columns: repeat(${({ columns }) => columns?.xs || 1}, 1fr);

  /* Responsive columns */
  ${({ columns }) =>
    columns?.sm &&
    mediaQueries.sm + ` {
      grid-template-columns: repeat(${columns.sm}, 1fr);
    }`}
  
  ${({ columns }) =>
    columns?.md &&
    mediaQueries.md + ` {
      grid-template-columns: repeat(${columns.md}, 1fr);
    }`}
  
  ${({ columns }) =>
    columns?.lg &&
    mediaQueries.lg + ` {
      grid-template-columns: repeat(${columns.lg}, 1fr);
    }`}
  
  ${({ columns }) =>
    columns?.xl &&
    mediaQueries.xl + ` {
      grid-template-columns: repeat(${columns.xl}, 1fr);
    }`}
`;

const StyledGridItem = styled.div<{ span?: GridItemProps['span'] }>`
  /* Default span for smallest screens */
  grid-column: span ${({ span }) => span?.xs || 1};

  /* Responsive spans */
  ${({ span }) =>
    span?.sm &&
    mediaQueries.sm + ` {
      grid-column: span ${span.sm};
    }`}
  
  ${({ span }) =>
    span?.md &&
    mediaQueries.md + ` {
      grid-column: span ${span.md};
    }`}
  
  ${({ span }) =>
    span?.lg &&
    mediaQueries.lg + ` {
      grid-column: span ${span.lg};
    }`}
  
  ${({ span }) =>
    span?.xl &&
    mediaQueries.xl + ` {
      grid-column: span ${span.xl};
    }`}
`;

export const Grid = ({ children, gap, columns, className }: GridProps) => {
  return (
    <StyledGrid gap={gap} columns={columns} className={className}>
      {children}
    </StyledGrid>
  );
};

export const GridItem = ({ children, span, className }: GridItemProps) => {
  return (
    <StyledGridItem span={span} className={className}>
      {children}
    </StyledGridItem>
  );
}; 