import { axiosRag } from "@/lib/axiosRag"
import { CreateKb, KbFolderRes } from "./kb-manager.type"
import { BaseResponse } from "@/types/response";
import { BaseError } from "@/types/error";
import axios from "axios";

export const getAllKb = async (tenantId: string) => {
  try {
    const res = await axiosRag.get<BaseResponse<KbFolderRes[]>>(`/v1/${tenantId}/knowledgebases`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // If it's an axios error with response data, throw the typed error
      if (error.response?.data) {
        throw error.response.data as BaseError;
      }
      // If it's an axios error without response data, create a generic error
      throw {
        tracingId: error.code || 'unknown',
        statusCode: error.response?.status || 500,
        message: error.message || 'An unexpected error occurred',
        error: [],
        timestamp: new Date().toISOString(),
        path: `/v1/${tenantId}/knowledgebases`
      } as BaseError;
    }
    // If it's an unknown error, create a generic error response
    throw {
      tracingId: 'unknown',
      statusCode: 500,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      error: [],
      timestamp: new Date().toISOString(),
      path: `/v1/${tenantId}/knowledgebases`
    } as BaseError;
  }
}

export const getKbById = async (
  tenantId: string,
  knowledgebaseId: string
) => {
  try {
    const res = await axiosRag.get<BaseResponse<KbFolderRes>>(`/v1/${tenantId}/knowledgebases/${knowledgebaseId}`);

    return res.data
  } catch (error) {
    console.log(error);

    throw error
  }
}

export const createKb = async (
  tenantId: string,
  body: CreateKb
) => {
  try {
    const res = await axiosRag.post<BaseResponse<KbFolderRes>>(`/v1/${tenantId}/knowledgebases`, body);

    return res.data
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export const updaeKb = async (
  tenantId: string,
  knowledgebaseId: string,
  body: Partial<CreateKb>
) => {
  try {
    const res = await axiosRag.patch<BaseResponse>(`/v1/${tenantId}/knowledgebases/${knowledgebaseId}`, body);

    return res.data
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export const deleteKbById = async (
  tenantId: string,
  knowledgebaseId: string
) => {
  try {
    const res = await axiosRag.delete<BaseResponse>(`/v1/${tenantId}/knowledgebases/${knowledgebaseId}`);

    return res.data
  } catch (error) {
    console.log(error);

    throw error
  }
}

