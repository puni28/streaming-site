"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    async function fetchResults() {
      setLoading(true);

      try {
        // Fetch Movies
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
        );
        const movieData = await movieRes.json();
        setMovies(movieData.results || []);

        // Fetch TV Shows
        const tvRes = await fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${query}`
        );
        const tvData = await tvRes.json();
        setTvShows(tvData.results || []);

        // Fetch Anime (GoGoAnime API)
        const animeRes = await fetch(
          `https://api.consumet.org/anime/gogoanime/${query}`
        );
        const animeData = await animeRes.json();
        setAnime(animeData.results || []);

      } catch (error) {
        console.error("Error fetching search results:", error);
      }

      setLoading(false);
    }

    fetchResults();
  }, [query]);

  if (loading) return <p className="text-center text-white">Searching...</p>;

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
                alt={movie.title}
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

      {/* Anime Section */}
      <h3 className="text-2xl font-semibold mt-6">Anime</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {anime.map((item, index) => (
          <Link href={`/anime/${item.id}`} key={index}>
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

