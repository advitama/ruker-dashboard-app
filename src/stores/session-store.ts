import AUTH_API from "@/lib/api/auth";
import { createStore } from "zustand/vanilla";

export type SessionState = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type SessionStore = SessionState;

export const initSessionStore = async () => {
  const { data } = await AUTH_API.get("/user/profile");

  return {
    id: data.id,
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name,
  };
};

export const defaultInitState: SessionState = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
};

export const createSessionStore = (
  initState: SessionState = defaultInitState
) => {
  return createStore<SessionStore>()(() => ({
    ...initState,
  }));
};
