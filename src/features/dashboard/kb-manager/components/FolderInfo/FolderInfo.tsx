'use client';

import React from 'react';

import { KBFolder } from '@/types/kb-manager';
import Image from 'next/image';
import { Header, IconWrapper, Title, SectionTitle, InfoGrid, InfoItem, InfoLabel, InfoValue, Section } from './folderinfo.style';



interface FolderInfoProps {
  folder: KBFolder | null;
}

const FolderInfo: React.FC<FolderInfoProps> = ({ folder }) => {
  if (!folder) return null;

  return (
    <>
      <Header>
        <IconWrapper>
          <Image
            src="/assets/icons/folder.svg"
            alt={folder.name}
            fill
            style={{ objectFit: 'contain' }}
          />
        </IconWrapper>
        <Title>{folder.name}</Title>
      </Header>

      <Section>
        <SectionTitle>Details</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Created</InfoLabel>
            <InfoValue>{new Date(folder.createdAt).toLocaleDateString()}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Modified</InfoLabel>
            <InfoValue>{new Date(folder.updatedAt).toLocaleDateString()}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Documents</InfoLabel>
            <InfoValue>{folder.totalDocs}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Size</InfoLabel>
            <InfoValue>{folder.size}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </Section>
    </>
  );
};

export default FolderInfo; 