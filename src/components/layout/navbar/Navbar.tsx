'use client';

import React from 'react';
import styled from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Bell, User, Settings, LogOut, Search, Menu, Mail, Circle } from 'lucide-react';
import { typography } from '@/styles/typography';
import { breakpoints } from '@/styles/breakpoints';

interface NavbarProps {
  onMenuClick: () => void;
}

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: var(--gray-9);
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--gray-2);
    color: var(--gray-11);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0px);
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
  z-index: 40;
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
  height: 40px;

  @media (min-width: 640px) {
    display: block;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
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
  height: 40px;

  @media (min-width: 640px) {
    gap: 12px;
  }
`;

const ProfileButton = styled(IconButton)`
  width: auto;
  min-width: 40px;
  max-width: 200px;
  padding: 0 12px;
  gap: 10px;
  background: var(--gray-2);
  height: 40px;
  display: inline-flex;
  align-items: center;
  position: relative;
  
  &:hover {
    background: var(--gray-3);
  }

  span {
    ${typography.body2}
    font-weight: 500;
    color: var(--gray-11);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
    margin: 0;
    padding: 0;
    line-height: 1;
    height: 20px;
    display: flex;
    align-items: center;

    @media (min-width: 640px) {
      display: flex;
    }
  }
  
  &:after {
    content: '';
    display: block;
    min-width: 28px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--blue-5);
    flex-shrink: 0;
  }
`;

const NotificationBell = styled(Bell)`
  width: 20px;
  height: 20px;
  stroke-width: 1.8px;
`;

const NotificationIconBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 18px;
  height: 18px;
  background: var(--color-danger);
  color: white;
  border-radius: 50%;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--bg-color-primary);
  font-weight: 500;
`;

const StatusBadge = styled.span<{ $unread: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => props.$unread ? 'var(--blue-2)' : 'var(--gray-2)'};
  color: ${props => props.$unread ? 'var(--blue-9)' : 'var(--gray-9)'};
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$unread ? 'var(--blue-3)' : 'var(--gray-3)'};
  }
`;

const BaseDropdownContent = styled(DropdownMenu.Content)`
  background: var(--bg-color-primary);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 10px 40px -8px rgba(0, 0, 0, 0.12);
  border: 1px solid var(--gray-3);
  animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 50;
  overflow: hidden;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const NotificationDropdownContent = styled(BaseDropdownContent)`
  min-width: 220px;
  max-width: calc(100vw - 32px);
  width: 100%;

  @media (min-width: ${breakpoints.sm}px) {
    width: 380px;
  }

  @media (min-width: ${breakpoints.md}px) {
    width: 420px;
  }
`;

const ProfileDropdownContent = styled(BaseDropdownContent)`
  width: 220px;
`;

const DropdownItem = styled(DropdownMenu.Item)`
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  border-radius: 8px;
  color: var(--gray-11);
  ${typography.body2}
  font-weight: 500;
  width: 100%;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--gray-3);
    color: var(--gray-12);
    outline: none;
  }
  
  &[data-highlighted] {
    background: var(--gray-3);
    color: var(--gray-12);
    outline: none;
  }

  svg {
    width: 18px;
    height: 18px;
    color: var(--gray-9);
    transition: color 0.2s ease;
  }

  &:hover svg {
    color: var(--gray-11);
  }

  &.text-red-600 {
    color: var(--red-11);
    
    svg {
      color: var(--red-11);
    }

    &:hover {
      background: var(--red-3);
    }
  }
`;

const Separator = styled(DropdownMenu.Separator)`
  height: 1px;
  background: var(--border-color-subtle-primary);
  margin: 6px;
`;

const NotificationHeader = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--gray-3);
  background: var(--gray-1);
  margin-bottom: 4px;

  h3 {
    ${typography.body2}
    font-weight: 600;
    color: var(--gray-12);
    margin: 0;
    font-size: 1rem;
  }
`;

const MarkAllRead = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-9);
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    color: var(--blue-9);
    background: var(--blue-2);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const NotificationsList = styled.div`
  max-height: 60vh;
  @media (min-width: ${breakpoints.sm}px) {
    max-height: 480px;
  }
  overflow-y: auto;
  padding: 8px 0;
  background: var(--bg-color-primary);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--gray-5);
    border-radius: 10px;
  }
`;

const NotificationWrapper = styled.div`
  position: relative;
  padding: 8px 8px;

  &:not(:last-child) {
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: var(--gray-3);
    }
  }
`;

const NotificationItem = styled.div<{ $unread: boolean }>`
  padding: 12px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$unread ? 'var(--gray-1)' : 'transparent'};
  position: relative;
  border-radius: 8px;
  
  &:hover {
    background: var(--gray-3);
  }

  .content {
    flex: 1;
    padding: 4px;
  }

  p {
    margin: 0;
    color: var(--gray-12);
    font-size: 0.875rem;
    line-height: 1.5;
  }

  small {
    display: block;
    color: var(--gray-8);
    font-size: 0.75rem;
    margin-top: 6px;
  }
`;

const ViewAllButton = styled.button`
  width: 100%;
  padding: 16px;
  background: var(--blue-9);
  color: white;
  border: none;
  border-top: 1px solid var(--gray-3);
  cursor: pointer;
  ${typography.body2}
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  &:hover {
    background: var(--blue-10);
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
    message: 'New comment on your post "Getting Started with React"',
    time: '5m ago',
    unread: true,
  },
  {
    id: '2',
    message: 'You have a new follower: Jane Smith',
    time: '1h ago',
    unread: true,
  },
  {
    id: '3',
    message: 'Your post was featured in Weekly Digest',
    time: '2h ago',
    unread: false,
  },
  {
    id: '4',
    message: 'Reminder: Team meeting in 30 minutes',
    time: '3h ago',
    unread: false,
  },
  {
    id: '5',
    message: 'Your account was successfully verified',
    time: '4h ago',
    unread: false,
  }
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
              <NotificationBell />
              <NotificationIconBadge>
                {notifications.filter(n => n.unread).length}
              </NotificationIconBadge>
            </IconButton>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <NotificationDropdownContent align="end" sideOffset={8}>
              <NotificationHeader>
                <h3>Notifications</h3>
                <MarkAllRead title="Mark all as read">
                  <Mail size={16} />
                </MarkAllRead>
              </NotificationHeader>
              
              <NotificationsList>
                {notifications.map((notification) => (
                  <NotificationWrapper key={notification.id}>
                    <NotificationItem $unread={notification.unread}>
                      <div className="content">
                        <p>{notification.message}</p>
                        <small>{notification.time}</small>
                      </div>
                      <StatusBadge $unread={notification.unread}>
                        <Circle size={6} />
                        {notification.unread ? 'New' : 'Read'}
                      </StatusBadge>
                    </NotificationItem>
                  </NotificationWrapper>
                ))}
              </NotificationsList>

              <ViewAllButton>
                View All Notifications
              </ViewAllButton>
            </NotificationDropdownContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <ProfileButton>
              <span data-tooltip="John Doe">John Doe</span>
            </ProfileButton>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <ProfileDropdownContent align="end" sideOffset={8}>
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
            </ProfileDropdownContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </NavActions>
    </NavbarContainer>
  );
};

export default Navbar;
