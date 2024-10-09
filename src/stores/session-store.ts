import AUTH_API from "@/lib/api/auth";
import { createStore } from "zustand/vanilla";
import type { Session } from "@/types/session";

export type SessionStore = Session;

export const initSessionStore = async () => {
  const { data } = await AUTH_API.get("/user/profile");

  return {
    id: data.id,
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name,
  };
};

export const defaultInitState: Session = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
};

export const createSessionStore = (
  initState: Session = defaultInitState
) => {
  return createStore<SessionStore>()(() => ({
    ...initState,
  }));
};
