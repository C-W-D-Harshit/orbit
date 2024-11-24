"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DynamicBreadcrumb } from "../dynamic-breadcrumb";
import { usePathname } from "next/navigation";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <>{children}</>;
  }

  if (pathname.startsWith("/auth")) {
    return <>{children}</>;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden overflow-y-auto">
        <header className="flex h-16 shrink-0 items-center gap-2 sticky top-1">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrumb />
          </div>
        </header>
        <main className="flex-1 flex flex-col p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
