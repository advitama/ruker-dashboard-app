"use client";

import { env } from "@/config/env";
import axios, { InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "@/utils/function/access-token";

import { toast } from "@/components/ui/use-toast";

const DASHBOARD_API = axios.create({
  baseURL: env.NEXT_PUBLIC_DASHBOARD_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

DASHBOARD_API.interceptors.request.use(
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

DASHBOARD_API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("API Error", error);
    const message = error.response?.data?.message || error.message;
    toast({
      title: "Error",
      description: message,
    });

    return Promise.reject(error);
  }
);

export default DASHBOARD_API;
