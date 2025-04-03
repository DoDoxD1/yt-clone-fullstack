"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SearchInput from "./search-input";
import AuthButton from "@/modules/auth/ui/components/auth-button";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/lib/api";
import UserButton from "@/modules/auth/ui/components/user-button";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeNavbar() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["get-user"],
    queryFn: fetchUser,
    retry: false, // Don't retry failed requests
    refetchOnWindowFocus: false,
  });
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and logo */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />
          <Link href="/">
            <div className="flex p-4 items-center gap-1">
              <Image src="/logo.svg" alt="Logo" height={32} width={32} />
              <p className="text-xl font-semibold tracking-tight">NewTube</p>
            </div>
          </Link>
        </div>

        {/* Search Bar */}

        <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
          <SearchInput />
        </div>

        <div className="flex-shrink-0 items-center flex gap-4">
          {isLoading ? (
            <Skeleton className="w-12 h-12 rounded-full" />
          ) : !user ? (
            <AuthButton />
          ) : (
            <UserButton user={user} />
          )}
        </div>
      </div>
    </nav>
  );
}
