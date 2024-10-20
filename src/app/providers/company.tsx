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
} from "@/lib/features/company/stores/company-store";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

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
    <CompanyStoreContext.Provider value={storeRef.current}>
      {children}
    </CompanyStoreContext.Provider>
  );
};
