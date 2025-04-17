"use client";
import React from "react";
import ReactPlayer from "react-player";

interface ReelPlayerProps {
  url: string;
  isActive: boolean;
}

const ReelPlayer: React.FC<ReelPlayerProps> = ({ url, isActive }) => {
  //   const playerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-screen w-[350px] flex items-center justify-center">
      <ReactPlayer
        url={url}
        playing={isActive}
        loop
        controls={false}
        width="100%"
        height="100%"
        muted
      />
    </div>
  );
};

export default ReelPlayer;
