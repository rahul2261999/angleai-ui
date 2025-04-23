'use client';

import React from 'react';
import styled from 'styled-components';
import { FileType } from '@/types/file';
import FileIcon from '@/components/ui/icons/FileIcons';

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
  background: var(--gray-2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
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

interface FileInfoProps {
  file: FileType | null;
}

const FileInfo: React.FC<FileInfoProps> = ({ file }) => {
  if (!file) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <>
      <Header>
        <IconWrapper>
          <FileIcon type={file.type || ''} size={40} />
        </IconWrapper>
        <Title>{file.name}</Title>
      </Header>

      <Section>
        <SectionTitle>Details</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Created</InfoLabel>
            <InfoValue>{new Date(file.createdAt).toLocaleDateString()}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Modified</InfoLabel>
            <InfoValue>{new Date(file.updatedAt).toLocaleDateString()}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Size</InfoLabel>
            <InfoValue>{file.size ? formatFileSize(file.size) : 'Unknown'}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Type</InfoLabel>
            <InfoValue>{file.type?.toUpperCase() || 'Unknown'}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </Section>
    </>
  );
};

export default FileInfo; 