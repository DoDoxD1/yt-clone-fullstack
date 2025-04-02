"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import StudioNavbar from "../components/studio-navbar";
import StudioSidebar from "../components/studio-sidebar";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/lib/api";

interface LayoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: LayoutProps) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["get-user"],
    queryFn: fetchUser,
  });
  return (
    <SidebarProvider>
      <div className="w-full">
        <StudioNavbar user={user?.data} isLoading={isLoading} />
        <div className="flex min-h-screen pt-[4rem] ">
          <StudioSidebar user={user?.data} isLoading={isLoading} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
