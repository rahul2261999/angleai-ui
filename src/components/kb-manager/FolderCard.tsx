'use client';

import React from 'react';
import styled from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MoreVertical, Pencil, Trash2, Info } from 'lucide-react';
import { KBFolder, ViewMode } from '@/types/kb';
import Image from 'next/image';
import { media } from '@/styles/breakpoints';

const Card = styled.div<{ $view: ViewMode }>`
  background: var(--bg-color-primary);
  border: 1px solid var(--gray-4);
  border-radius: 12px;
  padding: ${props => props.$view === 'grid' ? '16px' : '12px 16px'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: ${props => props.$view === 'grid' ? '16px' : '12px'};
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02),
              0 4px 8px rgba(0, 0, 0, 0.02);

  ${media.md} {
    padding: ${props => props.$view === 'grid' ? '20px' : '16px 24px'};
    gap: ${props => props.$view === 'grid' ? '20px' : '16px'};
  }

  &:hover {
    border-color: var(--blue-6);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05),
                0 8px 24px rgba(0, 0, 0, 0.05),
                0 16px 32px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
    
    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: linear-gradient(180deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(var(--blue-6-rgb), 0.04) 50%,
      rgba(var(--blue-6-rgb), 0.08) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
`;

const IconWrapper = styled.div<{ $view: ViewMode }>`
  width: ${props => props.$view === 'grid' ? '44px' : '40px'};
  height: ${props => props.$view === 'grid' ? '44px' : '40px'};
  position: relative;
  flex-shrink: 0;
  transition: all 0.3s ease;
  border-radius: 10px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-color-primary);
  z-index: 1;

  ${media.md} {
    width: ${props => props.$view === 'grid' ? '52px' : '44px'};
    height: ${props => props.$view === 'grid' ? '52px' : '44px'};
    padding: 8px;
  }

  img {
    object-fit: contain;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
    opacity: 0.85;
    transition: opacity 0.2s ease;
    max-width: 100%;
    height: auto;
  }

  ${Card}:hover & img {
    opacity: 1;
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.12));
  }
`;

const CardHeader = styled.div<{ $view: ViewMode }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  background: var(--bg-color-primary);
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  color: var(--gray-8);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 2;

  ${media.md} {
    padding: 8px;
  }
  
  &:hover {
    background: var(--gray-3);
    color: var(--gray-11);
  }

  svg {
    width: 18px;
    height: 18px;

    ${media.md} {
      width: 20px;
      height: 20px;
    }
  }
`;

const ContentWrapper = styled.div<{ $view: ViewMode }>`
  display: flex;
  flex-direction: ${props => props.$view === 'grid' ? 'column' : 'column'};
  gap: ${props => props.$view === 'grid' ? '6px' : '8px'};
  flex: 1;
  min-width: 0;
  align-items: ${props => props.$view === 'list' ? 'flex-start' : 'flex-start'};

  ${media.md} {
    flex-direction: ${props => props.$view === 'grid' ? 'column' : 'row'};
    gap: ${props => props.$view === 'grid' ? '8px' : '24px'};
    align-items: ${props => props.$view === 'list' ? 'center' : 'flex-start'};
  }
`;

const MetaWrapper = styled.div<{ $view: ViewMode }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  flex-wrap: wrap;

  ${media.md} {
    width: auto;
    flex-wrap: nowrap;
  }
`;

const FolderName = styled.h3<{ $view: ViewMode }>`
  font-size: ${props => props.$view === 'grid' ? '0.9375rem' : '0.875rem'};
  font-weight: 600;
  color: var(--gray-12);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;

  ${media.md} {
    font-size: ${props => props.$view === 'grid' ? '1rem' : '0.9375rem'};
    width: auto;
    flex: 1;
    min-width: 200px;
    max-width: 300px;
  }
`;

const FolderInfo = styled.div<{ $view: ViewMode }>`
  font-size: 0.75rem;
  color: var(--gray-8);
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;

  ${media.md} {
    gap: 12px;
    min-width: 140px;
    margin-right: 16px;
  }

  span {
    display: flex;
    align-items: center;
    gap: 4px;
    background: var(--gray-2);
    padding: 4px 6px;
    border-radius: 6px;
    color: var(--gray-11);
    font-weight: 500;
    white-space: nowrap;

    ${media.md} {
      padding: 4px 8px;
    }
  }
`;

const DropdownContent = styled(DropdownMenu.Content)`
  min-width: 180px;
  background: var(--bg-color-primary);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid var(--gray-4);
  animation: slideDown 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-12px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const DropdownItem = styled(DropdownMenu.Item)`
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 8px;
  color: var(--gray-11);
  font-size: 0.875rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--gray-3);
    outline: none;
    transform: translateX(4px);
  }
  
  &[data-highlighted] {
    background: var(--gray-3);
    outline: none;
  }

  svg {
    width: 16px;
    height: 16px;
    color: var(--gray-9);
    transition: color 0.2s ease;
  }

  &[data-destructive] {
    color: var(--red-11);
    
    svg {
      color: var(--red-11);
    }

    &:hover {
      background: var(--red-3);
    }
  }
`;

interface FolderCardProps {
  folder: KBFolder;
  view: ViewMode;
  onEdit?: (folder: KBFolder) => void;
  onDelete?: (folder: KBFolder) => void;
  onInfo?: (folder: KBFolder) => void;
  onClick?: (folder: KBFolder) => void;
}

const FolderCard: React.FC<FolderCardProps> = ({
  folder,
  view,
  onEdit,
  onDelete,
  onInfo,
  onClick,
}) => {
  return (
    <Card $view={view} onClick={() => onClick?.(folder)}>
      <IconWrapper $view={view}>
        <Image
          src="/assets/icons/folder.svg"
          alt={folder.name}
          fill
          style={{ objectFit: 'contain' }}
        />
      </IconWrapper>

      <ContentWrapper $view={view}>
        <FolderName $view={view}>{folder.name}</FolderName>
        <MetaWrapper $view={view}>
          <FolderInfo $view={view}>
            <span>{folder.totalDocs} docs</span>
            <span>•</span>
            <span>{folder.size}</span>
          </FolderInfo>
        </MetaWrapper>
      </ContentWrapper>

      <CardHeader $view={view}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <MenuButton onClick={(e) => e.stopPropagation()}>
              <MoreVertical size={20} />
            </MenuButton>
          </DropdownMenu.Trigger>
          <DropdownContent>
            <DropdownItem onSelect={() => onEdit?.(folder)}>
              <Pencil />
              Edit
            </DropdownItem>
            <DropdownItem onSelect={() => onInfo?.(folder)}>
              <Info />
              Info
            </DropdownItem>
            <DropdownItem 
              onSelect={() => onDelete?.(folder)}
              data-destructive
            >
              <Trash2 />
              Delete
            </DropdownItem>
          </DropdownContent>
        </DropdownMenu.Root>
      </CardHeader>
    </Card>
  );
};

export default FolderCard; 