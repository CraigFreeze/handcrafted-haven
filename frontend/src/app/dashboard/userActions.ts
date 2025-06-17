"use server";
import { z } from "zod";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const profileSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  image: z.string().nullable().optional(),
});

export async function updateUserProfile(data: { email: string; name: string; image?: string | null }) {
  const parsed = profileSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message);
  }
  await sql`
    UPDATE users SET public_name = ${data.name}, image = ${data.image || null}
    WHERE email = ${data.email}
  `;
  return { ok: true };
}

export async function getUserProfile(email: string) {
  const user = await sql`
    SELECT public_name, email, role, image FROM users WHERE email = ${email}
  `;
  return user[0];
}