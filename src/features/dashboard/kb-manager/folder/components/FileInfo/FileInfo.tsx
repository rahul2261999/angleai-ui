"use client";

import React from "react";
import FileIcon from "@/components/ui/icons/FileIcons";
import {
  Header,
  IconWrapper,
  Title,
  SectionTitle,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  Section,
} from "./fileinfo.style";
import { Document } from "../../type";

interface FileInfoProps {
  document: Document | null;
}

const FileInfo: React.FC<FileInfoProps> = ({ document }) => {
  if (!document) return null;

  return (
    <>
      <Header>
        <IconWrapper>
          <FileIcon type={document.extension || ""} size={40} />
        </IconWrapper>
        <Title>{document.name}</Title>
      </Header>

      <Section>
        <SectionTitle>Details</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Created</InfoLabel>
            <InfoValue>
              {new Date(document.createdAt).toLocaleDateString()}
            </InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Modified</InfoLabel>
            <InfoValue>
              {new Date(document.updatedAt).toLocaleDateString()}
            </InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Size</InfoLabel>
            <InfoValue>              {document.size}            </InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Type</InfoLabel>
            <InfoValue>{document.extension?.toUpperCase() || "Unknown"}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </Section>
    </>
  );
};

export default FileInfo;
