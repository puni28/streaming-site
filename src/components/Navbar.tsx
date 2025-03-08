"use client";

import { useState } from "react";
import { FaSearch, FaUser, FaFilm, FaTv, FaThList, FaHome, FaDragon } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <nav className="w-full bg-gray-900 text-white p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-red-500">StreamFlix</h1>

      <div className="flex gap-6">
        <Link href="/" className="flex items-center gap-2 hover:text-gray-300"><FaHome /> Home</Link>
        <Link href="/movies" className="flex items-center gap-2 hover:text-gray-300"><FaFilm /> Movies</Link>
        <Link href="/tvshows" className="flex items-center gap-2 hover:text-gray-300"><FaTv /> TV Shows</Link>
        <Link href="/anime" className="flex items-center gap-2 hover:text-gray-300"><FaDragon /> Anime</Link>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center bg-gray-700 px-3 py-1 rounded-md">
        <input
          type="text"
          className="bg-transparent text-white outline-none w-64"
          placeholder="Search movies, TV shows, anime..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">
          <FaSearch className="ml-2 text-gray-400 cursor-pointer" />
        </button>
      </form>

      <FaUser className="text-xl cursor-pointer" />
    </nav>
  );
}
