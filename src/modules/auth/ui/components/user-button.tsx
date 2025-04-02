import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { ClapperboardIcon, LogOutIcon } from "lucide-react";
import { logoutUser } from "@/lib/api";

interface UserButtonProps {
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
  onClick?: (value: string | null) => void;
}

const handleSignOut = async () => {
  const response = await logoutUser();
  window.location.href = "/";
};

export default function UserButton({ user, onClick }: UserButtonProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="border-none outline-none focus:outline-none">
        <Image
          className="rounded-full cursor-pointer h-10 w-10"
          src={user.avatar}
          height={32}
          width={32}
          alt={user.fullName.slice(0, 1)}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <ClapperboardIcon className="size-4" />
            <Link href={"/studio"}>Studio</Link>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <LogOutIcon className="size-4" />
            <Link href={"/"} onClick={handleSignOut}>
              Sign out
            </Link>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
