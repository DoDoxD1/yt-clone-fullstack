"use client";
import InfiniteScroll from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import { fetchVideos } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

export default function VideosSection() {
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [allVideos, setAllVideos] = useState<any[]>([]);
  // Add state to track client-side mount
  const [isMounted, setIsMounted] = useState(false);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts", limit, sortOrder, currentCursor],
    queryFn: () =>
      fetchVideos({
        cursor: currentCursor || undefined,
        limit,
        sortOrder,
      }),
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      // Only append new videos if we have a cursor (not first load)
      if (currentCursor) {
        setAllVideos((prev) => [...prev, ...data.data]);
      } else {
        // First load or reset
        setAllVideos(data.data);
      }
    }
  }, [data]);

  const handleNext = (): void => {
    if (data?.pagination.hasMore && data?.pagination.nextCursor) {
      setCurrentCursor(data.pagination.nextCursor);
      refetch();
    }
  };

  if (!isMounted) return null;
  if (isLoading && allVideos.length === 0) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;
  if (!data) return null;

  return (
    <div>
      {/* Videos:{JSON.stringify(data)} */}
      {allVideos.map((video, index) => (
        <div key={video.id || index} className="video-item">
          {/* Display your video content here */}
          {JSON.stringify(video)}
        </div>
      ))}
      <InfiniteScroll
        isManual={false}
        hasNextPage={data.pagination.hasMore || false}
        isFetchingNextPage={isLoading}
        fetchNextPage={handleNext}
      />
    </div>
  );
}
