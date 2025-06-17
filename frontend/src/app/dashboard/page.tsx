"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import UserProfile from "./UserProfile";
import UserProfileServer from "./UserProfileServer";
import {
  LuLogOut,
  LuUser,
  LuPackage,
  LuStar,
  LuSettings,
} from "react-icons/lu";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const role = searchParams.get("role");
  const router = useRouter();

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
    <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-12">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-2">
          {role === "artisan" ? "Artisan Dashboard" : "User Dashboard"}
        </h1>
        <p className="text-gray-600 mb-6">
          {role === "artisan"
            ? "Manage your crafts, orders, and reviews all in one place."
            : "Browse, shop, and manage your favorite handmade items."}
        </p>
        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-tr from-indigo-100 to-green-100 rounded-xl shadow p-6 flex flex-col items-center">
            <LuPackage className="text-3xl text-indigo-600 mb-2" />
            <div className="font-bold text-lg mb-1">
              {role === "artisan" ? "Your Products" : "Your Orders"}
            </div>
            <div className="text-gray-500 text-sm">
              {role === "artisan"
                ? "View and manage your listed crafts."
                : "Track your purchases and order status."}
            </div>
          </div>
          <div className="bg-gradient-to-tr from-green-100 to-indigo-100 rounded-xl shadow p-6 flex flex-col items-center">
            <LuStar className="text-3xl text-green-600 mb-2" />
            <div className="font-bold text-lg mb-1">
              {role === "artisan" ? "Reviews" : "Favorites"}
            </div>
            <div className="text-gray-500 text-sm">
              {role === "artisan"
                ? "See what buyers are saying about your crafts."
                : "Save and revisit your favorite items."}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
