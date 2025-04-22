'use client';

import React from 'react';
import styled from 'styled-components';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: var(--gray-2);
`;

const MainWrapper = styled.div`
  flex: 1;
  min-width: 0;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  margin-top: 70px;
  padding: 24px;
  width: 100%;
  min-height: calc(100vh - 70px);
  
  @media (min-width: 1280px) {
    padding: 24px 32px;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color-dark-primary);
  margin: 0 0 8px 0;
`;

const PageDescription = styled.p`
  color: var(--gray-8);
  font-size: 0.875rem;
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
  return (
    <LayoutContainer>
      <Sidebar />
      <MainWrapper>
        <Navbar />
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