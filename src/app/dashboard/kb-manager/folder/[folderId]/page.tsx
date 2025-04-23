import { FolderContentPageClient } from './FolderContentPageClient';

interface PageProps {
  params: {
    folderId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const folderId = await Promise.resolve(params.folderId);
  return <FolderContentPageClient folderId={folderId} />;
} 