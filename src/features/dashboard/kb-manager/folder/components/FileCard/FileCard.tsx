'use client';

import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MoreVertical, Pencil, Trash2, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FileType } from '@/types/file';
import FileIcon from '@/components/ui/icons/FileIcons';
import { Card, IconWrapper, ContentWrapper, FileName, FileInfo, CardHeader, MenuButton, DropdownContent, DropdownItem } from './filecard.style.';


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