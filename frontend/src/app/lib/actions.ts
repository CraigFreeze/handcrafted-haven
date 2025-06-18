"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import postgres from "postgres";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const ReviewFormSchema = z.object({
  productId: z.string({
    required_error: "Missing product ID.",
  }),
  userId: z.string({
    required_error: "Missing user ID.",
  }),
  title: z.string().min(1, { message: "Title is required." }),
  star_rating: z.coerce
    .number()
    .min(1, { message: "Rating must be at least 1 star." })
    .max(5, { message: "Rating cannot exceed 5 stars." }),
  review: z.string().min(1, { message: "Review content is required." }),
});

const UserRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  public_name: z.string().min(1),
  image: z.string().url(),
  role: z.enum(["user", "artisan"]),
});

export type State = {
  errors?: {
    productId?: string[];
    userId?: string[];
    title?: string[];
    star_rating?: string[];
    review?: string[];
  };
  message?: string | null;
};

export async function createReview(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = ReviewFormSchema.safeParse({
    productId: formData.get("productId"),
    userId: formData.get("userId"),
    title: formData.get("title"),
    star_rating: formData.get("rating"),
    review: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Review.",
    };
  }

  const { productId, userId, title, star_rating, review } =
    validatedFields.data;
  const created_at = new Date().toISOString();

  try {
    await sql`
      INSERT INTO ratings (product_id, user_id, title, star_rating, review, created_at)
      VALUES (${productId}, ${userId}, ${title}, ${star_rating}, ${review}, ${created_at})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Review.",
    };
  }

  revalidatePath(`/product/${productId}`);
  redirect(`/product/${productId}`);
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createUser(prevState: any, formData: FormData) {
  const validated = UserRegistrationSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    public_name: formData.get("public_name"),
    image: formData.get("image"),
    role: formData.get("role"),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Invalid registration fields.",
    };
  }

  const { email, password, public_name, image, role } = validated.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  try {
    await sql`
      INSERT INTO users (id, email, password, public_name, image, role)
      VALUES (${id}, ${email}, ${hashedPassword}, ${public_name}, ${image}, ${role})
    `;
    return { message: "User registered successfully." };
  } catch (error) {
    return { message: "Database Error: Failed to register user." };
  }
  
}
