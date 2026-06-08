import type { ReactNode } from "react";
import HomeSectionTitle from "@/components/home/HomeSectionTitle";

type ProductItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

function ProductIcon({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand/15 bg-brand/5 text-brand">
      {children}
    </div>
  );
}

const PRODUCTS: ProductItem[] = [
  {
    title: "명함",
    description: "브랜드 이미지를 담은 고품질 명함 제작",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="1.5" />
        <path d="M7 10h6M7 14h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "제본",
    description: "제안서, 보고서, 카탈로그 등 다양한 제본",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6 4h10a2 2 0 012 2v14H8a2 2 0 01-2-2V4z" />
        <path d="M8 4v16" />
      </svg>
    ),
  },
  {
    title: "전단지",
    description: "홍보·행사용 전단지 기획부터 인쇄까지",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="5" y="3" width="14" height="18" rx="1.5" />
        <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "스티커",
    description: "라벨, 데칼, 포장 스티커 맞춤 제작",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 3l7 7-7 11L5 10l7-7z" />
        <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "상패",
    description: "감사·표창 상패 및 기념패 제작",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M8 4h8v8H8z" />
        <path d="M6 20l3-4M18 20l-3-4M12 12v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "카다로그",
    description: "제품·기업 소개 카다로그 디자인 인쇄",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 6h16M4 10h16M4 14h10M4 18h8" strokeLinecap="round" />
        <rect x="3" y="4" width="18" height="16" rx="1.5" />
      </svg>
    ),
  },
];

export default function HomeProductsSection() {
  return (
    <section className="border-t border-border bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-4">
        <HomeSectionTitle title="주요 제작 품목" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <div
              key={product.title}
              className="rounded-xl border border-border bg-[#fafafa] p-7"
            >
              <ProductIcon>{product.icon}</ProductIcon>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                {product.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
