// Breakpoint sizes in pixels
export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Media query helpers
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
};

// Container max widths
export const containerMaxWidths = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Responsive spacing scale (in rem)
export const spacing = {
  xs: '0.5rem',  // 8px
  sm: '1rem',    // 16px
  md: '1.5rem',  // 24px
  lg: '2rem',    // 32px
  xl: '3rem',    // 48px
  '2xl': '4rem', // 64px
};

// Helper function to convert px to rem
export const pxToRem = (px: number): string => `${px / 16}rem`;

// Fluid typography helper
export const fluidType = (minFont: number, maxFont: number, minScreen = breakpoints.sm, maxScreen = breakpoints.xl) => `
  font-size: ${pxToRem(minFont)};
  
  @media screen and (min-width: ${minScreen}px) {
    font-size: calc(${pxToRem(minFont)} + ${maxFont - minFont} * (100vw - ${minScreen}px) / ${maxScreen - minScreen});
  }
  
  @media screen and (min-width: ${maxScreen}px) {
    font-size: ${pxToRem(maxFont)};
  }
`;

// Media query helper functions
export const media = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  xxl: `@media (min-width: ${breakpoints['2xl']})`,
  
  // Custom breakpoint helper
  custom: (minWidth: number) => `@media (min-width: ${minWidth}px)`,
  
  // Max-width queries
  down: {
    xs: `@media (max-width: ${breakpoints.xs})`,
    sm: `@media (max-width: ${breakpoints.sm})`,
    md: `@media (max-width: ${breakpoints.md})`,
    lg: `@media (max-width: ${breakpoints.lg})`,
    xl: `@media (max-width: ${breakpoints.xl})`,
    xxl: `@media (max-width: ${breakpoints['2xl']})`
  },
  
  // Range queries
  between: (min: keyof typeof breakpoints, max: keyof typeof breakpoints) =>
    `@media (min-width: ${breakpoints[min]}) and (max-width: ${breakpoints[max]})`
} as const; 