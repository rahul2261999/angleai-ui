import { FolderContent } from "@/features/dashboard/kb-manager/components/FolderContent/FolderContent";

interface PageProps {
  params: Promise<{
    folderId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { folderId } = await params;
  
  return <FolderContent folderId={folderId} />;
}
