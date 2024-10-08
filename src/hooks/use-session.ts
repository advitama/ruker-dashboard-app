"use client";

import { useContext } from "react";
import { useStore } from "zustand";
import { type SessionStore } from "@/stores/session-store";
import { SessionStoreContext } from "@/app/providers/session";

export const useSession = <T>(selector: (store: SessionStore) => T): T => {
  const sessionStoreContext = useContext(SessionStoreContext);

  if (!sessionStoreContext) {
    throw new Error(`useSessionStore must be used within SessionStoreProvider`);
  }

  return useStore(sessionStoreContext, selector);
};
