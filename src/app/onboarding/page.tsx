import { WorkspaceOnboarding } from "@/lib/features/workspace/components/form/workspace-onboarding";

export default function OnboardingPage() {
  return (
    <div>
      <h1 className="text-4xl mt-2 font-bold text-center">
        Welcome to Ruker platform
      </h1>
      <div className="flex items-center justify-center mt-5">
        <WorkspaceOnboarding />
      </div>
    </div>
  );
}
