"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Genre {
  id: number;
  name: string;
}

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  console.error("Missing TMDB API Key! Make sure NEXT_PUBLIC_TMDB_API_KEY is set in your .env file.");
}

export default function GenrePage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);

        if (!res.ok) {
          throw new Error(`API request failed: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        if (!data.genres) throw new Error("No genres found!");

        setGenres(data.genres);
      } catch (error: any) {
        console.error("Error fetching genres:", error);
        setError("Failed to load genres. Try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchGenres();
  }, []);

  if (loading) return <p className="text-center text-white">Loading genres...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Movie Genres</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {genres.map((genre) => (
          <Link href={`/genre/${genre.id}`} key={genre.id}>
            <div className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform text-center">
              {genre.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
