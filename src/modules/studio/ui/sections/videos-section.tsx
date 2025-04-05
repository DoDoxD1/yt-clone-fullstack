"use client";
import InfiniteScroll from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import { fetchUserVideos } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

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
      fetchUserVideos({
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
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="text-right pr-6">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allVideos.map((video, index) => (
              <Link
                href={`/studio/videos/${video._id}`}
                key={video._id || index}
                legacyBehavior
              >
                <TableRow className="cursor-pointer">
                  <TableCell>{video.title}</TableCell>
                  <TableCell>Visibility</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell className="text-right">Views</TableCell>
                  <TableCell className="text-right">Comments</TableCell>
                  <TableCell className="text-right pr-6">Likes</TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Videos:{JSON.stringify(data)} */}

      <InfiniteScroll
        isManual={false}
        hasNextPage={data.pagination.hasMore || false}
        isFetchingNextPage={isLoading}
        fetchNextPage={handleNext}
      />
    </div>
  );
}
