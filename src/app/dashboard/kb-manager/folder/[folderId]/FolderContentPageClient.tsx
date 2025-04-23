'use client';

import React from 'react';
import styled from 'styled-components';
import { Grid2X2, List, Plus, ArrowLeft } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { ViewMode, KBFolder } from '@/types/kb';
import { media } from '@/styles/breakpoints';
import Link from 'next/link';
import FileCard from '@/features/dashboard/kb-manager/FileCard';
import { FileType } from '@/types/file';
import SideSlider from '@/components/ui/dialog/SideSlider';
import FileInfo from '@/features/dashboard/kb-manager/FileInfo';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 32px;
  width: 100%;
  flex-wrap: wrap;

  ${media.md} {
    flex-wrap: nowrap;
    gap: 24px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 280px;

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
  justify-content: flex-end;

  ${media.md} {
    gap: 16px;
    flex-wrap: nowrap;
    flex-shrink: 0;
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

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--gray-11);
  text-decoration: none;
  font-size: 0.875rem;
  padding: 8px 0;
  transition: color 0.2s ease;

  &:hover {
    color: var(--gray-12);
  }

  svg {
    width: 16px;
    height: 16px;
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
const mockFolders: { [key: string]: KBFolder } = {
  '1': {
    id: '1',
    name: 'Product Knowledge',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-02-20T15:30:00Z',
    totalDocs: 45,
    size: '2.3 MB',
  },
  '2': {
    id: '2',
    name: 'Customer Support',
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-02-19T11:20:00Z',
    totalDocs: 32,
    size: '1.8 MB',
  },
  '3': {
    id: '3',
    name: 'Technical Docs',
    createdAt: '2024-02-01T14:00:00Z',
    updatedAt: '2024-02-21T09:45:00Z',
    totalDocs: 28,
    size: '3.1 MB',
  },
};

const mockFiles: FileType[] = [
  {
    id: '1',
    name: 'Product Overview.pdf',
    type: 'pdf',
    size: 2300000,
    createdAt: '2024-02-20T15:30:00Z',
    updatedAt: '2024-02-20T15:30:00Z',
  },
  {
    id: '2',
    name: 'Technical Specifications.docx',
    type: 'docx',
    size: 1800000,
    createdAt: '2024-02-19T11:20:00Z',
    updatedAt: '2024-02-19T11:20:00Z',
  },
  {
    id: '3',
    name: 'Release Notes.txt',
    type: 'txt',
    size: 156000,
    createdAt: '2024-02-21T09:45:00Z',
    updatedAt: '2024-02-21T09:45:00Z',
  },
];

interface FolderContentPageClientProps {
  folderId: string;
}

export function FolderContentPageClient({ folderId }: FolderContentPageClientProps) {
  const [viewMode, setViewMode] = React.useState<ViewMode>('grid');
  const [showInfo, setShowInfo] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<FileType | null>(null);
  
  // Get folder data - replace with API call later
  const folder = mockFolders[folderId];

  const handleCreateFile = () => {
    // Implement file creation logic
    console.log('Create file clicked');
  };

  const handleEditFile = (fileId: string) => {
    // Implement file edit logic
    console.log('Edit file:', fileId);
  };

  const handleDeleteFile = (fileId: string) => {
    // Implement file delete logic
    console.log('Delete file:', fileId);
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

          <CreateButton onClick={handleCreateFile}>
            <Plus />
            Upload File
          </CreateButton>
        </HeaderRight>
      </Header>

      <Content $view={viewMode}>
        {mockFiles.map(file => (
          <FileCard
            key={file.id}
            file={file}
            onDelete={() => handleDeleteFile(file.id)}
            onRename={() => handleEditFile(file.id)}
            onInfo={() => handleShowInfo(file)}
          />
        ))}
      </Content>

      <SideSlider
        open={showInfo}
        onOpenChange={() => setShowInfo(false)}
      >
        <FileInfo file={selectedFile} />
      </SideSlider>
    </Layout>
  );
} 