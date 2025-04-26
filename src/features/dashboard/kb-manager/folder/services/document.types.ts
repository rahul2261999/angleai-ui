export interface KbDocumentRes {
  id: string;
  tenantId: string;
  knowledgebaseId: string;
  name: string;
  size: number;
  processingStatus: string;
  tag: string;
  status: string;
  createdAt: string;
  updatedAt: string
}

export interface CreateKb {
  name: string
}