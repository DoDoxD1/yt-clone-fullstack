"use client";
import { fetchUserVideo } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FormSection } from "../sections/form-section";

interface Video {
  id: string;
}

export default function VideoView({ id }: Video) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-video-" + id],
    queryFn: () => fetchUserVideo(id),
  });

  if (isLoading) return <div>Loading..</div>;
  if (isError) return <div>Error: {String(error)}</div>;
  if (!data) return <div>No video data found</div>;

  return (
    <div className="px-4 pt-2.5 max-w-screen-xl">
      <FormSection
        videoId={data._id || ""}
        videoFile={data.videoFile || ""}
        title={data.title || ""}
        description={data.description || ""}
        duration={data.duration || 0}
        views={data.views || 0}
        videoPreview={data.videoPreview || ""}
        thumbnail={data.thumbnail || ""}
        category={data.category || ""}
        isPublished={data.isPublished || false}
        createdAt={data.createdAt || ""}
        owner={
          data.owner || { _id: "", username: "", fullName: "", avatar: "" }
        }
      />
    </div>
  );
}
