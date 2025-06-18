"use client";

import "./ProductCard.css";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa";
import { addToCart } from "@/app/lib/cart";

type ProductCardProps = {
  id: string;
  title: string;
  description: string;
  price: string | number;
  rating: string | number | null | undefined;
  photoSrc: string;
};

function ProductCard({
  id,
  title,
  description,
  price,
  rating,
  photoSrc,
}: ProductCardProps) {
  const product = {
    id,
    title,
    description,
    price: Number(price),
    image_url: photoSrc,
    category: "", // Not available in props
    user_id: "", // Not available in props
  };
  return (
    <div className="product-card">
      <a href={"product/" + id}>
        <div className="product-card__product-image-wrapper">
          <Image
            width={1000}
            height={667}
            className="product-card__product-image-wrapper__product-image "
            src={photoSrc || "/hero-image.jpg"}
            alt="A duffle bag, dopp kit and ceramic mug sit atop a wood table in front of a wall of art prints."
          />
        </div>
        <div className="product-card__product-details">
          <div className="product-card__product-details__top">
            <p className="product-card__product-details__top__product-title">
              {title}
            </p>
            <p className="product-card__product-details__top__rating">
              {rating} {rating && <FaRegStar />}{" "}
            </p>
          </div>
          <p className="product-card__product-details__product-description">
            {description}
          </p>
          <span className="product-card__product-details__product-price">
            ${price}
          </span>
          <button
            className="product-card__product-details__add-to-cart-button"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
              alert(`Added ${title} to cart!`);
            }}
          >
            Add to Cart
          </button>
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
