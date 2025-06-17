import postgres from "postgres";
import { signupSchema, loginSchema } from "./userSchema";
import bcrypt from "bcryptjs";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function createUser(user: {
    name: string;
    email: string;
    password: string;
    role: "user" | "artisan";
}) {
    // Validate with Zod
    const parsed = signupSchema.safeParse(user);
    console.log("Parsed user data:", parsed);
    if (!parsed.success) throw new Error(parsed.error.errors[0].message);

    // Check if user exists
    const exists = await sql`
    SELECT 1 FROM users WHERE email = ${user.email}
  `;
    if (exists.length > 0) throw new Error("Email already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    console.log("Hashed password:", hashedPassword);

    // Insert user
    try {
        await sql`
    INSERT INTO users (public_name, email, password, role)
    VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${user.role})
  `;
    } catch (error) {
        // We'll log the error to the console for now
        console.error(error);
    }
}

export async function findUserByEmail(email: string) {
    const users = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;
    return users[0] || null;
}

export async function validateLogin(data: { email: string; password: string }) {
    // Validate with Zod
    const parsed = loginSchema.safeParse(data);
    console.log("Parsed login data:", parsed);
    if (!parsed.success) throw new Error(parsed.error.errors[0].message);

    let user: any;
    try {
        user = await sql`
    SELECT * FROM users WHERE email = ${data.email}
  `;

    } catch (error) {
        // We'll log the error to the console for now
        console.error(error);
    }

    if (user && !user[0]) {
        throw new Error("Invalid credentials");
    }

    // Compare hashed password
    const isValid = await bcrypt.compare(data.password, user[0].password);
    console.log("Password validation result:", isValid);
    if (!isValid) {
        throw new Error("Invalid credentials");
    }
    return user[0];
}