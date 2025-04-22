"use client";
import { fetchUserVideo } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Video {
  id: string;
}

export default function VideoView({ id }: Video) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-video"],
    queryFn: () => fetchUserVideo(id),
  });

  if (isLoading) return <div>Loading..</div>;
  if (isError) return <div>Errror: {error.stack}</div>;

  return (
    <div className="px-4 pt-2.5 max-w-screen-lg">
      Data:{JSON.stringify(data.owner.username)}
    </div>
  );
}
