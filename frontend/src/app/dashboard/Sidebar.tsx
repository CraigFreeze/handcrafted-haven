"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { LuLogOut, LuUser, LuPackage, LuStar, LuSettings } from "react-icons/lu";

export default function Sidebar() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const role = searchParams.get("role") || "";
  const router = useRouter();

  function handleSignOut() {
    router.replace("/login");
  }

  function handleSettings() {
    router.push(
      `/dashboard/settings?email=${encodeURIComponent(email)}&role=${encodeURIComponent(role)}`
    );
  }

  function handleDashboard() {
    router.push(
      `/dashboard?email=${encodeURIComponent(email)}&role=${encodeURIComponent(role)}`
    );
  }

  return (
    <aside className="w-full md:w-64 bg-white/90 shadow-lg md:rounded-r-3xl flex md:flex-col flex-row items-center md:items-start p-4 md:p-8 gap-4 md:gap-8">
      <div className="flex items-center gap-3 mb-2 md:mb-8">
        <LuUser className="text-indigo-700 text-3xl" />
        <div>
          <div className="font-bold text-sm text-indigo-700">{email}</div>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
            {role}
          </span>
        </div>
      </div>
      <nav className="flex md:flex-col gap-4 w-full">
        <button
          type="button"
          onClick={handleDashboard}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-50 transition font-medium text-indigo-700"
        >
          <LuUser /> Dashboard
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-50 transition font-medium text-indigo-700">
          <LuPackage /> {role === "artisan" ? "My Products" : "My Orders"}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-50 transition font-medium text-indigo-700">
          <LuStar /> {role === "artisan" ? "Reviews" : "Favorites"}
        </button>
        <button
          type="button"
          onClick={handleSettings}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-50 transition font-medium text-indigo-700"
        >
          <LuSettings /> Settings
        </button>
      </nav>
      <button
        onClick={handleSignOut}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold mt-auto transition w-full md:w-auto"
      >
        <LuLogOut /> Sign Out
      </button>
    </aside>
  );
}