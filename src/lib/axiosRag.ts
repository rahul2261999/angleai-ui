import axios from 'axios';

export const axiosRag = axios.create({
  baseURL: 'http://localhost:8000/rag/api',
  headers: {
    'Content-Type': 'application/json'
  }
})