'use client';

import React from 'react';
import styled from 'styled-components';
import { Grid2X2, List, Plus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import FolderCard from '@/components/kb-manager/FolderCard';
import FolderInfo from '@/components/kb-manager/FolderInfo';
import { KBFolder, ViewMode } from '@/types/kb';
import { media } from '@/styles/breakpoints';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;

  ${media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--gray-12);
    margin: 0;
    letter-spacing: -0.02em;

    ${media.md} {
      font-size: 1.75rem;
    }
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  ${media.md} {
    gap: 16px;
    flex-wrap: nowrap;
  }
`;

const Description = styled.p`
  color: var(--gray-11);
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;

  ${media.md} {
    font-size: 0.9375rem;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  align-items: center;
  background: var(--gray-3);
  border-radius: 8px;
  padding: 4px;
  margin-right: auto;

  ${media.md} {
    margin-right: 0;
    order: 2;
  }
`;

const ToggleButton = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? 'var(--bg-color-primary)' : 'transparent'};
  border: none;
  padding: 8px;
  cursor: pointer;
  color: ${props => props.$active ? 'var(--gray-12)' : 'var(--gray-8)'};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  min-width: 36px;

  &:hover {
    color: var(--gray-12);
  }

  svg {
    width: 18px;
    height: 18px;

    ${media.md} {
      width: 20px;
      height: 20px;
    }
  }
`;

const CreateButton = styled.button`
  background: var(--blue-9);
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: var(--blue-10);
  }

  svg {
    width: 16px;
    height: 16px;

    ${media.md} {
      width: 18px;
      height: 18px;
    }
  }
`;

const Content = styled.div<{ $view: ViewMode }>`
  margin-top: 24px;
  width: 100%;

  ${props => props.$view === 'grid' && `
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

    ${media.sm} {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }

    ${media.md} {
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 24px;
    }

    ${media.lg} {
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    }

    ${media.xl} {
      grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
      gap: 28px;
    }
  `}

  ${props => props.$view === 'list' && `
    display: flex;
    flex-direction: column;
    gap: 12px;
  `}
`;

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
  const [selectedFolder, setSelectedFolder] = React.useState<KBFolder | null>(null);

  const handleCreateKB = () => {
    // Implement KB creation logic
    console.log('Create KB clicked');
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
        {mockFolders.map(folder => (
          <FolderCard
            key={folder.id}
            folder={folder}
            view={viewMode}
            onClick={() => setSelectedFolder(folder)}
            onEdit={handleEditFolder}
            onDelete={handleDeleteFolder}
            onInfo={() => setSelectedFolder(folder)}
          />
        ))}
      </Content>

      <FolderInfo
        folder={selectedFolder}
        onClose={() => setSelectedFolder(null)}
      />
    </Layout>
  );
};

const Page: React.FC = () => <KBManagerPage />;
export default Page; 