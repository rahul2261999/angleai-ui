'use client';

import React from 'react';
import styled from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MoreVertical, Pencil, Trash2, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FileType } from '@/types/file';
import { media } from '@/styles/breakpoints';
import FileIcon from '@/components/ui/icons/FileIcons';

const Card = styled.div`
  background: var(--bg-color-primary);
  border: 1px solid var(--gray-4);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  position: relative;
  overflow: visible;
  height: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02),
              0 4px 8px rgba(0, 0, 0, 0.02);

  ${media.md} {
    padding: 24px;
    gap: 20px;
  }

  &:hover {
    border-color: var(--blue-6);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05),
                0 8px 24px rgba(0, 0, 0, 0.05),
                0 16px 32px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
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

const IconWrapper = styled.div`
  width: 52px;
  height: 52px;
  position: relative;
  flex-shrink: 0;
  transition: all 0.3s ease;
  border-radius: 10px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-2);

  ${media.md} {
    width: 56px;
    height: 56px;
    padding: 10px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
  align-items: flex-start;
  justify-content: center;
  height: 100%;

  ${media.md} {
    gap: 6px;
  }
`;

const FileName = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-12);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  line-height: 1.4;

  ${media.md} {
    font-size: 0.9375rem;
  }
`;

const FileInfo = styled.div`
  font-size: 0.75rem;
  color: var(--gray-8);
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;

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

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  flex-shrink: 0;
  position: relative;
  z-index: 10;
  height: 100%;
  padding: 4px;
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
  position: relative;
  z-index: 20;

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

const DropdownContent = styled(DropdownMenu.Content)`
  min-width: 180px;
  background: var(--bg-color-primary);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid var(--gray-4);
  z-index: 9999;
  position: absolute;
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
  will-change: transform, opacity;
  animation: none;

  &[data-state="open"] {
    animation: dropdownSlideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-state="closed"] {
    animation: dropdownSlideOut 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes dropdownSlideIn {
    from {
      opacity: 0;
      transform: translateY(-4px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes dropdownSlideOut {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(-4px) scale(0.95);
    }
  }
`;

const DropdownItem = styled(DropdownMenu.Item)`
  all: unset;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 8px;
  color: var(--gray-11);
  font-size: 0.875rem;
  transition: all 0.15s ease;
  user-select: none;
  outline: none;
  
  &:hover {
    background: var(--gray-3);
    transform: translateX(2px);
  }
  
  &[data-highlighted] {
    background: var(--gray-3);
  }

  svg {
    width: 16px;
    height: 16px;
    color: var(--gray-9);
    transition: color 0.15s ease;
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

interface FileCardProps {
  file: FileType;
  onDelete?: () => void;
  onRename?: () => void;
  onInfo?: () => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, onDelete, onRename, onInfo }) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (file?.id) {
      router.push(`/dashboard/file/${file.id}`);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <Card onClick={handleCardClick}>
      <IconWrapper>
        <FileIcon type={file.type || ''} size={32} />
      </IconWrapper>

      <ContentWrapper>
        <FileName>{file.name}</FileName>
        <FileInfo>
          <span>{file.size ? formatFileSize(file.size) : 'Unknown'}</span>
          <span>•</span>
          <span>{new Date(file.updatedAt).toLocaleDateString()}</span>
        </FileInfo>
      </ContentWrapper>

      <CardHeader>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <MenuButton onClick={(e) => e.stopPropagation()}>
              <MoreVertical size={20} />
            </MenuButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownContent
              onCloseAutoFocus={(e) => e.preventDefault()}
              onClick={(e) => e.stopPropagation()}
              sideOffset={5}
              align="center"
              alignOffset={0}
              side="bottom"
              avoidCollisions={true}
            >
              <DropdownItem onSelect={() => onRename?.()}>
                <Pencil />
                Rename
              </DropdownItem>
              <DropdownItem onSelect={() => onInfo?.()}>
                <Info />
                Info
              </DropdownItem>
              <DropdownItem 
                onSelect={() => onDelete?.()}
                data-destructive
              >
                <Trash2 />
                Delete
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </CardHeader>
    </Card>
  );
};

export default FileCard; 