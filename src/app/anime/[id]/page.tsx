"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AnimeDetails() {
  const { id } = useParams(); // Get anime ID from URL
  const [anime, setAnime] = useState<any>(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnimeDetails() {
      try {
        const res = await fetch(`https://gogoanime.consumet.stream/anime-details/${id}`);

        if (!res.ok) {
          throw new Error(`API request failed: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        setAnime(data);
        setEpisodes(data.episodesList);
      } catch (error: any) {
        console.error("Error fetching anime details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchAnimeDetails();
    }
  }, [id]);

  if (loading) return <p className="text-center text-white">Loading anime details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!anime) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{anime.animeTitle}</h1>
      <Image
        src={anime.animeImg}
        alt={anime.animeTitle}
        width={300}
        height={450}
        className="rounded-lg"
      />
      <p className="mt-4">{anime.synopsis}</p>

      {/* Episode List */}
      <h2 className="text-2xl font-bold mt-6">Episodes</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {episodes.map((ep) => (
          <Link href={`/anime/${id}/watch/${ep.episodeId}`} key={ep.episodeId}>
            <div className="bg-gray-800 p-2 rounded-lg cursor-pointer hover:scale-105 transition-transform text-center">
              Episode {ep.episodeNum}
            </div>
          </Link>
        ))}
      </div>

      {/* Back Button */}
      <Link href="/anime">
        <button className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Back to Anime List
        </button>
      </Link>
    </div>
  );
}
