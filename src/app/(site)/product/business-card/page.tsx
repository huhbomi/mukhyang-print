import ProductDetail from "@/components/ProductDetail";
import { getProduct } from "@/lib/products";
import { notFound } from "next/navigation";

export default function BusinessCardPage() {
  const product = getProduct("business-card");
  if (!product) notFound();
  return <ProductDetail {...product} />;
}
