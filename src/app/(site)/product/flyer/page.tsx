import ProductDetail from "@/components/ProductDetail";
import { getProduct } from "@/lib/products";
import { notFound } from "next/navigation";

export default function FlyerPage() {
  const product = getProduct("flyer");
  if (!product) notFound();
  return <ProductDetail {...product} />;
}
