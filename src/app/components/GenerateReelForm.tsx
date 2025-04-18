"use client";

import { useState } from "react";

export default function GenerateReelForm({ onAdd }: { onAdd: (url: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("Lionel Messi");
  const [sport, setSport] = useState("Football");

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/generate-reel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        athlete: {
          name,
          sport,
          teams: ["Barcelona", "PSG"],
          careerSpan: "2004–Present",
          achievements: ["7 Ballon d'Or", "World Cup Winner"],
          knownFor: "Dribbling and playmaking",
        },
      }),
    });

    const data = await res.json();
    if (data.videoUrl) {
      onAdd(data.videoUrl);
    }
    setLoading(false);
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white text-black rounded-full px-6 py-2 shadow-lg flex gap-3 items-center">
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Generate New Reel"}
      </button>
    </div>
  );
}
