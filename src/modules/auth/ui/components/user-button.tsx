import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ClapperboardIcon, LogOutIcon } from "lucide-react";
import { logoutUser } from "@/lib/api";
import UserAvatar from "@/components/user-avatar";

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
        <UserAvatar
          avatarUrl={user?.avatar}
          name={user?.fullName ?? "user"}
          className="size-md hover:opacity-80 transition-opacity"
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
