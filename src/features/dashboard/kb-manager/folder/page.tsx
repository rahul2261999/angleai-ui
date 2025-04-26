"use client";

import React, { useEffect } from "react";
import { Grid2X2, List, Plus, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";

import SideSlider from "@/components/ui/dialog/SideSlider";
import FileCard from "@/features/dashboard/kb-manager/folder/components/FileCard/FileCard";
import FileInfo from "@/features/dashboard/kb-manager/folder/components/FileInfo/FileInfo";
import AddEditDocument from "@/features/dashboard/kb-manager/folder/components/document-dialog/AddEditDocument";
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
import { deleteDocumentById, getAllDocuments, uploadDocument } from "./services/document.service";
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
  const [showDocumentDialog, setShowDocumentDialog] = React.useState(false);
  const [documentDialogMode, setDocumentDialogMode] = React.useState<'add' | 'edit' | 'view'>('add');
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
        tag: document.tag,
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
    setDocumentDialogMode('add');
    setSelectedFile(null);
    setShowDocumentDialog(true);
  };

  const handleEditFile = (fileId: string) => {
    const fileToEdit = documents.find(doc => doc.id === fileId);
    if (fileToEdit) {
      setSelectedFile(fileToEdit);
      setDocumentDialogMode('edit');
      setShowDocumentDialog(true);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    await deleteDocumentById(tenantId, folderId, fileId);
    setDocuments(documents.filter(doc => doc.id !== fileId));

    toast.success({
      title: `Document deleted successfully`,
      description: `The document has been deleted successfully`,
      duration: 3000,
    });
  };

  const handleShowInfo = (file: Document) => {
    setSelectedFile(file);
    setShowInfo(true);
  };

  const handleDocumentSubmit = async (data: { file: File; tag: string }) => {
    try {
      if (documentDialogMode === 'add') {
        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('tag', data.tag);

        await uploadDocument(tenantId, folderId, formData);
        await fetchKbFiles(); // Refresh the file list
      } else if (documentDialogMode === 'edit') {
        // TODO: Implement file update logic when API is available
        console.log('Updating file:', data);
      }
      
      setShowDocumentDialog(false);

      toast.success({
        title: `File ${documentDialogMode === 'add' ? 'uploaded' : 'updated'} successfully`,
        description: documentDialogMode === 'add' 
          ? 'Your file has been uploaded successfully'
          : 'Your file has been updated successfully',
        duration: 3000,
      });
    } catch (error) {
      const err = error as BaseError;
      toast.error({
        title: `Error (${err.statusCode})`,
        description: err.message || "An unexpected error occurred",
        duration: 5000,
      });
    }
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
            onEdit={() => handleEditFile(document.id)}
            onInfo={() => handleShowInfo(document)}
          />
        ))}
      </Content>

      <SideSlider open={showInfo} onOpenChange={() => setShowInfo(false)}>
        <FileInfo document={selectedFile} />
      </SideSlider>

      <AddEditDocument
        open={showDocumentDialog}
        mode={documentDialogMode}
        initialData={documentDialogMode === 'edit' ? {
          file: undefined, // We can't pass the file object since we don't have it
          tag: selectedFile?.tag || '' // Using name as tag for now, update this based on your data structure
        } : undefined}
        onClose={() => setShowDocumentDialog(false)}
        onSubmit={handleDocumentSubmit}
      />
    </Layout>
  );
};
