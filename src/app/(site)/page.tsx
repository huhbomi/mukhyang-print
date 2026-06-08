import HomeIntroSection from "@/components/home/HomeIntroSection";
import HomeInquiryCtaSection from "@/components/home/HomeInquiryCtaSection";
import HomeLocationSection from "@/components/home/HomeLocationSection";
import HomeProductsSection from "@/components/home/HomeProductsSection";

export default function HomePage() {
  return (
    <>
      <HomeIntroSection />
      <HomeProductsSection />
      <HomeInquiryCtaSection />
      <HomeLocationSection />
    </>
  );
}
