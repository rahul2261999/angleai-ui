import { css } from 'styled-components';
import { fluidType, mediaQueries } from './breakpoints';

export const typography = {
  h1: css`
    ${fluidType(32, 48)}
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  `,
  
  h2: css`
    ${fluidType(28, 40)}
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 0.875rem;
  `,
  
  h3: css`
    ${fluidType(24, 32)}
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 0.75rem;
  `,
  
  h4: css`
    ${fluidType(20, 24)}
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 0.5rem;
  `,
  
  body1: css`
    ${fluidType(16, 18)}
    line-height: 1.5;
    margin-bottom: 1rem;
  `,
  
  body2: css`
    ${fluidType(14, 16)}
    line-height: 1.6;
    margin-bottom: 0.75rem;
  `,
  
  caption: css`
    ${fluidType(12, 14)}
    line-height: 1.5;
    margin-bottom: 0.5rem;
  `,
  
  button: css`
    ${fluidType(14, 16)}
    font-weight: 500;
    line-height: 1.4;
  `,
};

// Responsive text alignment helper
export const textAlign = {
  left: css`text-align: left;`,
  center: css`text-align: center;`,
  right: css`text-align: right;`,
  
  responsive: {
    left: css`
      text-align: left;
      ${mediaQueries.md} {
        text-align: center;
      }
    `,
    center: css`
      text-align: center;
      ${mediaQueries.md} {
        text-align: left;
      }
    `,
  },
}; 