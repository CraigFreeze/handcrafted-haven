"use client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ArtisanDashboard() {
  const router = useRouter();

  useEffect(() => {
    // This effect is only for client-side navigation fallback
    // Server-side session/role checks are still required for security
    (async () => {
      const session: any = await getServerSession(authOptions);
      if (!session) {
        router.replace("/login");
      } else if (session.user.role !== "artisan") {
        router.replace("/unauthorized");
      }
    })();
  }, [router]);

  // Sign out simply redirects to login (clear session/cookies in real app)
  function handleSignOut() {
    router.replace("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-indigo-100">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">Artisan Dashboard</h1>
        <p className="text-gray-600 mb-2">Welcome, artisan!</p>
        <p className="mb-4">Only artisans can see this page.</p>
        {/* Add more artisan-specific content here */}
        <button
          onClick={handleSignOut}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded transition"
        >
          Sign Out
        </button>
      </div>
    </main>
  );
}
