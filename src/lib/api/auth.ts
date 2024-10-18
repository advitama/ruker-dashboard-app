("");
import { env } from "@/config/env";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "@/utils/function/access-token";

import { toast } from "@/components/ui/use-toast";

const AUTH_API = axios.create({
  baseURL: env.NEXT_PUBLIC_AUTH_API_URL,
});

AUTH_API.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AUTH_API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    toast({
      title: "An unexpected error occurred",
      description: error.message,
    });

    return Promise.reject(error);
  }
);

export default AUTH_API;
