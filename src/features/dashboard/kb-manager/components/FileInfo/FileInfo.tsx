"use client";

import React from "react";
import { FileType } from "@/types/file";
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
import { formatFileSize } from "@/utils/helper";

interface FileInfoProps {
  file: FileType | null;
}

const FileInfo: React.FC<FileInfoProps> = ({ file }) => {
  if (!file) return null;

  return (
    <>
      <Header>
        <IconWrapper>
          <FileIcon type={file.type || ""} size={40} />
        </IconWrapper>
        <Title>{file.name}</Title>
      </Header>

      <Section>
        <SectionTitle>Details</SectionTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Created</InfoLabel>
            <InfoValue>
              {new Date(file.createdAt).toLocaleDateString()}
            </InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Modified</InfoLabel>
            <InfoValue>
              {new Date(file.updatedAt).toLocaleDateString()}
            </InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Size</InfoLabel>
            <InfoValue>
              {file.size ? formatFileSize(file.size) : "Unknown"}
            </InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Type</InfoLabel>
            <InfoValue>{file.type?.toUpperCase() || "Unknown"}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </Section>
    </>
  );
};

export default FileInfo;
