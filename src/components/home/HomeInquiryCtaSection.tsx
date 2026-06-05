import Link from "next/link";

export default function HomeInquiryCtaSection() {
  return (
    <section className="bg-brand py-14 md:py-16">
      <div className="mx-auto max-w-[1100px] px-4 text-center">
        <p className="text-lg font-medium text-white md:text-xl">
          원하시는 인쇄물을 문의해 주세요.
        </p>
        <p className="mt-2 text-sm text-white/85 md:text-base">
          견적 및 제작 상담을 도와드립니다.
        </p>

        <Link
          href="/inquiry"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-brand transition-colors hover:bg-gray-50 md:text-base"
        >
          상담문의 하기
        </Link>
      </div>
    </section>
  );
}
