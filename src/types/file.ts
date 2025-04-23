export interface FileType {
  id: string;
  name: string;
  size?: number;
  type?: string;
  path?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
} 