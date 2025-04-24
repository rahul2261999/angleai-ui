import { css } from 'styled-components';
import { spacing, mediaQueries } from './breakpoints';

// Margin utilities
export const margin = {
  // Single direction margins
  mt: (size: keyof typeof spacing) => css`
    margin-top: ${spacing[size]};
  `,
  mb: (size: keyof typeof spacing) => css`
    margin-bottom: ${spacing[size]};
  `,
  ml: (size: keyof typeof spacing) => css`
    margin-left: ${spacing[size]};
  `,
  mr: (size: keyof typeof spacing) => css`
    margin-right: ${spacing[size]};
  `,
  
  // Responsive margins
  responsive: {
    mt: (sizes: { xs?: keyof typeof spacing; sm?: keyof typeof spacing; md?: keyof typeof spacing; lg?: keyof typeof spacing; xl?: keyof typeof spacing }) => css`
      margin-top: ${spacing[sizes.xs || 'xs']};
      
      ${sizes.sm && css`
        ${mediaQueries.sm} {
          margin-top: ${spacing[sizes.sm]};
        }
      `}
      
      ${sizes.md && css`
        ${mediaQueries.md} {
          margin-top: ${spacing[sizes.md]};
        }
      `}
      
      ${sizes.lg && css`
        ${mediaQueries.lg} {
          margin-top: ${spacing[sizes.lg]};
        }
      `}
      
      ${sizes.xl && css`
        ${mediaQueries.xl} {
          margin-top: ${spacing[sizes.xl]};
        }
      `}
    `,
    
    mb: (sizes: { xs?: keyof typeof spacing; sm?: keyof typeof spacing; md?: keyof typeof spacing; lg?: keyof typeof spacing; xl?: keyof typeof spacing }) => css`
      margin-bottom: ${spacing[sizes.xs || 'xs']};
      
      ${sizes.sm && css`
        ${mediaQueries.sm} {
          margin-bottom: ${spacing[sizes.sm]};
        }
      `}
      
      ${sizes.md && css`
        ${mediaQueries.md} {
          margin-bottom: ${spacing[sizes.md]};
        }
      `}
      
      ${sizes.lg && css`
        ${mediaQueries.lg} {
          margin-bottom: ${spacing[sizes.lg]};
        }
      `}
      
      ${sizes.xl && css`
        ${mediaQueries.xl} {
          margin-bottom: ${spacing[sizes.xl]};
        }
      `}
    `,
  },
};

// Padding utilities
export const padding = {
  // Single direction padding
  pt: (size: keyof typeof spacing) => css`
    padding-top: ${spacing[size]};
  `,
  pb: (size: keyof typeof spacing) => css`
    padding-bottom: ${spacing[size]};
  `,
  pl: (size: keyof typeof spacing) => css`
    padding-left: ${spacing[size]};
  `,
  pr: (size: keyof typeof spacing) => css`
    padding-right: ${spacing[size]};
  `,
  
  // Responsive padding
  responsive: {
    p: (sizes: { xs?: keyof typeof spacing; sm?: keyof typeof spacing; md?: keyof typeof spacing; lg?: keyof typeof spacing; xl?: keyof typeof spacing }) => css`
      padding: ${spacing[sizes.xs || 'xs']};
      
      ${sizes.sm && css`
        ${mediaQueries.sm} {
          padding: ${spacing[sizes.sm]};
        }
      `}
      
      ${sizes.md && css`
        ${mediaQueries.md} {
          padding: ${spacing[sizes.md]};
        }
      `}
      
      ${sizes.lg && css`
        ${mediaQueries.lg} {
          padding: ${spacing[sizes.lg]};
        }
      `}
      
      ${sizes.xl && css`
        ${mediaQueries.xl} {
          padding: ${spacing[sizes.xl]};
        }
      `}
    `,
  },
}; 