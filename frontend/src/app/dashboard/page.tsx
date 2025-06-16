"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const role = searchParams.get("role");
  const router = useRouter();

  // Sign out simply redirects to login (clear session/cookies in real app)
  function handleSignOut() {
    router.replace("/login");
  }

  useEffect(() => {
    if (!email) {
      router.replace("/login");
    }
  }, [email, router]);

  if (!email) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-indigo-100">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Welcome,</h1>
        <p className="text-xl font-semibold text-gray-800 mb-6">{email}</p>
        <div className="mb-4">
          <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">
            Role: {role}
          </span>
        </div>
        {role === "artisan" ? (
          <div className="mt-8 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 font-medium">
            <h2 className="text-2xl font-bold mb-2 text-green-700">
              Artisan Dashboard
            </h2>
            <p className="mb-2">
              Welcome, artisan! Here you can manage your crafts and orders.
            </p>
          </div>
        ) : (
          <div className="mt-8 p-4 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 font-medium">
            <h2 className="text-2xl font-bold mb-2 text-indigo-700">
              User Dashboard
            </h2>
            <p className="mb-2">
              Welcome, user! Browse and shop for unique handmade items.
            </p>
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}