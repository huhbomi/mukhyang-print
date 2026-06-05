const PHONE = "031-989-0317";

export default function HomeIntroSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1100px] px-4 text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-brand">PRINT STUDIO</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-800 md:text-4xl lg:text-5xl">
          묵향인쇄
        </h1>
        <div className="mx-auto mt-5 h-px w-12 bg-brand" aria-hidden="true" />

        <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
          명함, 제본, 전단지, 스티커, 상패, 카다로그, 리플렛, 현수막, NCR지, 판촉물 등
          <br className="hidden sm:inline" />
          다양한 인쇄물을 합리적인 가격과 높은 품질로 제작해 드립니다.
        </p>

        <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              Contact
            </p>
            <a
              href={`tel:${PHONE}`}
              className="mt-1 block text-2xl font-bold text-brand transition-colors hover:text-brand-dark md:text-3xl"
            >
              {PHONE}
            </a>
          </div>

          <div className="hidden h-12 w-px bg-border sm:block" aria-hidden="true" />

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              Business Hours
            </p>
            <p className="mt-1 text-base font-medium text-gray-800 md:text-lg">
              평일 09:00 ~ 18:00
            </p>
            <p className="mt-0.5 text-sm text-muted">공휴일 휴무</p>
          </div>
        </div>
      </div>
    </section>
  );
}
