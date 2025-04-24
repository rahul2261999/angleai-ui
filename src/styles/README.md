# Responsive Design System

This document outlines our responsive design system and how to use its components and utilities.

## Breakpoints

Our system uses the following breakpoints:

```typescript
xs: 320px  // Mobile S
sm: 640px  // Mobile L / Tablet
md: 768px  // Tablet / Small Laptop
lg: 1024px // Laptop
xl: 1280px // Desktop
2xl: 1536px // Large Desktop
```

## Container Component

The `Container` component provides a responsive wrapper with proper padding and max-width constraints:

```tsx
// Default container with responsive max-width
<Container>
  {content}
</Container>

// Fluid container that takes full width
<Container fluid>
  {content}
</Container>
```

## Grid System

Our grid system provides a flexible and responsive layout solution:

```tsx
// Basic grid with responsive columns
<Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
  <GridItem>Item 1</GridItem>
  <GridItem>Item 2</GridItem>
  <GridItem>Item 3</GridItem>
</Grid>

// Grid with custom spans
<Grid columns={{ xs: 4, sm: 8, md: 12 }}>
  <GridItem span={{ xs: 4, sm: 4, md: 6 }}>Wide Item</GridItem>
  <GridItem span={{ xs: 2, sm: 2, md: 3 }}>Narrow Item</GridItem>
</Grid>
```

## Typography

Our typography system uses fluid type scaling for smooth responsive text:

```tsx
import { typography } from '@/styles/typography';
import styled from 'styled-components';

const Title = styled.h1`
  ${typography.h1}
`;

const Paragraph = styled.p`
  ${typography.body1}
`;
```

Available typography styles:
- h1, h2, h3, h4 (headings)
- body1, body2 (body text)
- caption (small text)
- button (button text)

## Spacing

The spacing system provides consistent margins and padding:

```tsx
import { margin, padding } from '@/styles/spacing';
import styled from 'styled-components';

// Fixed spacing
const Box = styled.div`
  ${margin.mt('md')}
  ${padding.p('lg')}
`;

// Responsive spacing
const ResponsiveBox = styled.div`
  ${margin.responsive.mt({ xs: 'sm', md: 'lg', xl: '2xl' })}
  ${padding.responsive.p({ xs: 'md', lg: 'xl' })}
`;
```

Available spacing sizes:
- xs: 0.5rem (8px)
- sm: 1rem (16px)
- md: 1.5rem (24px)
- lg: 2rem (32px)
- xl: 3rem (48px)
- 2xl: 4rem (64px)

## Media Queries

For custom responsive styles:

```tsx
import { mediaQueries } from '@/styles/breakpoints';
import styled from 'styled-components';

const ResponsiveElement = styled.div`
  // Base styles
  width: 100%;
  
  ${mediaQueries.sm} {
    // Styles for sm breakpoint and up
    width: 50%;
  }
  
  ${mediaQueries.md} {
    // Styles for md breakpoint and up
    width: 33.33%;
  }
`;
```

## Best Practices

1. Always start with mobile-first design
2. Use the provided components and utilities instead of custom media queries when possible
3. Use fluid typography for smooth text scaling
4. Maintain consistent spacing using the spacing system
5. Test layouts across all breakpoints
6. Use the Container component for consistent page width constraints
7. Leverage the Grid system for complex layouts 