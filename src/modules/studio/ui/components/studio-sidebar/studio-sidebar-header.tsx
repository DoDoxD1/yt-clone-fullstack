"use client";
import {
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/user-avatar";
import { fetchUser } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function StudioSidebarHeader() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["get-user"],
    queryFn: fetchUser,
  });
  const { state } = useSidebar();
  if (isLoading) {
    return (
      <SidebarHeader className="flex items-center justify-center pb-4">
        <Skeleton className="size-[112px] rounded-full" />
        <div className="flex flex-col items-center mt-2 gap-y-2">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </SidebarHeader>
    );
  }
  if (state == "collapsed") {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={"Your profile"} asChild>
          <Link href="/users/current">
            <UserAvatar
              avatarUrl={user.avatar}
              name={user.fullName ?? "User"}
              size="xs"
            />
            <span className="text-sm">Your profile</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }
  return (
    <SidebarHeader className="flex items-center justify-center pb-4">
      <Link href="/users/current">
        <UserAvatar
          avatarUrl={user?.avatar}
          name={user?.fullName ?? "user"}
          className="size-[112px] hover:opacity-80 transition-opacity"
        />
      </Link>
      <div className="flex flex-col items-center mt-2 gap-y-1">
        <p className="text-sm font-medium">Your profile</p>
        <p className="text-xs text-muted-foreground">{user?.fullName}</p>
      </div>
    </SidebarHeader>
  );
}
