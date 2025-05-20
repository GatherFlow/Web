import { PromoCTASection } from "./cta";
import { PromoFeaturesSection } from "./features";
import { PromoFooter } from "./footer";
import { PromoHeroSection } from "./hero";
import { PromoLogosSection } from "./logos";
import { PromoNavbar } from "./navbar";
import { PromoPricingSection } from "./pricing";

export const PromoPage = () => (
  <div className="flex min-h-screen flex-col">
    <PromoNavbar />
    <main className="flex-1">
      <PromoHeroSection />
      <PromoLogosSection />
      <PromoFeaturesSection />
      <PromoPricingSection />
      <PromoCTASection />
      <PromoFooter />
    </main>
  </div>
)
