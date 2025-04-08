import Image from "next/image";

export const VideoThumbnail = ({ thumbnail }: { thumbnail: string }) => {
  {
    console.log(thumbnail);
  }
  return (
    <div className="relative">
      {/* Thumbnail wrapper */}

      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <Image
          src={thumbnail != "x" ? thumbnail : "/placeholder.svg"}
          alt="Thumbnail"
          fill
          className="size-full object-cover"
        />
      </div>
      {/* Video duration box */}
      {/* TODO: Add video duration box */}
    </div>
  );
};
