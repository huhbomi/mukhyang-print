import ProductDetail from "@/components/ProductDetail";
import { getProduct } from "@/lib/products";
import { notFound } from "next/navigation";

export default function CatalogPage() {
  const product = getProduct("catalog");
  if (!product) notFound();
  return <ProductDetail {...product} />;
}
