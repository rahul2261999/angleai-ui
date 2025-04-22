'use client';

import React from 'react';
import styled from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Bell, User, Settings, LogOut, Search, Menu } from 'lucide-react';
import { typography } from '@/styles/typography';

interface NavbarProps {
  onMenuClick: () => void;
}

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--gray-9);
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--gray-2);
    color: var(--gray-11);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 70px;
  background: var(--bg-color-primary);
  border-bottom: 1px solid var(--gray-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 30;
  box-shadow: 0 2px 6px rgba(37, 39, 60, 0.04);

  @media (min-width: 769px) {
    left: 280px;
    padding: 0 32px;
  }
`;

const MenuButton = styled(IconButton)`
  @media (min-width: 769px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 380px;
  margin: 0 16px;
  display: none;

  @media (min-width: 640px) {
    display: block;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 16px 0 42px;
  border: 1px solid var(--gray-4);
  border-radius: 8px;
  background: var(--gray-2);
  color: var(--gray-11);
  ${typography.body2}
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    background: var(--bg-color-primary);
    border-color: var(--blue-6);
    box-shadow: 0 0 0 3px var(--blue-3);
  }

  &::placeholder {
    color: var(--gray-7);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--gray-7);
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (min-width: 640px) {
    gap: 12px;
  }
`;

const ProfileButton = styled(IconButton)`
  width: auto;
  padding: 0 8px 0 12px;
  gap: 12px;
  background: var(--gray-2);
  
  &:hover {
    background: var(--gray-3);
  }

  span {
    ${typography.body2}
    font-weight: 500;
    color: var(--gray-11);
    display: none;

    @media (min-width: 640px) {
      display: block;
    }
  }
  
  &:after {
    content: '';
    display: block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--blue-5);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  background: var(--color-danger);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  ${typography.caption}
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--bg-color-primary);
`;

const DropdownContent = styled(DropdownMenu.Content)`
  min-width: 220px;
  background: var(--bg-color-primary);
  border-radius: 8px;
  padding: 6px;
  box-shadow: var(--shadow-lg-primary);
  border: 1px solid var(--border-color-subtle-primary);
  animation: slideDown 0.1s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DropdownItem = styled(DropdownMenu.Item)`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border-radius: 4px;
  color: var(--gray-11);
  ${typography.body2}
  
  &:hover {
    background: var(--gray-3);
    outline: none;
  }
  
  &[data-highlighted] {
    background: var(--gray-3);
    outline: none;
  }

  svg {
    width: 16px;
    height: 16px;
    color: var(--gray-9);
  }
`;

const Separator = styled(DropdownMenu.Separator)`
  height: 1px;
  background: var(--border-color-subtle-primary);
  margin: 6px;
`;

const NotificationItem = styled.div`
  padding: 12px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border-bottom: 1px solid var(--border-color-subtle-primary);
  
  &:last-child {
    border-bottom: none;
  }
`;

interface Notification {
  id: string;
  message: string;
  time: string;
  unread: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    message: 'New comment on your post',
    time: '5m ago',
    unread: true,
  },
  {
    id: '2',
    message: 'You have a new follower',
    time: '1h ago',
    unread: true,
  },
];

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <NavbarContainer>
      <MenuButton onClick={onMenuClick}>
        <Menu />
      </MenuButton>
      
      <SearchContainer>
        <SearchIcon />
        <SearchInput placeholder="Search..." />
      </SearchContainer>

      <NavActions>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <IconButton>
              <Bell />
              <NotificationBadge>2</NotificationBadge>
            </IconButton>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownContent align="end">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id}>
                  <div>
                    <p>{notification.message}</p>
                    <small>{notification.time}</small>
                  </div>
                </NotificationItem>
              ))}
            </DropdownContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <ProfileButton>
              <span>John Doe</span>
            </ProfileButton>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownContent align="end">
              <DropdownItem>
                <User />
                Profile
              </DropdownItem>
              <DropdownItem>
                <Settings />
                Settings
              </DropdownItem>
              <Separator />
              <DropdownItem className="text-red-600">
                <LogOut />
                Logout
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </NavActions>
    </NavbarContainer>
  );
};

export default Navbar;
