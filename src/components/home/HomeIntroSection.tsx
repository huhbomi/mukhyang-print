const PHONE = "031-989-0317";

export default function HomeIntroSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-4 text-center">
        <p className="text-xs font-medium tracking-[0.25em] text-brand">
          PREMIUM PRINT STUDIO
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
          묵향인쇄
        </h1>
        <div className="mx-auto mt-6 h-px w-16 bg-gray-200" aria-hidden="true" />

        <p className="mx-auto mt-10 max-w-3xl text-base leading-[1.9] text-gray-600 md:text-lg">
          명함, 제본, 전단지, 스티커, 상패, 카다로그, 리플렛, 현수막, NCR지, 판촉물 등
          <br className="hidden md:inline" />
          다양한 인쇄물을 합리적인 가격과 높은 품질로 제작해 드립니다.
        </p>

        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border bg-[#fafafa] px-6 py-10 md:px-12 md:py-12">
          <div className="grid gap-10 md:grid-cols-2 md:gap-8">
            <div className="md:border-r md:border-border md:pr-8">
              <p className="text-xs font-medium tracking-[0.18em] text-muted">
                CONTACT
              </p>
              <a
                href={`tel:${PHONE}`}
                className="mt-3 inline-block whitespace-nowrap text-[clamp(1.85rem,8vw,3rem)] font-bold tracking-tight text-brand transition-colors hover:text-brand-dark"
              >
                {PHONE}
              </a>
            </div>

            <div className="md:pl-4">
              <p className="text-xs font-medium tracking-[0.18em] text-muted">
                BUSINESS HOURS
              </p>
              <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                09:00 ~ 18:00
              </p>
              <p className="mt-3 text-sm font-semibold text-red-600 md:text-base">
                주말 및 공휴일 휴무
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
