import { CreateWorkspace } from "@/lib/features/company/components/form/new-company";

export default function NewWorkspacePage() {
  return (
    <div>
      <h1 className="text-4xl mt-2 font-bold">New Workspace</h1>
      <div className="flex items-center justify-center">
        <CreateWorkspace />
      </div>
    </div>
  );
}
