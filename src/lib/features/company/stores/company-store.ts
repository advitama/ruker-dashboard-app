import { createStore } from "zustand/vanilla";
import type { Company } from "@/lib/features/company/types/company";

export type CompanyActions = {
  setCompany: (company: Company) => void;
};

export type CompanyStore = Company & CompanyActions;

export const initCompanyStore = async (): Promise<Company> => {
  return {
    id: 0,
    name: "",
    industry: "",
  };
};

export const defaultInitState: Company = {
  id: 0,
  name: "",
  industry: "",
};

export const createCompanyStore = (initState: Company = defaultInitState) => {
  return createStore<CompanyStore>()((set) => ({
    ...initState,
    setCompany: (company: Company) =>
      set(() => ({
        id: company.id,
        name: company.name,
        industry: company.industry,
      })),
  }));
};
