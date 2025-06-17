"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import UserProfile from "../UserProfile";
import { LuLogOut, LuUser, LuPackage, LuStar, LuSettings } from "react-icons/lu";

export default function Settings() {
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
        
          {/* User Profile */}
          <UserProfile email={email!} name="User Name" role={role!} />
        </div>
      </main>

  );
}