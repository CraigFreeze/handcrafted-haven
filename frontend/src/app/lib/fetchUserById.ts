import postgres from "postgres";
import { User } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchUserById(id: string): Promise<User | null> {
  try {
    const data = await sql<User[]>`SELECT * FROM users WHERE id = ${id}`;
    return data[0] || null;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}
