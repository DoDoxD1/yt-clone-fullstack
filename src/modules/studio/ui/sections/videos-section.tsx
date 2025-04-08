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
import { VideoThumbnail } from "@/modules/videos/ui/components/video-thumbnail";

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

  function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Format with leading zeros
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    // If less than an hour, return mm:ss format
    if (hours === 0) {
      return `${formattedMinutes}:${formattedSeconds}`;
    }

    // Otherwise, return hh:mm:ss format
    const formattedHours = String(hours).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">Video</TableHead>
              <TableHead className="text-right">Visibility</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="text-right">Category</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right pr-6">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allVideos.map(
              (
                video: {
                  title: string;
                  duration: number;
                  thumbnail: string;
                  videoPreview: string;
                  _id: string;
                  description: string;
                  isPublished: boolean;
                  createdAt: string;
                  category: string;
                  views: number;
                },
                index
              ) => {
                const {
                  title,
                  duration,
                  thumbnail,
                  videoPreview,
                  _id,
                  description,
                  isPublished,
                  createdAt,
                  category,
                  views,
                } = video;
                return (
                  <Link
                    href={`/studio/videos/${_id}`}
                    key={_id || index}
                    legacyBehavior
                  >
                    <TableRow className="cursor-pointer">
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="relative aspect-video w-36 shrink-0">
                            <VideoThumbnail
                              thumbnail={thumbnail}
                              videoPreview={videoPreview}
                              duration={formatDuration(Math.trunc(duration))}
                            />
                          </div>
                          <div className="flex flex-col overflow-hidden gap-y-1">
                            <span className="text-sm line-clamp-1">
                              {title}
                            </span>
                            <span className="text-xs text-muted-foreground line-clamp-1">
                              {description}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {isPublished ? "Published" : "Not Published"}
                      </TableCell>
                      <TableCell className="text-right">
                        {createdAt.split("T")[0]}
                      </TableCell>
                      <TableCell className="text-right">{category}</TableCell>
                      <TableCell className="text-right">{views}</TableCell>
                      <TableCell className="text-right pr-6">{0}</TableCell>
                    </TableRow>
                  </Link>
                );
              }
            )}
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
