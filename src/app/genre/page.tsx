"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function GenrePage() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        const data = await res.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }

    fetchGenres();
  }, []);

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
