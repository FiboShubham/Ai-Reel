"use client";

import React, { useEffect, useState } from "react";
import ReelPlayer from "./ReelPlayer";
import GenerateReelForm from "./GenerateReelForm";

const initialVideos = [
  { id: 1, url: "https://www.youtube.com/shorts/FIZI3k7mTvA" },
  { id: 2, url: "https://www.youtube.com/shorts/sPGyjDwgkgU" },
  { id: 3, url: "https://www.youtube.com/shorts/c7Q2D91EA2k" },
  { id: 4, url: "https://www.youtube.com/shorts/FIZI3k7mTvA" },
  { id: 5, url: "https://www.youtube.com/shorts/FIZI3k7mTvA" },
];

const ReelFeed: React.FC = () => {
  const [videos, setVideos] = useState(initialVideos);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const screenHeight = window.innerHeight;
    const index = Math.round(scrollY / screenHeight);
    setActiveIndex(index);
  };

  const handleAddVideo = (url: string) => {
    setVideos((prev) => [...prev, { id: Date.now(), url }]);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <GenerateReelForm onAdd={handleAddVideo} />
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll no-scrollbar bg-black">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="snap-start h-screen flex justify-center items-center"
          >
            <ReelPlayer url={video.url} isActive={index === activeIndex} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ReelFeed;
