"use client";

import { useActionState } from "react";
import { useState } from "react";
import "./CreateReviewForm.css";
import { createReview, State } from "@/app/lib/actions";

function CreateReviewForm({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createReview, initialState);
  const [rating, setRating] = useState(5);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!userId) {
      e.preventDefault();
      alert("You must be signed in to submit a review.");
    }
  }

  return (
    <form className="review-form" action={formAction} onSubmit={handleSubmit}>
      {/* Hidden fields for productId and userId */}
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="userId" value={userId} />

      <fieldset className="review-form__fieldset">
        <legend className="review-form__legend">Write a Review</legend>

        <div className="review-form__group">
          <label className="review-form__label" htmlFor="review-rating">
            Star Rating: {rating}
          </label>
          <input
            className="review-form__input review-form__input--range"
            id="review-rating"
            name="rating"
            type="range"
            min="1"
            max="5"
            step="1"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            list="rating-tickmarks"
          />
          <datalist id="rating-tickmarks">
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num} label={String(num)} />
            ))}
          </datalist>
        </div>

        <div className="review-form__group">
          <label className="review-form__label" htmlFor="review-title">
            Title
          </label>
          <input
            className="review-form__input"
            id="review-title"
            name="title"
            type="text"
            placeholder="Enter review title"
          />
        </div>

        <div className="review-form__group">
          <label className="review-form__label" htmlFor="review-content">
            Review
          </label>
          <textarea
            className="review-form__input review-form__input--textarea"
            id="review-content"
            name="content"
            rows={5}
            placeholder="Write your review..."
          />
        </div>
      </fieldset>
      {state.errors && (
        <div className="review-form__errors">
          {Object.entries(state.errors).map(([field, messages]) => (
            <p key={field} className="review-form__error">
              {messages.join(", ")}
            </p>
          ))}
        </div>
      )}

      <button className="review-form__submit" type="submit">
        Submit Review
      </button>
    </form>
  );
}

export default CreateReviewForm;
