import type { Metadata } from "next";
import RegisterForm from "../ui/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your Handcrafted Haven account.",
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <RegisterForm />
    </main>
  );
}
