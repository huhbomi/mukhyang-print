import Link from "next/link";
import AdminHeaderStatus from "@/components/AdminHeaderStatus";
import MainBannerSlider from "@/components/MainBannerSlider";
import Navigation from "@/components/Navigation";

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
      <MainBannerSlider />
    </header>
  );
}
