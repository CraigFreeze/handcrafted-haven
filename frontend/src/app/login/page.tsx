"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginAction } from "../lib/authActions";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await loginAction(formData);
    
    if (res.ok && res.role && res.email) {
      localStorage.setItem("userObj", JSON.stringify({ email: res.email, role: res.role, name: res.name, image: res.image }));
      router.push(`/dashboard?role=${res.role}&email=${res.email}`);
    } else {
      setError(res.error || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
          Login
        </h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
