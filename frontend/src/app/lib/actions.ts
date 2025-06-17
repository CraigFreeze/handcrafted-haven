'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import postgres from "postgres";

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
