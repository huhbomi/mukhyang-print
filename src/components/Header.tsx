import AdminHeaderStatus from "@/components/AdminHeaderStatus";
import Navigation from "@/components/Navigation";
import SiteLogo from "@/components/SiteLogo";

export default function Header() {
  return (
    <header className="w-full bg-white">
      <div className="border-b border-border">
        <div className="relative mx-auto flex max-w-6xl items-center justify-center px-4 py-6 md:py-7">
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <AdminHeaderStatus />
          </div>
          <SiteLogo />
        </div>
      </div>

      <Navigation />
    </header>
  );
}
