'use client';

import React from 'react';
import styled from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Bell, User, Settings, LogOut, Search, Menu } from 'lucide-react';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 280px;
  height: 70px;
  background: var(--bg-color-primary);
  border-bottom: 1px solid var(--gray-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  z-index: 50;
  box-shadow: 0 2px 6px rgba(37, 39, 60, 0.04);
`;

const SearchContainer = styled.div`
  position: relative;
  width: 380px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 16px 0 42px;
  border: 1px solid var(--gray-4);
  border-radius: 8px;
  background: var(--gray-2);
  color: var(--gray-11);
  font-size: 0.875rem;
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
  gap: 12px;
`;

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

const ProfileButton = styled(IconButton)`
  width: auto;
  padding: 0 8px 0 12px;
  gap: 12px;
  background: var(--gray-2);
  
  &:hover {
    background: var(--gray-3);
  }

  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--gray-11);
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
  font-size: 11px;
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
  font-size: 0.875rem;
  
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

const UnreadDot = styled.div<{ $unread: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$unread ? 'var(--blue-9)' : 'transparent'};
  margin-top: 6px;
`;

const NotificationContent = styled.div`
  flex: 1;
  font-size: 0.875rem;
  color: var(--gray-11);
`;

const NotificationTime = styled.div`
  font-size: 0.75rem;
  color: var(--gray-8);
  margin-top: 4px;
`;

interface Notification {
  id: string;
  message: string;
  time: string;
  unread: boolean;
}

const Navbar: React.FC = () => {
  const [notifications] = React.useState<Notification[]>([
    { id: '1', message: 'New message from John Doe', time: '5 min ago', unread: true },
    { id: '2', message: 'Your report is ready', time: '2 hours ago', unread: true },
    { id: '3', message: 'Meeting reminder', time: 'Yesterday', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <NavbarContainer>
      <SearchContainer>
        <SearchIcon />
        <SearchInput placeholder="Search in app..." />
      </SearchContainer>

      <NavActions>
        <IconButton>
          <Menu />
        </IconButton>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <IconButton>
              <Bell />
              {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownContent>
            {notifications.map(notification => (
              <NotificationItem key={notification.id}>
                <UnreadDot $unread={notification.unread} />
                <NotificationContent>
                  {notification.message}
                  <NotificationTime>{notification.time}</NotificationTime>
                </NotificationContent>
              </NotificationItem>
            ))}
          </DropdownContent>
        </DropdownMenu.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <ProfileButton>
              <span>Admin</span>
            </ProfileButton>
          </DropdownMenu.Trigger>
          <DropdownContent>
            <DropdownItem>
              <User />
              Profile
            </DropdownItem>
            <DropdownItem>
              <Settings />
              Account Settings
            </DropdownItem>
            <Separator />
            <DropdownItem>
              <LogOut />
              Sign Out
            </DropdownItem>
          </DropdownContent>
        </DropdownMenu.Root>
      </NavActions>
    </NavbarContainer>
  );
};

export default Navbar;
