import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SiteBar } from "./components/shared/SiteBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SiteBar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
