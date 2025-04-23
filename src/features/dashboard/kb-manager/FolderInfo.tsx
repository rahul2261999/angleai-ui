'use client';

import React from 'react';
import styled from 'styled-components';
import { KBFolder } from '@/types/kb';
import Image from 'next/image';

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-12);
  margin: 0 0 8px 0;
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  position: relative;
  margin-bottom: 16px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-11);
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const InfoItem = styled.div`
  padding: 12px;
  background: var(--gray-2);
  border-radius: 8px;
`;

const InfoLabel = styled.div`
  font-size: 0.75rem;
  color: var(--gray-8);
  margin-bottom: 4px;
`;

const InfoValue = styled.div`
  font-size: 0.875rem;
  color: var(--gray-12);
  font-weight: 500;
`;

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