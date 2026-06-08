import Link from "next/link";
import { East_Sea_Dokdo } from "next/font/google";

const logoFont = East_Sea_Dokdo({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function SiteLogo() {
  return (
    <Link href="/" className="flex flex-col items-center text-center">
      <span
        className={`${logoFont.className} text-4xl leading-none text-brand md:text-[2.75rem] lg:text-5xl`}
      >
        묵향인쇄
      </span>
      <span className="mt-2 text-[10px] font-medium tracking-[0.28em] text-gray-500 md:text-xs">
        MUKHYANG PRINTING
      </span>
    </Link>
  );
}
