"use client";

import { useContext } from "react";
import { useStore } from "zustand";
import { CompanyStoreContext } from "@/app/providers/company";
import type { CompanyStore } from "@/features/company/stores/company-store";

export const useCompany = <T>(selector: (store: CompanyStore) => T): T => {
  const companyStoreContext = useContext(CompanyStoreContext);

  if (!companyStoreContext) {
    throw new Error(`useCompanyStore must be used within CompanyStoreProvider`);
  }

  return useStore(companyStoreContext, selector);
};
