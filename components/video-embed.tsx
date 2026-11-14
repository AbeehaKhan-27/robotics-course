"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { getEmbedUrl } from "@/lib/video";

interface VideoEmbedProps {
  url: string;
  title: string;
}

export const VideoEmbed = ({ url, title }: VideoEmbedProps) => {
  const [loaded, setLoaded] = useState(false);
  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    return (
      <p className="text-sm text-muted-foreground">
        This video link isn&apos;t supported. <a href={url} target="_blank" className="underline">Open it directly</a>.
      </p>
    );
  }

  return (
    <div className="relative aspect-video rounded-md overflow-hidden bg-slate-800">
      {loaded ? (
        <iframe
          src={`${embedUrl}?autoplay=1`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white hover:opacity-80 transition"
        >
          <Play className="h-10 w-10" />
          <span className="text-sm">Click to load video</span>
        </button>
      )}
    </div>
  );
};