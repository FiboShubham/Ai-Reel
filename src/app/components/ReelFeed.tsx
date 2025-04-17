"use client";
import React, { useState, useEffect } from "react";
import ReelPlayer from "./ReelPlayer";

const sampleVideos = [
  { id: 1, url: "https://www.youtube.com/shorts/FIZI3k7mTvA" },
  { id: 2, url: "https://www.youtube.com/shorts/sPGyjDwgkgU" },
  { id: 3, url: "https://www.youtube.com/shorts/c7Q2D91EA2k" },
];

const ReelFeed: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const screenHeight = window.innerHeight;
    const index = Math.round(scrollY / screenHeight);
    setActiveIndex(index);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll no-scrollbar">
      {sampleVideos.map((video, index) => (
        <div
          key={video.id}
          className="snap-start h-screen flex justify-center items-center"
        >
          <ReelPlayer url={video.url} isActive={index === activeIndex} />
        </div>
      ))}
    </div>
  );
};

export default ReelFeed;
