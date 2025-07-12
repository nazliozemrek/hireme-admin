'use client'

import { useRouter } from "next/navigation";

export default function HomePage () {
  const router = useRouter();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-700">
      <h1 className="text-4xl font-bold text-gray-950 mb-4">Welcome to Hire-Me</h1>
      <p className="text-white-600">Login to your dashboard</p>
      <button
        title="login"
        onClick={() => router.push("/login")}
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >

          Login
        </button>
    </main>
  );
}