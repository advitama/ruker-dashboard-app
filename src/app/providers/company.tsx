"use client";

import {
  type ReactNode,
  createContext,
  useRef,
  useState,
  useEffect,
} from "react";

import {
  createCompanyStore,
  initCompanyStore,
} from "@/features/company/stores/company-store";

export type CompanyStoreApi = ReturnType<typeof createCompanyStore>;

export const CompanyStoreContext = createContext<CompanyStoreApi | undefined>(
  undefined
);

export interface CompanyStoreProviderProps {
  children: ReactNode;
}

export const CompanyStoreProvider = ({
  children,
}: CompanyStoreProviderProps) => {
  const storeRef = useRef<CompanyStoreApi | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeStore = async () => {
      const initialState = await initCompanyStore();
      storeRef.current = createCompanyStore(initialState);
      setIsInitialized(true);
    };

    initializeStore();
  }, []);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <CompanyStoreContext.Provider value={storeRef.current}>
      {children}
    </CompanyStoreContext.Provider>
  );
};
