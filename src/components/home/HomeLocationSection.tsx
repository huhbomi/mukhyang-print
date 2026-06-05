import Image from "next/image";
import Link from "next/link";
import HomeSectionTitle from "@/components/home/HomeSectionTitle";

const KAKAO_MAP_URL = "https://map.kakao.com/link/search/묵향인쇄";
const ADDRESS = "경기 김포시 통진읍 김포대로 2323";
const PHONE = "031-989-0317";

export default function HomeLocationSection() {
  return (
    <section className="bg-[#f9fafb] py-16 md:py-20">
      <div className="mx-auto max-w-[1100px] px-4">
        <HomeSectionTitle title="오시는 길" />

        <a
          href={KAKAO_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="카카오맵에서 묵향인쇄 위치 보기"
          className="group relative block overflow-hidden rounded-xl border border-gray-200"
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

        <div className="mt-8 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-gray-700">주소</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{ADDRESS}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">전화</p>
            <a
              href={`tel:${PHONE}`}
              className="mt-1 block text-sm text-brand transition-colors hover:text-brand-dark"
            >
              {PHONE}
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
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
