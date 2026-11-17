import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { SocialProof } from "@/components/sections/SocialProof";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { AiNativeAdvantage } from "@/components/sections/AiNativeAdvantage";
import { ProcessTeaser } from "@/components/sections/ProcessTeaser";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";

interface HomePageProps {
  onOpenBooking: () => void;
  onNavigate: (path: string) => void;
}

export const HomePage = ({ onOpenBooking, onNavigate }: HomePageProps) => {
  return (
    <div className="w-full flex flex-col">
      <Hero onOpenBooking={onOpenBooking} onNavigate={onNavigate} />
      <SocialProof />
      <Services onOpenBooking={onOpenBooking} onNavigate={onNavigate} />
      <SelectedWork onNavigate={onNavigate} onOpenBooking={onOpenBooking} />
      <AiNativeAdvantage onOpenBooking={onOpenBooking} onNavigate={onNavigate} />
      <ProcessTeaser onNavigate={onNavigate} />
      <PricingTeaser onOpenBooking={onOpenBooking} onNavigate={onNavigate} />
      <FAQAccordion onOpenBooking={onOpenBooking} />
      <FinalCTA onOpenBooking={onOpenBooking} onNavigate={onNavigate} />
    </div>
  );
};
