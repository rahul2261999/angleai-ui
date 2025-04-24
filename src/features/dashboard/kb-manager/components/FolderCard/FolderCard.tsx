'use client';

import React from 'react';
import { MoreVertical, Pencil, Trash2, Info, FolderOpen } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DropdownMenu } from 'radix-ui';
import { Card, IconWrapper, ContentWrapper, FolderName, MetaWrapper, FolderInfo, CardHeader, MenuButton, DropdownContent, DropdownItem } from './foldercard.style';
import { KBFolder, ViewMode } from '../../type';


interface FolderCardProps {
  folder: KBFolder;
  view: ViewMode;
  onEdit?: (folder: KBFolder) => void;
  onDelete?: (folder: KBFolder) => void;
  onInfo?: (folder: KBFolder) => void;
}

const FolderCard: React.FC<FolderCardProps> = ({
  folder,
  view,
  onEdit,
  onDelete,
  onInfo,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/dashboard/kb-manager/folder/${folder.id}`);
  };

  return (
    <Card $view={view} onClick={handleCardClick}>
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
              <DropdownItem onSelect={() => {
                router.push(`/dashboard/kb-manager/folder/${folder.id}`);
              }}>
                <FolderOpen />
                Open
              </DropdownItem>
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
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </CardHeader>
    </Card>
  );
};

export default FolderCard; 