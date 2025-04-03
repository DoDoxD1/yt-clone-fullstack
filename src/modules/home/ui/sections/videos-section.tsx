"use client";
import { fetchVideos } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function VideosSection() {
  const { data: videos, isLoading } = useQuery({
    queryKey: ["get-user-videos"],
    queryFn: fetchVideos,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return null;

  return <div>Videos:{JSON.stringify(videos)}</div>;
}
