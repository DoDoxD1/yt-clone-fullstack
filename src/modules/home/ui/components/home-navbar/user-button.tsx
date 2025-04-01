import React from "react";

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

export default function UserButton({ user, onClick }: UserButtonProps) {
  return <div>{user.fullName}</div>;
}
