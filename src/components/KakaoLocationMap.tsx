import Image from "next/image";
import Link from "next/link";

const MAP_IMAGE_SRC = "/images/location-map.png";
const KAKAO_MAP_PLACE_URL = "https://map.kakao.com/link/search/묵향인쇄";
const KAKAO_MAP_ADDRESS_URL =
  "https://map.kakao.com/link/search/경기%20김포시%20통진읍%20김포대로%202323";

const COMPANY_NAME = "묵향인쇄";
const ADDRESS = "경기 김포시 통진읍 김포대로 2323";
const PHONE = "031-989-0317";
const HANDPHONE = "010-3996-0740";

const BUS_STOPS = [
  "① 통진두레문화센터·청룡사",
  "② 통진두레문화센터·청룡사",
] as const;

const GENERAL_BUSES = ["3", "88", "90", "96", "97"] as const;
const VILLAGE_BUSES = ["11A", "11B"] as const;

type InfoRowProps = {
  label: string;
  children: React.ReactNode;
};

function InfoRow({ label, children }: InfoRowProps) {
  return (
    <div className="grid gap-2 border-b border-border py-5 last:border-b-0 md:grid-cols-[140px_1fr] md:gap-6 md:py-6">
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <div className="text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

type BusBadgeProps = {
  type: "일반" | "마을";
};

function BusBadge({ type }: BusBadgeProps) {
  const isGeneral = type === "일반";

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded px-2 py-0.5 text-xs font-medium ${
        isGeneral
          ? "border border-brand/30 bg-brand/10 text-brand"
          : "border border-gray-300 bg-gray-100 text-gray-600"
      }`}
    >
      {type}
    </span>
  );
}

type BusLineGroupProps = {
  type: "일반" | "마을";
  numbers: readonly string[];
};

function BusLineGroup({ type, numbers }: BusLineGroupProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <BusBadge type={type} />
      <span>{numbers.join(", ")}</span>
    </div>
  );
}

const mapButtonClassName =
  "inline-flex w-full items-center justify-center rounded-lg border border-brand bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-dark sm:w-auto";

export default function KakaoLocationMap() {
  return (
    <div className="space-y-10">
      <a
        href={KAKAO_MAP_PLACE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오맵에서 묵향인쇄 위치 보기"
        className="group relative block cursor-pointer overflow-hidden rounded-lg border border-gray-200"
      >
        <span className="absolute right-3 top-3 z-10 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
          카카오맵에서 보기
        </span>
        <Image
          src={MAP_IMAGE_SRC}
          alt="묵향인쇄 위치 지도"
          width={1100}
          height={620}
          className="h-auto w-full transition duration-300 group-hover:scale-[1.01] group-hover:opacity-90"
          priority
        />
      </a>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href={KAKAO_MAP_ADDRESS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={mapButtonClassName}
        >
          카카오맵에서 보기
        </Link>
        <Link
          href={KAKAO_MAP_PLACE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={mapButtonClassName}
        >
          길찾기
        </Link>
      </div>

      <div className="border-t border-border">
        <InfoRow label="상호명">{COMPANY_NAME}</InfoRow>
        <InfoRow label="주소">{ADDRESS}</InfoRow>
        <InfoRow label="전화번호">
            <a href={`tel:${PHONE}`} className="transition-colors hover:text-brand">
              {PHONE}
            </a>
            <p></p>
            <a href={`tel:${HANDPHONE}`} className="transition-colors hover:text-brand">
              {HANDPHONE}
            </a>
        </InfoRow>
      </div>

      <div className="border-t border-border">
        <InfoRow label="주변 정류장">
          <ul className="space-y-1">
            {BUS_STOPS.map((stop) => (
              <li key={stop}>{stop}</li>
            ))}
          </ul>
        </InfoRow>
      </div>

      <div className="border-t border-border">
        <InfoRow label="주변 버스">
          <div className="space-y-3">
            <BusLineGroup type="일반" numbers={GENERAL_BUSES} />
            <BusLineGroup type="마을" numbers={VILLAGE_BUSES} />
          </div>
        </InfoRow>
      </div>
    </div>
  );
}
