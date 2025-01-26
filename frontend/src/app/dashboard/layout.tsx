import { DynamicBreadcrumb } from "@/components/dashboard/dynamic-breadcrumb";
import { AppSidebar } from "@/components/dashboard/sidebar";
import { ToggleThemeButton } from "@/components/toggle-theme-button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <ToggleThemeButton className="h-7 w-7" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrumb />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-8 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
