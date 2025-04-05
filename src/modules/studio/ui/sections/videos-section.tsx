"use client";
import InfiniteScroll from "@/components/infinite-scroll";
import { fetchUserVideos } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function VideosSection() {
  const { data: data, isLoading } = useQuery({
    queryKey: ["get-user-videos"],
    queryFn: fetchUserVideos,
    retry: false,
    refetchOnWindowFocus: false,
  });
  if (isLoading) return null;

  return (
    <div>
      Videos:{JSON.stringify(data)}
      <InfiniteScroll
        hasNextPage={data}
        isFetchingNextPage={isLoading}
        fetchNextPage={fetchUserVideos}
      />
    </div>
  );
}
