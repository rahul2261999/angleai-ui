'use client';

import React from 'react';
import { Grid2X2, List, Plus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { FileInfo, KBFolder, ViewMode } from '@/types/kb';
import SideSlider from '@/components/ui/dialog/SideSlider';
import FolderCard from '@/features/dashboard/kb-manager/components/FolderCard/FolderCard';
import FolderInfo from '@/features/dashboard/kb-manager/components/FolderInfo/FolderInfo';
import { Header, HeaderLeft, Description, HeaderRight, ViewToggle, ToggleButton, CreateButton, Content } from './style';



interface ItemInfo {
  type: 'folder' | 'file';
  data: KBFolder | FileInfo;
}
// Mock data - replace with API call later
const mockFolders: KBFolder[] = [
  {
    id: '1',
    name: 'Product Knowledge',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-02-20T15:30:00Z',
    totalDocs: 45,
    size: '2.3 MB',
  },
  {
    id: '2',
    name: 'Customer Support',
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-02-19T11:20:00Z',
    totalDocs: 32,
    size: '1.8 MB',
  },
  {
    id: '3',
    name: 'Technical Docs',
    createdAt: '2024-02-01T14:00:00Z',
    updatedAt: '2024-02-21T09:45:00Z',
    totalDocs: 28,
    size: '3.1 MB',
  },
];

const KBManagerPage: React.FC = () => {
  const [viewMode, setViewMode] = React.useState<ViewMode>('grid');
  const [showInfo, setShowInfo] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<ItemInfo | null>(null);

  const handleCreateKB = () => {
    // Implement KB creation logic
    console.log('Create KB clicked');
  };

  const handleShowInfo = (type: 'folder' | 'file', data: KBFolder | FileInfo) => {
    setSelectedItem({ type, data });
    setShowInfo(true);
  };

  const handleEditFolder = (folder: KBFolder) => {
    // Implement folder edit logic
    console.log('Edit folder:', folder);
  };

  const handleDeleteFolder = (folder: KBFolder) => {
    // Implement folder delete logic
    console.log('Delete folder:', folder);
  };

  return (
    <Layout>
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
              $active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
            >
              <Grid2X2 size={20} />
            </ToggleButton>
            <ToggleButton
              $active={viewMode === 'list'}
              onClick={() => setViewMode('list')}
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
        {mockFolders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            view={viewMode}
            onEdit={() => handleEditFolder(folder)}
            onDelete={() => handleDeleteFolder(folder)}
            onInfo={() => handleShowInfo('folder', folder)}
          />
        ))}
      </Content>

      <SideSlider
        open={showInfo}
        onOpenChange={() => setShowInfo(false)}
      >
        {selectedItem?.type === 'folder' && (
          <FolderInfo folder={selectedItem.data as KBFolder} />
        )}
        {selectedItem?.type === 'file' && (
          <div>
            <h3>{selectedItem.data.name}</h3>
            {/* Add file-specific information here */}
          </div>
        )}
      </SideSlider>
    </Layout>
  );
};

const Page: React.FC = () => <KBManagerPage />;
export default Page; 