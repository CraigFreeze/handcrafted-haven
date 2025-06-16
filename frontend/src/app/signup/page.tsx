"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signupAction } from "../lib/authActions";

export default function Signup() {
    const router = useRouter();
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = await signupAction(formData);
        if (res.ok) {
            router.push("/login");
        } else {
            setError(res.error || "Signup failed");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
                    Create Account
                </h2>
                {error && <div className="mb-4 text-red-600">{error}</div>}
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    className="w-full p-2 mb-4 border rounded"
                />
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
                <select
                    title="Role"
                    name="role"
                    required
                    className="w-full p-2 mb-4 border rounded"
                >
                    <option value="user">User</option>
                    <option value="artisan">Artisan</option>
                </select>
                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
