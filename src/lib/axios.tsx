"use client";

import axios from "axios";
import { env } from "@/config/env";

export const AUTH_API = axios.create({
  baseURL: env.NEXT_PUBLIC_AUTH_API_URL,
});