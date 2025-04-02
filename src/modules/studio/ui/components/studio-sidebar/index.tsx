import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React from "react";
import Link from "next/link";
import { LogOutIcon, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import StudioSidebarHeader from "./studio-sidebar-header";
interface UserProps {
  user: {
    _id: string;
    watchHistory: string[];
    username: string;
    email: string;
    fullName: string;
    avatar: string;
    coverImage: string;
    admin: boolean;
  };
  isLoading: any;
}
export default function StudioSidebar({ user, isLoading }: UserProps) {
  return (
    <Sidebar className="pt-16 z-40" collapsible="icon">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarMenu>
            <StudioSidebarHeader />
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={usePathname() === "/studio"}
                tooltip="Content"
                asChild
              >
                <Link href="/studio">
                  <VideoIcon className="size-5" />
                  <span className="text-sm">Content</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <Separator />
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Exit Studio" asChild>
                <Link href="/">
                  <LogOutIcon className="size-5" />
                  <span className="text-sm">Exit Studio</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
