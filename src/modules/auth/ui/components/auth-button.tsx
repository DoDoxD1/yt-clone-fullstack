import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AuthButton() {
  return (
    // TODO: Add different auth states
    <Button
      variant={"outline"}
      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none"
    >
      <Link href={"/sign-in"} className="flex items-center gap-2">
        <UserCircleIcon />
        Sign In
      </Link>
    </Button>
  );
}
