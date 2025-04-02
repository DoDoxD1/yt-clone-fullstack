import React from "react";

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
}

export default function StudioSidebarHeader() {
  return <div>studio-sidebar-header</div>;
}
