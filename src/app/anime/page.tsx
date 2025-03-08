"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Anime {
  animeId: string;
  animeTitle: string;
  animeImg: string;
  episodeId: string;
}

export default function AnimePage() {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnime() {
      const API_URLS = [
        "https://api.consumet.org/anime/gogoanime/recent-release",
        "https://gogoanime-api.vercel.app/recent-release"
      ];

      let success = false;
      for (const url of API_URLS) {
        try {
          console.log(`Fetching anime from ${url}...`);
          const res = await fetch(url);

          if (!res.ok) {
            throw new Error(`API request failed: ${res.status} ${res.statusText}`);
          }

          const data: Anime[] = await res.json();
          console.log("API Response:", data);

          if (!data || data.length === 0) {
            throw new Error("No anime data found");
          }

          setAnime(data);
          success = true;
          break; // Stop trying other URLs if one works
        } catch (err) {
            if (err instanceof Error) {
              console.error("Error fetching data:", err.message);
            } else {
              console.error("Unknown error occurred:", err);
            }
          }
          
      }

      if (!success) {
        setError("Failed to load anime. API may be down.");
      }
      setLoading(false);
    }

    fetchAnime();
  }, []);

  if (loading) return <p className="text-center text-white">Loading anime...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Trending Anime</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {anime.map((item) => (
          <Link href={`/anime/${item.animeId}`} key={item.animeId}>
            <div className="bg-gray-800 p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform">
              <Image
                src={item.animeImg}
                alt={item.animeTitle}
                width={200}
                height={300}
                className="rounded-md"
              />
              <p className="mt-2 text-center">{item.animeTitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
