"use client";

import {
  type ReactNode,
  createContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { createSessionStore, initSessionStore } from "@/stores/session-store";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

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
    return (
      <div className="flex justify-center items-center h-screen">
        <Button variant={"outline"} disabled>
          <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
          Loading...
        </Button>
      </div>
    );
  }

  return (
    <SessionStoreContext.Provider value={storeRef.current}>
      {children}
    </SessionStoreContext.Provider>
  );
};
