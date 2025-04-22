# ANGLE AI UI

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), following a modular and scalable architecture.

## Project Architecture

```
src/
├── app/                    # Next.js 13+ app directory
│   ├── (auth)/            # Authentication group
│   ├── (dashboard)/       # Dashboard group
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── layout/           # Layout components (navbar, sidebar)
│   └── ui/               # Basic UI components
│       ├── button/       # Button components
│       ├── dialog/       # Dialog components
│       └── icons/        # Icon components
├── features/             # Feature-based modules
│   ├── auth/            # Authentication feature
│   │   ├── api/         # Auth API integration
│   │   ├── components/  # Auth-specific components
│   │   └── hooks/       # Auth-specific hooks
│   └── dashboard/       # Dashboard feature
├── hooks/                # Shared React hooks
├── lib/                  # Third-party configurations
├── styles/              # Global styles and CSS modules
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## Architecture Guidelines

### Component Organization
- **UI Components**: Reusable, atomic components in `components/ui/`
- **Layout Components**: Page layout components in `components/layout/`
- **Feature Components**: Feature-specific components within respective feature directories

### Best Practices
1. **Type Safety**
   - Use TypeScript for all files
   - Define shared types in `types` directory
   - Use proper type definitions for props and state

2. **Styling**
   - Use CSS Modules for component-specific styles
   - Global styles in `styles` directory
   - Follow consistent styling patterns

3. **Code Organization**
   - Keep components small and focused
   - Use meaningful naming conventions
   - Implement proper error handling
   - Write unit tests for components
   - Document complex logic

4. **Performance**
   - Implement proper loading states
   - Use code splitting where appropriate
   - Follow React and Next.js best practices

## Getting Started

First, install the dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

- You can start editing the page by modifying `app/page.tsx`
- The page auto-updates as you edit the file
- This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with [Geist](https://vercel.com/font)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
