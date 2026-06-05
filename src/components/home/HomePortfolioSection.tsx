import Image from "next/image";
import Link from "next/link";
import HomeSectionTitle from "@/components/home/HomeSectionTitle";

const PORTFOLIO_ITEMS = [
  { id: 1, title: "명함 제작", image: "/images/portfolio (1).png" },
  { id: 2, title: "카다로그 제작", image: "/images/portfolio (2).png" },
  { id: 3, title: "전단지 제작", image: "/images/portfolio (3).png" },
  { id: 4, title: "스티커 제작", image: "/images/portfolio (4).png" },
  { id: 5, title: "상패 제작", image: "/images/portfolio (5).png" },
  { id: 6, title: "현수막 제작", image: "/images/portfolio (6).png" },
] as const;

export default function HomePortfolioSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1100px] px-4">
        <HomeSectionTitle
          title="제작 사례"
          description="묵향인쇄의 최근 제작 사례를 확인해 보세요."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_ITEMS.map((item) => (
            <Link
              key={item.id}
              href="/portfolio"
              className="group overflow-hidden rounded-xl border border-border bg-white transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 33vw, 360px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-gray-800 group-hover:text-brand">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-sm font-medium text-brand transition-colors hover:text-brand-dark"
          >
            포트폴리오 더보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
