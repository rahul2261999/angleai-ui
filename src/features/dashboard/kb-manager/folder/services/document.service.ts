import { axiosRag } from "@/lib/axiosRag"
import { BaseResponse } from "@/types/response";
import { KbDocumentRes } from "./document.types";
import { errorHandler } from "@/utils/helper";



export const uploadDocument = async (
  tenantId: string,
  knowledgebaseId: string,
  body: FormData
) => {
  try {
    const res = await axiosRag.post<BaseResponse<KbDocumentRes>>(`/v1/${tenantId}/knowledgebases/${knowledgebaseId}/document`, body , {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return res.data
  } catch (error) {

    throw errorHandler(error);
  }
}

export const getAllDocuments = async (tenantId: string, knowledgebaseId: string) => {
  try {
    const res = await axiosRag.get<BaseResponse<KbDocumentRes[]>>(`/v1/${tenantId}/knowledgebases/${knowledgebaseId}/document`);
    
    return res.data;
  } catch (error) {
    throw errorHandler(error);
  }
}

export const getDocumentByID = async (
  tenantId: string,
  knowledgebaseId: string,
  documentId: string
) => {
  try {
    const res = await axiosRag.get<BaseResponse<KbDocumentRes>>(`/v1/${tenantId}/knowledgebases/${knowledgebaseId}/document/${documentId}`);

    return res.data
  } catch (error) {
    throw errorHandler(error);
  }
}

export const deleteDocumentById = async (
  tenantId: string,
  knowledgebaseId: string,
  documentId: string
) => {
  try {
    const res = await axiosRag.delete<BaseResponse>(`/v1/${tenantId}/knowledgebases/${knowledgebaseId}/document/${documentId}`);

    return res.data
  } catch (error) {
    throw errorHandler(error)
  }
}

