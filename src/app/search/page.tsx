"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
}

interface AnimeItem {
  id: string;
  title: string;
  image: string;
}

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!TMDB_API_KEY) {
  console.error("Missing TMDB API Key! Make sure NEXT_PUBLIC_TMDB_API_KEY is set in your .env file.");
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [tvShows, setTvShows] = useState<MediaItem[]>([]);
  const [anime, setAnime] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;

    async function fetchResults() {
      if (!TMDB_API_KEY) {
        console.error("TMDB API Key not found");
        setError("Missing API key. Please check your environment variables.");
        return;
      }

      setLoading(true);

      try {
        const [movieRes, tvRes, animeRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`),
          fetch(`https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${query}`),
          fetch(`https://api.consumet.org/anime/gogoanime/search?keyw=${query}`)
        ]);

        if (!movieRes.ok || !tvRes.ok || !animeRes.ok) {
          throw new Error(`API request failed`);
        }

        const [movieData, tvData, animeData] = await Promise.all([
          movieRes.json(),
          tvRes.json(),
          animeRes.json()
        ]);

        setMovies(movieData.results || []);
        setTvShows(tvData.results || []);
        setAnime(animeData.results || []);
      } catch (err: any) {
        console.error("Error fetching search results:", err);
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  if (loading) return <p className="text-center text-white">Searching...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Search Results for "{query}"</h2>

      {/* Movies Section */}
      <h3 className="text-2xl font-semibold mt-6">Movies</h3>
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

      {/* TV Shows Section */}
      <h3 className="text-2xl font-semibold mt-6">TV Shows</h3>
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

      {/* Anime Section */}
      <h3 className="text-2xl font-semibold mt-6">Anime</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {anime.map((item) => (
          <Link href={`/anime/${item.id}`} key={item.id}>
            <div className="bg-gray-800 p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform">
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={300}
                className="rounded-md"
              />
              <p className="mt-2 text-center">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
