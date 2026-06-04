import ProductDetail from "@/components/ProductDetail";
import { getProduct } from "@/lib/products";
import { notFound } from "next/navigation";

export default function LeafletPage() {
  const product = getProduct("leaflet");
  if (!product) notFound();
  return <ProductDetail {...product} />;
}
