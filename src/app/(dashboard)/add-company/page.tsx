import { AddCompanyForm } from "@/lib/features/company/components/form/add-company";

export default function AddCompanyPage() {
  return (
    <div>
      <h1 className="text-4xl mt-2 font-bold">Add a new company</h1>
      <div className="flex items-center justify-center">
        <AddCompanyForm />
      </div>
    </div>
  );
}
