"use client";

import { useParams } from "next/navigation";

export default function WatchAnime() {
  const { episodeId } = useParams(); // Get episode ID from URL

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Watch Anime</h1>

      {/* Embedded GoGoAnime Player */}
      <iframe
        src={`https://gogoanime.consumet.stream/vidcdn/watch/${episodeId}`}
        allowFullScreen
        className="w-full h-[500px] rounded-lg"
      />

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Back to Episodes
      </button>
    </div>
  );
}
