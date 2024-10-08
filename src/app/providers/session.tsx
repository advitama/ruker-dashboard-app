"use client";

import {
  type ReactNode,
  createContext,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import {
  createSessionStore,
  initSessionStore,
} from "@/stores/session-store";

export type SessionStoreApi = ReturnType<typeof createSessionStore>;

export const SessionStoreContext = createContext<SessionStoreApi | undefined>(
  undefined
);

export interface SessionStoreProviderProps {
  children: ReactNode;
}

export const SessionStoreProvider = ({
  children,
}: SessionStoreProviderProps) => {
  const storeRef = useRef<SessionStoreApi | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeStore = async () => {
      const initialState = await initSessionStore();
      storeRef.current = createSessionStore(initialState);
      setLoading(false); 
    };

    initializeStore();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SessionStoreContext.Provider value={storeRef.current}>
      {children}
    </SessionStoreContext.Provider>
  );
};
