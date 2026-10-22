import HeroSection from "@/components/HeroSection/HeroSection";
import InfoSection from "@/components/InfoSection/InfoSection";
import PhotoSection from "@/components/PhotoSection/PhotoSection";
import NextMatches from "@/components/Schedule/NextMatches";
import Registration from "@/components/Registration/Registration";

export default function Home() {
  return (
    <>
      <HeroSection />
      <NextMatches />
      <Registration />
      <PhotoSection />
      <InfoSection />
    </>
  );
}
