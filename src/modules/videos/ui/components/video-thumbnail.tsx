import Image from "next/image";
import { useState } from "react";

export const VideoThumbnail = ({
  thumbnail,
  videoPreview,
  duration,
}: {
  thumbnail: string;
  videoPreview?: string;
  duration: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail wrapper */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <Image
          src={thumbnail != "x" ? thumbnail : "/placeholder.svg"}
          alt="Thumbnail"
          fill
          className="size-full object-cover"
        />
        {/* Video preview overlay */}
        {isHovered && videoPreview && (
          <div className="absolute inset-0 transition-opacity duration-300">
            <video
              src={videoPreview}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        )}
      </div>
      {/* Video duration box */}
      <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white tex-xs font-medium">
        {duration || 0}
      </div>
      {/* TODO: Add video duration box */}
    </div>
  );
};
