import VideoView from "@/modules/studio/ui/views/video-view";
import React from "react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ videoId: string }>;
}

export default async function page({ params }: PageProps) {
  const { videoId } = await params;

  return (
    <div>
      <VideoView id={videoId} />
    </div>
  );
}
