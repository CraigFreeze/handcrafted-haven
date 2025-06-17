import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import path from "path";
import fs from "fs/promises";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const profileSchema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
});

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const file = formData.get("image") as File | null;

    // Validate
    const parsed = profileSchema.safeParse({ email, name });
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    let imageUrl: string | null = null;

    if (file && file.size > 0) {
        const ext = path.extname(file.name) || ".png";
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}${ext}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await fs.mkdir(uploadDir, { recursive: true });
        const arrayBuffer = await file.arrayBuffer();
        await fs.writeFile(path.join(uploadDir, fileName), Buffer.from(arrayBuffer));
        imageUrl = `/uploads/${fileName}`;
    }

    try {
        // Check if the user exists
        const user = await sql`
        SELECT * FROM users WHERE email = ${email}
        `;
        if (user.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Database error: "+ error }, { status: 500 });
    }

    try {
        if (!imageUrl) {
            // If no image is uploaded, keep the existing image URL
            await sql`
    UPDATE users SET public_name = ${name}
    WHERE email = ${email}
  `;
        } else {
            await sql`
      UPDATE users SET public_name = ${name}, image = ${imageUrl}
      WHERE email = ${email}
    `;
        }

    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }


    return NextResponse.json({ ok: true, image: imageUrl });
}