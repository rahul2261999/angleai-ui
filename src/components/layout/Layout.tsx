'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/breakpoints';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: var(--gray-2);
`;

const MainWrapper = styled.div<{ $isSidebarOpen: boolean }>`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;

  // Mobile: No margin
  margin-left: 0;

  // Desktop: Fixed margin
  @media (min-width: 769px) {
    margin-left: 280px;
  }
`;

const MainContent = styled.main`
  margin-top: 70px;
  padding: ${spacing.md};
  width: 100%;
  min-height: calc(100vh - 70px);
  
  @media (min-width: 640px) {
    padding: ${spacing.lg};
  }
  
  @media (min-width: 1280px) {
    padding: ${spacing.xl};
  }
`;

const PageHeader = styled.div`
  margin-bottom: ${spacing.lg};
`;

const PageTitle = styled.h1`
  ${typography.h1}
  color: var(--text-color-dark-primary);
  margin: 0 0 ${spacing.xs} 0;
`;

const PageDescription = styled.p`
  ${typography.body2}
  color: var(--gray-8);
  margin: 0;
`;

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children,
  title,
  description 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutContainer>
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <MainWrapper $isSidebarOpen={isSidebarOpen}>
        <Navbar onMenuClick={toggleSidebar} />
        <MainContent>
          {(title || description) && (
            <PageHeader>
              {title && <PageTitle>{title}</PageTitle>}
              {description && <PageDescription>{description}</PageDescription>}
            </PageHeader>
          )}
          {children}
        </MainContent>
      </MainWrapper>
    </LayoutContainer>
  );
};

export default Layout; 