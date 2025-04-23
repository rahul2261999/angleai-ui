'use client';

import React from 'react';
import styled from 'styled-components';
import { BarChart2, BookOpen, Bot, MessageSquare, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { typography } from '@/styles/typography';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 35;
    opacity: ${props => props.$isOpen ? 1 : 0};
    visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: var(--bg-color-primary);
  border-right: 1px solid var(--gray-4);
  display: flex;
  flex-direction: column;
  z-index: 40;
  box-shadow: 1px 0 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  // Mobile: Hide by default
  @media (max-width: 768px) {
    transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  }

  // Desktop: Always visible
  @media (min-width: 769px) {
    transform: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: var(--gray-9);
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  z-index: 2;
  
  &:hover {
    background: var(--gray-3);
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const Logo = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid var(--gray-4);
  background: var(--bg-color-primary);
  position: relative;
  z-index: 1;
  
  h1 {
    ${typography.h4}
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
  background: var(--bg-color-primary);
  position: relative;
  z-index: 1;

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

const NavItem = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  color: ${props => props.$active ? 'var(--blue-11)' : 'var(--gray-9)'};
  background: ${props => props.$active ? 'var(--blue-2)' : 'transparent'};
  margin-bottom: 2px;
  transition: all 0.2s ease;
  font-weight: ${props => props.$active ? '600' : '500'};
  ${typography.body2}
  
  &:hover {
    background: ${props => props.$active ? 'var(--blue-2)' : 'var(--gray-2)'};
    color: ${props => props.$active ? 'var(--blue-11)' : 'var(--gray-11)'};
  }
  
  svg {
    width: 20px;
    height: 20px;
    color: ${props => props.$active ? 'var(--blue-11)' : 'var(--gray-8)'};
    transition: color 0.2s ease;
  }

  &:hover svg {
    color: ${props => props.$active ? 'var(--blue-11)' : 'var(--gray-11)'};
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
  ${typography.caption}
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

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const pathname = usePathname();

  return (
    <>
      <SidebarOverlay $isOpen={isOpen} onClick={onToggle} />
      <SidebarContainer $isOpen={isOpen}>
        <CloseButton onClick={onToggle}>
          <X size={24} />
        </CloseButton>
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
              $active={pathname.startsWith(item.href)}
            >
              {item.icon}
              {item.label}
            </NavItem>
          ))}
        </NavGroup>
      </NavSection>
    </SidebarContainer>
    </>
  );
};

export default Sidebar; 