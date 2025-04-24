import { ReactNode } from 'react';
import { containerMaxWidths } from '@/styles/breakpoints';
import styled from 'styled-components';

interface ContainerProps {
  children: ReactNode;
  fluid?: boolean;
  className?: string;
}

const StyledContainer = styled.div<{ fluid?: boolean }>`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;

  ${({ fluid }) =>
    !fluid &&
    `
    @media (min-width: 640px) {
      max-width: ${containerMaxWidths.sm};
    }
    @media (min-width: 768px) {
      max-width: ${containerMaxWidths.md};
    }
    @media (min-width: 1024px) {
      max-width: ${containerMaxWidths.lg};
    }
    @media (min-width: 1280px) {
      max-width: ${containerMaxWidths.xl};
    }
    @media (min-width: 1536px) {
      max-width: ${containerMaxWidths['2xl']};
    }
  `}
`;

export const Container = ({ children, fluid = false, className }: ContainerProps) => {
  return (
    <StyledContainer fluid={fluid} className={className}>
      {children}
    </StyledContainer>
  );
}; 