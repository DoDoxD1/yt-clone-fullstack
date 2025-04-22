"use client";
import InfiniteScroll from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import { fetchUserVideos } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
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
import { GlobeIcon, LockIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function VideosSection() {
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [allVideos, setAllVideos] = useState<any[]>([]);
  // Add state to track client-side mount
  const [isMounted, setIsMounted] = useState(false);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-user-videos", limit, sortOrder, currentCursor],
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
  // if (isLoading && allVideos.length === 0) return <div>Loading...</div>;
  if (isLoading) {
    return (
      <>
        <div className="border-y">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6 w-[510px]">Video</TableHead>
                <TableHead className="">Visibility</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Category</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right pr-6">Likes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                // <TableRow key={index}>
                //   <TableCell className="pl-6">
                //     <div className="flex items-center gap-4">
                //       <Skeleton className="h-20 w-36" />
                //       <div className="flex flex-col gap-2">
                //         <Skeleton className="h-4 w-[100px]" />
                //         <Skeleton className="h-3 w-[150px]" />
                //       </div>
                //     </div>
                //   </TableCell>
                //   <TableCell className="flex items-center mt-7">
                //     <Skeleton className="h-4 w-20" />
                //   </TableCell>
                //   <TableCell className="">
                //     <Skeleton className="h-4 w-16" />
                //   </TableCell>
                //   <TableCell className="text-center">
                //     <Skeleton className="h-4 w-24" />
                //   </TableCell>
                //   <TableCell className="text-right">
                //     <Skeleton className="h-4 w-12" />
                //   </TableCell>
                //   <TableCell className="text-right">
                //     <Skeleton className="h-4 w-12" />
                //   </TableCell>
                // </TableRow>
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="relative aspect-video w-36 shrink-0">
                        <Skeleton className="h-20 w-36" />
                      </div>
                      <div className="flex flex-col overflow-hidden gap-y-1">
                        <span className="text-sm line-clamp-1">
                          <Skeleton className="h-4 w-[100px]" />
                        </span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          <Skeleton className="h-3 w-[150px]" />
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="flex items-center mt-7">
                    <Skeleton className="h-4 w-4" /> // Visibility
                  </TableCell>
                  <TableCell className="text-center text-sm truncate">
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell className="text-center">
                    {" "}
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell className="text-right">
                    {" "}
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    {" "}
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    );
  }
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
              <TableHead className="">Visibility</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Category</TableHead>
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
                      <TableCell className="flex items-center mt-7">
                        {isPublished ? (
                          <>
                            <GlobeIcon className="size-4 mr-2" />
                            {"Public"}
                          </>
                        ) : (
                          <>
                            <LockIcon className="size-4 mr-2" />
                            {"Private"}
                          </>
                        )}
                      </TableCell>
                      <TableCell className="text-center text-sm truncate">
                        {format(new Date(createdAt), "dd MMM yyyy")}
                      </TableCell>
                      <TableCell className="text-center">{category}</TableCell>
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
      <InfiniteScroll
        isManual={false}
        hasNextPage={data.pagination.hasMore || false}
        isFetchingNextPage={isLoading}
        fetchNextPage={handleNext}
      />
    </div>
  );
}
