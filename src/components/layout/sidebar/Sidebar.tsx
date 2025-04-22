'use client';

import React from 'react';
import styled from 'styled-components';
import { BarChart2, BookOpen, Bot, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: var(--bg-color-primary);
  border-right: 1px solid var(--gray-4);
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const Logo = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid var(--gray-4);
  background: var(--bg-color-primary);
  
  h1 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-color-dark-secondary);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 12px;

    &:before {
      content: '';
      display: block;
      width: 32px;
      height: 32px;
      background: var(--blue-9);
      border-radius: 8px;
    }
  }
`;

const NavSection = styled.nav`
  padding: 24px 16px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--gray-6);
    border-radius: 3px;
  }
`;

const NavItem = styled(Link)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  color: ${props => props.active ? 'var(--blue-11)' : 'var(--gray-9)'};
  background: ${props => props.active ? 'var(--blue-2)' : 'transparent'};
  margin-bottom: 2px;
  transition: all 0.2s ease;
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 0.875rem;
  
  &:hover {
    background: ${props => props.active ? 'var(--blue-2)' : 'var(--gray-2)'};
    color: ${props => props.active ? 'var(--blue-11)' : 'var(--gray-11)'};
  }
  
  svg {
    width: 20px;
    height: 20px;
    color: ${props => props.active ? 'var(--blue-11)' : 'var(--gray-8)'};
    transition: color 0.2s ease;
  }

  &:hover svg {
    color: ${props => props.active ? 'var(--blue-11)' : 'var(--gray-11)'};
  }
`;

const NavGroup = styled.div`
  margin-bottom: 32px;

  &:not(:first-child) {
    padding-top: 32px;
    border-top: 1px solid var(--gray-4);
  }
`;

const NavGroupTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--gray-8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 16px;
`;

const navItems = [
  { icon: <BarChart2 />, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: <BookOpen />, label: 'KB Manager', href: '/dashboard/kb-manager' },
  { icon: <Bot />, label: 'Agent', href: '/dashboard/agent' },
  { icon: <MessageSquare />, label: 'Virtual Agent', href: '/dashboard/virtual-agent' },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <SidebarContainer>
      <Logo>
        <h1>AngleAI</h1>
      </Logo>
      <NavSection>
        <NavGroup>
          <NavGroupTitle>Main</NavGroupTitle>
          {navItems.map((item) => (
            <NavItem 
              key={item.href}
              href={item.href}
              active={pathname === item.href}
            >
              {item.icon}
              {item.label}
            </NavItem>
          ))}
        </NavGroup>
      </NavSection>
    </SidebarContainer>
  );
};

export default Sidebar; 