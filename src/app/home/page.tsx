"use client"; // Required for interactive components

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
}

export default function HomePage() {
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [tvShows, setTvShows] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMoviesAndTV() {
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      if (!API_KEY) {
        console.error("TMDB API Key not found");
        setError("Missing API key. Please check your environment variables.");
        return;
      }

      try {
        const [movieRes, tvRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`)
        ]);

        if (!movieRes.ok || !tvRes.ok) {
          throw new Error(`API request failed: ${movieRes.status} / ${tvRes.status}`);
        }

        const movieData = await movieRes.json();
        const tvData = await tvRes.json();

        setMovies(movieData.results || []);
        setTvShows(tvData.results || []);
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

    fetchMoviesAndTV();
  }, []);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Trending Movies */}
      <h2 className="text-3xl font-bold mb-6">Trending Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <div className="bg-gray-800 p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || "Movie Poster"}
                width={200}
                height={300}
                className="rounded-md"
              />
              <p className="mt-2 text-center">{movie.title}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Trending TV Shows */}
      <h2 className="text-3xl font-bold mt-10 mb-6">Trending TV Shows</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {tvShows.map((show) => (
          <Link href={`/tv/${show.id}`} key={show.id}>
            <div className="bg-gray-800 p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform">
              <Image
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name || "TV Show Poster"}
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
