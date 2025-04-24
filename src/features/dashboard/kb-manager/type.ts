export interface KBFolder {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  totalDocs: number;
  size: string;
  color?: string;
}

export type ViewMode = 'grid' | 'list'; 