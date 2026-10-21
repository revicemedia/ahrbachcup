import HeroSection from "@/components/HeroSection/HeroSection";
import InfoSection from "@/components/InfoSection/InfoSection";
import PhotoSection from "@/components/PhotoSection/PhotoSection";
import Registration from "@/components/Registration/Registration";
import Schedule from "@/components/Schedule/Schedule";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Schedule />
      <Registration />
      <PhotoSection />
      <InfoSection />
    </>
  );
}
