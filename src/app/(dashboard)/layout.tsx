// import components
import { SidebarLayout } from "@/components/ui/sidebar";
import { AppNavbar } from "@/components/navigation/app-navbar";
import { AppSidebar } from "@/components/navigation/app-sidebar";

// Import providers
import { SessionStoreProvider } from "@/app/providers/session";
import { CompanyStoreProvider } from "@/app/providers/company";

export default async function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cookies } = await import("next/headers");

  return (
    <SessionStoreProvider>
      <CompanyStoreProvider>
        <SidebarLayout
          defaultOpen={cookies().get("sidebar:state")?.value === "true"}
        >
          <AppSidebar />
          <main className="relative flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
            <AppNavbar />
            <div className="h-full rounded-md p-2">{children}</div>
          </main>
        </SidebarLayout>
      </CompanyStoreProvider>
    </SessionStoreProvider>
  );
}
