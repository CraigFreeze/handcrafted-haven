"use client";

import React, { useState } from "react";
import { deleteProduct } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

function DeleteForm({
  product,
  userId,
}: {
  product: { id: string; title: string };
  userId: string;
}) {
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setIsDeleting(true);
    const result = await deleteProduct(product.id, userId);
    setIsDeleting(false);
    if (result?.message === "Product deleted successfully.") {
      setMessage("Deleted!");
      router.refresh();
    } else {
      setMessage(result?.message || "Failed to delete product.");
    }
  }

  return (
    <form className="review-form" onSubmit={handleDelete}>
      <button type="submit" style={{ color: "red" }} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      {message && (
        <span
          style={{
            marginLeft: 8,
            color: message === "Deleted!" ? "green" : "red",
          }}
        >
          {message}
        </span>
      )}
    </form>
  );
}

export default DeleteForm;
