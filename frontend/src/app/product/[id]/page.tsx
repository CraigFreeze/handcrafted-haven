import ProductDetails from "@/../ui/ProductDetails";
import { fetchProductById } from "@/app/lib/data";
import "./page.css";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const product = await fetchProductById(id);

  return (
    <div className="product-page">
      <ProductDetails product={product} />
    </div>
  );
}
