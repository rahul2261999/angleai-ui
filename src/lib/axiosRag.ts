import axios from 'axios';

export const axiosRag = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RAG_SERVICE_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})