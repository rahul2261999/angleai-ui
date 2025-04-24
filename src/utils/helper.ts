import { BaseError } from "@/types/error";
import axios from "axios";

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const errorHandler =(error: unknown) => {
  if (axios.isAxiosError(error)) {
    // If it's an axios error with response data, throw the typed error
    if (error.response?.data) {
      return error.response.data as BaseError;
    }
    // If it's an axios error without response data, create a generic error
    return {
      tracingId: error.code || 'unknown',
      statusCode: error.response?.status || 500,
      message: error.message || 'An unexpected error occurred',
      error: [],
      timestamp: new Date().toISOString(),
    } as BaseError;
  }
  // If it's an unknown error, create a generic error response
  return {
    tracingId: 'unknown',
    statusCode: 500,
    message: error instanceof Error ? error.message : 'An unexpected error occurred',
    error: [],
    timestamp: new Date().toISOString(),
  } as BaseError;
}

export const getExtension = (filename: string) => {
  return filename.split('.').pop() || '';
}