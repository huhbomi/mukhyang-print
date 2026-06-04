import ProductDetail from "@/components/ProductDetail";
import { getProduct } from "@/lib/products";
import { notFound } from "next/navigation";

export default function EnvelopePage() {
  const product = getProduct("envelope");
  if (!product) notFound();
  return <ProductDetail {...product} />;
}
