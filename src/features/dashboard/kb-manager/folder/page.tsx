"use client";

import React, { useEffect } from "react";
import { Grid2X2, List, Plus, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";

import SideSlider from "@/components/ui/dialog/SideSlider";
import FileCard from "@/features/dashboard/kb-manager/folder/components/FileCard/FileCard";
import FileInfo from "@/features/dashboard/kb-manager/folder/components/FileInfo/FileInfo";
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
} from "./style";
import { KBFolder, ViewMode } from "../type";
import { Document } from "./type";
import { getKbById } from "../service/kb-manager.service";
import { BaseError } from "@/types/error";
import { useToast } from "@/components/ui/toast";
import { getAllDocuments } from "./services/document.service";
import { formatFileSize, getExtension } from "@/utils/helper";

interface FolderContentProps {
  folderId: string;
}

const tenantId = "047f5937-b5c5-455c-bd53-ad456bbe013f";

export const FolderContent: React.FC<FolderContentProps> = ({ folderId }) => {
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");
  const [showInfo, setShowInfo] = React.useState(false);
  const [selectedFolder, setSelectedFolder] = React.useState<KBFolder | null>(null);
  const [documents, setDocuments] = React.useState<Document[]>([]);
  const [selectedFile, setSelectedFile] = React.useState<Document | null>(null);
  const toast = useToast();

  const fetchKbFolders = async () => {
    try {
      const { data } = await getKbById(tenantId, folderId);

      const folders: KBFolder = {
        id: data.id,
        name: data.name,
        totalDocs: 0,
        size: "0 KB",
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };

      setSelectedFolder(folders);
    } catch (error) {
      const err = error as BaseError;

      toast.error({
        title: `Error (${err.statusCode})`,
        description: err.message || "An unexpected error occurred",
        duration: 5000,
        action: {
          label: "Retry",
          onClick: () => fetchKbFolders(),
          altText: "Click to retry loading knowledge bases",
        },
      });
    }
  };

  const fetchKbFiles = async () => {
    try {
      const { data } = await getAllDocuments(tenantId, folderId);

      const mappedFiles: Document[] = data.map((document) => ({
        id: document.id,
        name: document.name,
        size: formatFileSize(document.size),
        extension: getExtension(document.name),
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      }));

      setDocuments(mappedFiles);
    } catch (error) {
      const err = error as BaseError;
      
      toast.error({
        title: `Error (${err.statusCode})`,
        description: err.message || "An unexpected error occurred",
        duration: 5000,
      });
    }
  }

  useEffect(() => {
    fetchKbFolders();
    fetchKbFiles();
  }, []);

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

  const handleShowInfo = (file: Document) => {
    setSelectedFile(file);
    setShowInfo(true);
  };

  if (!selectedFolder) {
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
          <h1>{selectedFolder.name}</h1>
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
        {documents.map((document) => (
          <FileCard
            key={document.id}
            document={document}
            onDelete={() => handleDeleteFile(document.id)}
            onRename={() => handleEditFile(document.id)}
            onInfo={() => handleShowInfo(document)}
          />
        ))}
      </Content>

      <SideSlider open={showInfo} onOpenChange={() => setShowInfo(false)}>
        <FileInfo document={selectedFile} />
      </SideSlider>
    </Layout>
  );
};
