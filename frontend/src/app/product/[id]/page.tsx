import ProductDetails from "@/app/ui/ProductDetails";
import { fetchProductById } from "@/app/lib/data";
import "./page.css";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProductById(id);

  return (
    <div className="product-page">
      <ProductDetails product={product} />
    </div>
  );
}
