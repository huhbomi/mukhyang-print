import Link from "next/link";

export default function HomeInquiryCtaSection() {
  return (
    <section className="bg-gradient-to-br from-[#0f3d28] via-brand-dark to-brand py-20 md:py-24">
      <div className="mx-auto max-w-[1100px] px-4 text-center">
        <p className="text-xs font-medium tracking-[0.22em] text-white/70">
          INQUIRY
        </p>
        <p className="mt-4 text-xl font-medium leading-relaxed text-white md:text-2xl">
          원하시는 인쇄물을 문의해 주세요.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/85 md:text-base">
          견적 및 제작 상담을 도와드립니다.
        </p>

        <Link
          href="/inquiry"
          className="mt-10 inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-10 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-brand md:text-base"
        >
          상담문의 하기
        </Link>
      </div>
    </section>
  );
}
