import Link from "next/link";
import AdminHeaderStatus from "@/components/AdminHeaderStatus";
import Navigation from "@/components/Navigation";

function CityBanner() {
  return (
    <div className="relative h-48 w-full overflow-hidden border-b border-border bg-gradient-to-b from-slate-100 to-slate-200 md:h-56">
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
      <svg
        className="absolute bottom-0 left-0 h-auto w-full text-slate-400/80"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="0" y="120" width="60" height="80" fill="currentColor" opacity="0.5" />
        <rect x="70" y="90" width="50" height="110" fill="currentColor" opacity="0.6" />
        <rect x="130" y="100" width="40" height="100" fill="currentColor" opacity="0.45" />
        <rect x="180" y="70" width="70" height="130" fill="currentColor" opacity="0.7" />
        <rect x="260" y="110" width="45" height="90" fill="currentColor" opacity="0.5" />
        <rect x="320" y="60" width="55" height="140" fill="currentColor" opacity="0.65" />
        <rect x="390" y="95" width="50" height="105" fill="currentColor" opacity="0.55" />
        <rect x="450" y="80" width="65" height="120" fill="currentColor" opacity="0.6" />
        <rect x="530" y="100" width="40" height="100" fill="currentColor" opacity="0.45" />
        <rect x="580" y="50" width="80" height="150" fill="currentColor" opacity="0.75" />
        <rect x="670" y="85" width="55" height="115" fill="currentColor" opacity="0.55" />
        <rect x="735" y="105" width="45" height="95" fill="currentColor" opacity="0.5" />
        <rect x="790" y="65" width="70" height="135" fill="currentColor" opacity="0.7" />
        <rect x="870" y="95" width="50" height="105" fill="currentColor" opacity="0.55" />
        <rect x="930" y="75" width="60" height="125" fill="currentColor" opacity="0.6" />
        <rect x="1000" y="110" width="45" height="90" fill="currentColor" opacity="0.45" />
        <rect x="1055" y="55" width="75" height="145" fill="currentColor" opacity="0.7" />
        <rect x="1140" y="90" width="50" height="110" fill="currentColor" opacity="0.55" />
        <rect x="1200" y="100" width="55" height="100" fill="currentColor" opacity="0.5" />
        <rect x="1265" y="70" width="65" height="130" fill="currentColor" opacity="0.65" />
        <rect x="1340" y="105" width="45" height="95" fill="currentColor" opacity="0.45" />
        <rect x="1395" y="85" width="45" height="115" fill="currentColor" opacity="0.55" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm tracking-widest text-muted md:text-base">
          QUALITY PRINTING · 묵향인쇄
        </p>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <header className="w-full bg-white">
      <div className="border-b border-border">
        <div className="relative mx-auto flex max-w-6xl items-center justify-center px-4 py-5">
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <AdminHeaderStatus />
          </div>
          <Link href="/" className="text-2xl font-bold tracking-tight text-brand md:text-3xl">
            묵향인쇄
          </Link>
        </div>
      </div>

      <Navigation />
      <CityBanner />
    </header>
  );
}
