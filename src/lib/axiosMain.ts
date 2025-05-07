import axios from 'axios';

export const axiosMain = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_SERVICE_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})