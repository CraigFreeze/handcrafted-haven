"use client";
import { Product } from "@/app/lib/definitions";
import { addToCart } from "@/app/lib/cart";
import Image from "next/image";
import "./ProductDetails.css";

function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="product">
      <div className="image-wrapper">
        <Image
          width={1000}
          height={667}
          className="product__image-wrapper__image"
          src={product.image_url || "/hero-image.jpg"}
          alt="A duffle bag, dopp kit and ceramic mug sit atop a wood table in front of a wall of art prints."
          priority
        />
      </div>
      <div className="product-details">
        <h1 className="product-details__title">{product.title}</h1>
        <div className="product-details__seller-name">
          From {product.public_name}
        </div>
        <div className="product-details__description">
          {product.description || "No description available."}
        </div>
        <div className="product-details__price">
          ${Number(product.price).toFixed(2)}
        </div>
        <div className="product-details__category">
          Category: {product.category}
        </div>

        <button
          className="product-card__product-details__add-to-cart-button"
          onClick={() => {
            addToCart(product);
            alert(`Added ${product.title} to cart!`);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
