import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] flex flex-col items-center justify-center text-center">
        <Image
          src="/public/hero-banner.jpg" // Replace with actual image
          alt="Welcome"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
        <h1 className="text-5xl font-bold">Welcome to StreamFlix</h1>
        <p className="text-lg mt-2">Your favorite movies and TV shows, anytime.</p>

        {/* Button to Home Page */}
        <Link href="/home">
          <button className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Explore Now
          </button>
        </Link>
      </div>
    </div>
  );
}
