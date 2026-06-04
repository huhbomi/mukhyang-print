import Link from "next/link";

const quickLinks = [
  {
    title: "회사소개",
    desc: "묵향인쇄를 소개합니다.",
    href: "/company/greeting",
  },
  {
    title: "제품소개",
    desc: "다양한 인쇄 제품을 확인하세요.",
    href: "/product/business-card",
  },
  {
    title: "상담문의",
    desc: "궁금한 점을 문의해 주세요.",
    href: "/inquiry",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <section className="text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
          묵향인쇄에 오신 것을 환영합니다
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          명함, 카타로그, 리플렛, 스티커, 전단지, 봉투 등 다양한 인쇄물을
          <br className="hidden sm:inline" />
          고품질과 합리적인 가격으로 제작해 드립니다.
        </p>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded border border-border bg-white p-8 text-center transition-shadow hover:shadow-sm"
          >
            <h2 className="mb-2 text-lg font-semibold text-brand">{item.title}</h2>
            <p className="text-sm text-muted">{item.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
