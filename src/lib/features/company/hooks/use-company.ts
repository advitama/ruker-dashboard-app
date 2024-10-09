"use client";

import { useStore } from "zustand";
import { useEffect, useContext } from "react";
import { CompanyStoreContext } from "@/app/providers/company";
import type { CompanyStore } from "@/lib/features/company/stores/company-store";

export const useCompany = <T>(selector: (store: CompanyStore) => T): T => {
  const companyStoreContext = useContext(CompanyStoreContext);

  if (!companyStoreContext) {
    throw new Error(`useCompany must be used within CompanyStoreProvider`);
  }

  const store = useStore(companyStoreContext, selector);

  useEffect(() => {
    const loadCompany = companyStoreContext.getState().loadCompanyFromStorage;
    loadCompany(); 
  }, [companyStoreContext]);

  return store;
};
