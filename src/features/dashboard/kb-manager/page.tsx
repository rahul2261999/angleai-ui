import { useState, useEffect } from "react";
import { Grid2X2, List, Plus } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SideSlider from "@/components/ui/dialog/SideSlider";
import FolderCard from "@/features/dashboard/kb-manager/components/FolderCard/FolderCard";
import {
  createKb,
  deleteKbById,
  getAllKb,
  getKbById,
  updaeKb,
} from "./service/kb-manager.service";
import { useToast } from "@/components/ui/toast";
import { BaseError } from "@/types/error";
import { CreateEditKb } from "./components/CreateEditKb/CreateEditKb";
import {
  Header,
  HeaderLeft,
  Description,
  HeaderRight,
  ViewToggle,
  ToggleButton,
  CreateButton,
  Content,
} from "./style";
import FolderInfo from "./components/FolderInfo/FolderInfo";
import { KBFolder, ViewMode } from "./type";
import { Document } from "./folder/type";

interface ItemInfo {
  type: "folder" | "file";
  data: KBFolder | Document;
}

const tenantId = "047f5937-b5c5-455c-bd53-ad456bbe013f";
export const KBManager = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showInfo, setShowInfo] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemInfo | null>(null);
  const [kbFolders, setKbFolders] = useState<KBFolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<KBFolder | null>(null);
  const toast = useToast();

  const fetchKbFolders = async () => {
    try {
      setIsLoading(true);
      const response = await getAllKb(tenantId);

      // Map the response data to KBFolder type
      const folders: KBFolder[] = response.data.map((item) => ({
        id: item.id,
        name: item.name,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        totalDocs: 0,
        size: "0 KB",
      }));

      setKbFolders(folders);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKbFolders();

    return () => {
      setKbFolders([]);
    };
  }, []);

  const handleCreateKB = () => {
    setShowCreateDialog(true);
  };

  const handleCreateSubmit = async (data: { name: string }) => {
    try {
      await createKb(tenantId, { name: data.name });
      await fetchKbFolders();

      toast.success({
        title: "Success",
        description: "Knowledge base created successfully",
        duration: 3000,
      });
    } catch (error) {
      const err = error as BaseError;
      toast.error({
        title: "Error",
        description: err.message || "Failed to create knowledge base",
        duration: 5000,
      });
    }
  };

  const handleShowInfo = (
    type: "folder" | "file",
    data: KBFolder | Document
  ) => {
    setSelectedItem({ type, data });
    setShowInfo(true);
  };

  const handleEditFolder = (folder: KBFolder) => {
    setSelectedFolder(folder);
    setShowEditDialog(true);
  };

  const handleEditSubmit = async (data: { name: string }) => {
    try {
      if (!selectedFolder) return;

      await updaeKb(tenantId, selectedFolder.id, { name: data.name });
      const getUpdatedKb = await getKbById(tenantId, selectedFolder.id);

      const filterKbFolders = kbFolders.filter(
        (folder) => folder.id !== selectedFolder.id
      );

      const updatedKbFolder: KBFolder = {
        id: getUpdatedKb.data.id,
        name: getUpdatedKb.data.name,
        createdAt: getUpdatedKb.data.createdAt,
        updatedAt: getUpdatedKb.data.updatedAt,
        totalDocs: 0,
        size: "0 KB",
      };

      const updatedKbFolders = [...filterKbFolders, updatedKbFolder];
      setKbFolders(updatedKbFolders);
      setSelectedFolder(null);

      toast.success({
        title: "Success",
        description: "Knowledge base updated successfully",
        duration: 3000,
      });
    } catch (error) {
      const err = error as BaseError;
      toast.error({
        title: "Error",
        description: err.message || "Failed to update knowledge base",
        duration: 5000,
      });
    }
  };

  const handleDeleteFolder = async (folder: KBFolder) => {
    try {
      await deleteKbById(tenantId, folder.id);
      setKbFolders((prev) => {
        const updatedKbFolders = prev.filter(
          (kbFolder) => kbFolder.id !== folder.id
        );
        return updatedKbFolders;
      });

      toast.success({
        title: "Success",
        description: "Knowledge base deleted successfully",
        duration: 3000,
      });
    } catch (error) {
      const err = error as BaseError;
      toast.error({
        title: "Error",
        description: err.message || "Failed to delete knowledge base",
        duration: 5000,
      });
    }
  };

  return (
    <Layout>
      {/* <Toast description={"hello "} duration={100000} id={""} onRemove={()  => {}} /> */}
      <Header>
        <HeaderLeft>
          <h1>Knowledge Base Manager</h1>
          <Description>
            Manage your knowledge base folders and documents
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

          <CreateButton onClick={handleCreateKB}>
            <Plus />
            Create KB
          </CreateButton>
        </HeaderRight>
      </Header>

      <Content $view={viewMode}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          kbFolders.map((folder) => (
            <FolderCard
              key={folder.id}
              folder={folder}
              view={viewMode}
              onEdit={() => handleEditFolder(folder)}
              onDelete={() => handleDeleteFolder(folder)}
              onInfo={() => handleShowInfo("folder", folder)}
            />
          ))
        )}
      </Content>

      <SideSlider open={showInfo} onOpenChange={() => setShowInfo(false)}>
        {selectedItem?.type === "folder" && (
          <FolderInfo folder={selectedItem.data as KBFolder} />
        )}
        {selectedItem?.type === "file" && (
          <div>
            <h3>{selectedItem.data.name}</h3>
            {/* Add file-specific information here */}
          </div>
        )}
      </SideSlider>

      {/* Create Dialog */}
      <CreateEditKb
        mode="create"
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSubmit={handleCreateSubmit}
      />

      {/* Edit Dialog */}
      <CreateEditKb
        mode="edit"
        open={showEditDialog}
        initialData={selectedFolder ? { name: selectedFolder.name } : undefined}
        onClose={() => {
          setShowEditDialog(false);
          setSelectedFolder(null);
        }}
        onSubmit={handleEditSubmit}
      />
    </Layout>
  );
};
