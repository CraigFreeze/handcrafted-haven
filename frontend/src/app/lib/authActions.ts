"use server";
import { createUser, validateLogin } from "./userStore";

export async function signupAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as "user" | "artisan",
    };
    await createUser(data);
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Signup failed" };
  }
}

export async function loginAction(formData: FormData): Promise<{ ok: boolean; role?: string; email?: string; error?: string }> {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    const user = await validateLogin(data);
    if (!user) return { ok: false, error: "Invalid credentials" };
    return { ok: true, role: user.role, email: user.email };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Login failed" };
  }
}