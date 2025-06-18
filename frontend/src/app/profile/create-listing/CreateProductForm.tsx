"use client";

import React, { useActionState } from "react";
import { createProduct } from "@/app/lib/actions";

const initialState = { errors: {}, message: "" };

export default function CreateProductForm({ userId }: { userId: string }) {
  const [state, formAction] = useActionState(createProduct, initialState);

  return (
    <form
      action={formAction}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <input type="hidden" name="user_id" value={userId} />
      <label>
        Title
        <input name="title" type="text" required />
      </label>
      <label>
        Category
        <input name="category" type="text" required />
      </label>
      <label>
        Price
        <input name="price" type="number" step="0.01" min="0" required />
      </label>
      <label>
        Description
        <textarea name="description" rows={4} required />
      </label>
      <label>
        Image URL
        <input name="image_url" type="url" required />
      </label>
      {state.errors &&
        Object.entries(state.errors).map(([field, messages]) => (
          <p key={field} style={{ color: "red" }}>
            {messages as unknown as string}
          </p>
        ))}
      {state.message && <p style={{ color: "green" }}>{state.message}</p>}
      <button type="submit">Create Product</button>
    </form>
  );
}
