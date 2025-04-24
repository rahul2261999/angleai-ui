export interface KbFolderRes {
  id: string;
  tenantId: string;
  name: string;
  status: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string
}

export interface CreateKb {
  name: string
}