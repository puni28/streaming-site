"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface TVShow {
  id: number;
  name: string;
  poster_path: string;
}

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  console.error("Missing TMDB API Key! Make sure NEXT_PUBLIC_TMDB_API_KEY is set in your .env file.");
}

export default function TVShowsPage() {
  const [tvShows, setTvShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTVShows() {
      if (!API_KEY) {
        console.error("TMDB API Key not found");
        setError("Missing API key. Please check your environment variables.");
        return;
      }

      try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`);

        if (!res.ok) {
          throw new Error(`API request failed: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        setTvShows(data.results || []);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error fetching data:", err.message);
        } else {
          console.error("Unknown error occurred:", err);
        }
      }
       finally {
        setLoading(false);
      }
    }

    fetchTVShows();
  }, []);

  if (loading) return <p className="text-center text-white">Loading TV shows...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Popular TV Shows</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {tvShows.map((show) => (
          <Link href={`/tv/${show.id}`} key={show.id}>
            <div className="bg-gray-800 p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform">
              <Image
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
                width={200}
                height={300}
                className="rounded-md"
              />
              <p className="mt-2 text-center">{show.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
