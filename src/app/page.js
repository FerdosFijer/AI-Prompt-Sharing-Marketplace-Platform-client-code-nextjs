import BenefitsSection from "@/components/homePage/BenefitsSection";
import EngineCompatibility from "@/components/homePage/EngineCompatibility";
import FeaturedPrompts from "@/components/homePage/FeaturedPrompts";
import HeroSection from "@/components/homePage/HeroSection";
import PromptEssentials from "@/components/homePage/PromptEssentials";
import Testimonials from "@/components/homePage/Testimonials";
import TopCreators from "@/components/homePage/TopCreators";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <FeaturedPrompts/>
      <BenefitsSection/>
      <PromptEssentials/>
      <TopCreators/>
      <EngineCompatibility/>
      <Testimonials/>
    </div>
  );
}
