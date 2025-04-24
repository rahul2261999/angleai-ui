'use client';

import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MoreVertical, Pencil, Trash2, Info } from 'lucide-react';
import FileIcon from '@/components/ui/icons/FileIcons';
import { Card, IconWrapper, ContentWrapper, FileName, FileInfo, CardHeader, MenuButton, DropdownContent, DropdownItem } from './filecard.style.';
import { Document } from '../../type';


interface FileCardProps {
  document: Document;
  onDelete?: () => void;
  onRename?: () => void;
  onInfo?: () => void;
}

const FileCard: React.FC<FileCardProps> = ({ document, onDelete, onRename, onInfo }) => {

  return (
    <Card>
      <IconWrapper>
        <FileIcon type={document.extension || ''} size={32} />
      </IconWrapper>

      <ContentWrapper>
        <FileName>{document.name}</FileName>
        <FileInfo>
          <span>{document.size}</span>
          <span>•</span>
          <span>{new Date(document.updatedAt).toLocaleDateString()}</span>
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
                Edit
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