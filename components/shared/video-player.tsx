"use client";

import { Button } from "@/components/ui/button";
import { useIsClient } from "@/hooks/is-client";
import { cn } from "@/lib/utils";
import { VideoResult } from "@/types/globals";
import { useCallback, useMemo, useState } from "react";
import ReactPlayer from "react-player/youtube";

const VideoPlayer = ({ videos }: { videos: VideoResult[] }) => {
  const hasMounted = useIsClient();
  const vids = useMemo(() => videos.slice(0, 5), [videos]);
  const [key, setKey] = useState(vids[0].key);

  const handleSetVideo = useCallback((key: string) => {
    setKey(key);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.25fr_0.75fr]">
      <div className="max-md:w-full">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${key}`}
          style={{ maxWidth: "100%" }}
          controls
        />
      </div>
      <div className="flex flex-wrap items-center gap-4 md:self-start">
        {vids.map((video, index) => (
          <Button
            key={video.id}
            variant={"outline"}
            className={cn(
              "border-primary-blue hover:bg-primary-blue hover:text-white",
              {
                "bg-primary-blue text-white": key === video.key,
                "bg-transparent text-primary-blue": key !== video.key,
              },
            )}
            onClick={() => handleSetVideo(video.key)}
          >
            Video {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};
export default VideoPlayer;
