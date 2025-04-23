"use client";

import React from "react";
import { Grid2X2, List, Plus, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { ViewMode, KBFolder } from "@/types/kb";

import { FileType } from "@/types/file";
import SideSlider from "@/components/ui/dialog/SideSlider";
import FileCard from "@/features/dashboard/kb-manager/components/FileCard/FileCard";
import FileInfo from "@/features/dashboard/kb-manager/components/FileInfo/FileInfo";
import {
  BackButton,
  Header,
  HeaderLeft,
  Description,
  HeaderRight,
  ViewToggle,
  ToggleButton,
  CreateButton,
  Content,
} from "./foldercontent.style";

// Mock data - replace with API call later
const mockFolders: { [key: string]: KBFolder } = {
  "1": {
    id: "1",
    name: "Product Knowledge",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-02-20T15:30:00Z",
    totalDocs: 45,
    size: "2.3 MB",
  },
  "2": {
    id: "2",
    name: "Customer Support",
    createdAt: "2024-01-20T09:00:00Z",
    updatedAt: "2024-02-19T11:20:00Z",
    totalDocs: 32,
    size: "1.8 MB",
  },
  "3": {
    id: "3",
    name: "Technical Docs",
    createdAt: "2024-02-01T14:00:00Z",
    updatedAt: "2024-02-21T09:45:00Z",
    totalDocs: 28,
    size: "3.1 MB",
  },
};

const mockFiles: FileType[] = [
  {
    id: "1",
    name: "Product Overview.pdf",
    type: "pdf",
    size: 2300000,
    createdAt: "2024-02-20T15:30:00Z",
    updatedAt: "2024-02-20T15:30:00Z",
  },
  {
    id: "2",
    name: "Technical Specifications.docx",
    type: "docx",
    size: 1800000,
    createdAt: "2024-02-19T11:20:00Z",
    updatedAt: "2024-02-19T11:20:00Z",
  },
  {
    id: "3",
    name: "Release Notes.txt",
    type: "txt",
    size: 156000,
    createdAt: "2024-02-21T09:45:00Z",
    updatedAt: "2024-02-21T09:45:00Z",
  },
];

interface FolderContentProps {
  folderId: string;
}

export const FolderContent: React.FC<FolderContentProps> = ({ folderId }) => {
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");
  const [showInfo, setShowInfo] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<FileType | null>(null);

  // Get folder data - replace with API call later
  const folder = mockFolders[folderId];

  const handleCreateFile = () => {
    // Implement file creation logic
    console.log("Create file clicked");
  };

  const handleEditFile = (fileId: string) => {
    // Implement file edit logic
    console.log("Edit file:", fileId);
  };

  const handleDeleteFile = (fileId: string) => {
    // Implement file delete logic
    console.log("Delete file:", fileId);
  };

  const handleShowInfo = (file: FileType) => {
    setSelectedFile(file);
    setShowInfo(true);
  };

  if (!folder) {
    return (
      <Layout>
        <BackButton href="/dashboard/kb-manager">
          <ArrowLeft />
          Back to Folders
        </BackButton>
        <div>Folder not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <BackButton href="/dashboard/kb-manager">
        <ArrowLeft />
        Back to Folders
      </BackButton>

      <Header>
        <HeaderLeft>
          <h1>{folder.name}</h1>
          <Description>
            Manage documents in this knowledge base folder
          </Description>
        </HeaderLeft>

        <HeaderRight>
          <ViewToggle>
            <ToggleButton
              $active={viewMode === "grid"}
              onClick={() => setViewMode("grid")}
            >
              <Grid2X2 size={20} />
            </ToggleButton>
            <ToggleButton
              $active={viewMode === "list"}
              onClick={() => setViewMode("list")}
            >
              <List size={20} />
            </ToggleButton>
          </ViewToggle>

          <CreateButton onClick={handleCreateFile}>
            <Plus />
            Upload File
          </CreateButton>
        </HeaderRight>
      </Header>

      <Content $view={viewMode}>
        {mockFiles.map((file) => (
          <FileCard
            key={file.id}
            file={file}
            onDelete={() => handleDeleteFile(file.id)}
            onRename={() => handleEditFile(file.id)}
            onInfo={() => handleShowInfo(file)}
          />
        ))}
      </Content>

      <SideSlider open={showInfo} onOpenChange={() => setShowInfo(false)}>
        <FileInfo file={selectedFile} />
      </SideSlider>
    </Layout>
  );
};
