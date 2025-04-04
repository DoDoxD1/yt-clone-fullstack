"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AuthButton from "@/modules/auth/ui/components/auth-button";
import Image from "next/image";
import Link from "next/link";
import UserButton from "@/modules/auth/ui/components/user-button";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/lib/api";
import StudioUploadModal from "../studio-upload-modal";

export default function StudioNavbar() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["get-user"],
    queryFn: fetchUser,
  });
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50 border-b shadow-md">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and logo */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />
          <Link href="/studio">
            <div className="flex p-4 items-center gap-1">
              <Image src="/logo.svg" alt="Logo" height={32} width={32} />
              <p className="text-xl font-semibold tracking-tight">Studio</p>
            </div>
          </Link>
        </div>

        <div className="flex-1" />

        <div className="flex-shrink-0 items-center flex gap-4">
          <StudioUploadModal />
          {isLoading ? null : !user ? (
            <AuthButton />
          ) : (
            <UserButton user={user} />
          )}
        </div>
      </div>
    </nav>
  );
}
