import type { Metadata } from "next";
import LoginForm from "@/app/ui/login-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Handcrafted Haven account.",
};

export default function LoginPage() {
  return (
    <main>
        <Suspense>
          <LoginForm />
        </Suspense>
    </main>
  );
}
