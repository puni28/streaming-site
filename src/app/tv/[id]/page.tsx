"use client"; // Client Component for fetching API data dynamically

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function TvDetails() {
  const { id } = useParams(); // Get TV show ID from URL
  const [show, setShow] = useState<any>(null);

  useEffect(() => {
    async function fetchTvDetails() {
      if (!id) return;
      try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`);
        const data = await res.json();
        setShow(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error fetching data:", err.message);
        } else {
          console.error("Unknown error occurred:", err);
        }
      }
      
    }
    fetchTvDetails();
  }, [id]);

  if (!show) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold">{show.name}</h1>
      <p className="mt-2 text-gray-400">{show.first_air_date}</p>

      <div className="flex gap-6 mt-6">
        {/* TV Show Poster */}
        <Image
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
          alt={show.name}
          width={300}
          height={450}
          className="rounded-lg"
        />

        {/* TV Show Info */}
        <div>
          <p className="text-lg">{show.overview}</p>
          <p className="mt-4">Genres: {show.genres?.map((g: any) => g.name).join(", ")}</p>
        </div>
      </div>

      {/* Embedded Vidsrc Player */}
      <h2 className="text-2xl font-semibold mt-10">Watch Now</h2>
      <iframe
        src={`https://vidsrc.xyz/embed/tv?tmdb=${id}&season=1&episode=1`}
        allowFullScreen
        className="w-full h-[500px] mt-4 rounded-lg"
      />
    </div>
  );
}
