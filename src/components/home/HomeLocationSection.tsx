import Image from "next/image";
import Link from "next/link";
import HomeSectionTitle from "@/components/home/HomeSectionTitle";

const KAKAO_MAP_URL = "https://map.kakao.com/link/search/묵향인쇄";
const ADDRESS = "경기 김포시 통진읍 김포대로 2323 2층 묵향인쇄소";
const PHONE = "031-989-0317";

export default function HomeLocationSection() {
  return (
    <section className="border-t border-border bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-4">
        <HomeSectionTitle title="오시는 길" />

        <a
          href={KAKAO_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="카카오맵에서 묵향인쇄 위치 보기"
          className="group relative block overflow-hidden rounded-xl border border-border"
        >
          <span className="absolute right-3 top-3 z-10 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
            카카오맵에서 보기
          </span>
          <Image
            src="/images/location-map.png"
            alt="묵향인쇄 위치 지도"
            width={1100}
            height={620}
            className="h-auto w-full transition duration-300 group-hover:scale-[1.01] group-hover:opacity-90"
          />
        </a>

        <div className="mt-10 grid gap-6 border-t border-border pt-10 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium tracking-[0.15em] text-muted">ADDRESS</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-800 md:text-base">
              {ADDRESS}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/company/location"
            className="inline-flex items-center text-sm font-medium text-brand transition-colors hover:text-brand-dark"
          >
            오시는길 상세보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
