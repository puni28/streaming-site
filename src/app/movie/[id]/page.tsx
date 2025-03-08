"use client"; // Client Component for fetching API data dynamically

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function MovieDetails() {
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      if (!id) return;
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <p className="mt-2 text-gray-400">{movie.release_date}</p>

      <div className="flex gap-6 mt-6">
        {/* Movie Poster */}
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-lg"
        />

        {/* Movie Info */}
        <div>
          <p className="text-lg">{movie.overview}</p>
          <p className="mt-4">Genres: {movie.genres?.map((g: any) => g.name).join(", ")}</p>
        </div>
      </div>

      {/* Embedded Vidsrc Player */}
      <h2 className="text-2xl font-semibold mt-10">Watch Now</h2>
      <iframe
  src={`https://vidsrc.xyz/embed/movie?tmdb=${id}`} // Adjust for anime if needed
  allowFullScreen
  className="w-full h-[500px] rounded-lg"
  
></iframe>

    </div>
  );
}
