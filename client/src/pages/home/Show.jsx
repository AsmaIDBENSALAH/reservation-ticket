import AccountCTASection from "@/components/sections/AccountCTASection";
import { BestChampionships } from "@/components/sections/BestChampionships";
import FAQ from "@/components/sections/FAQ";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorks from "@/components/sections/HowItWorks";
import MostPopularMatchesSection from "@/components/sections/MostPopularMatchesSection";
import PopularCategoriesSection from "@/components/sections/PopularCategoriesSection";
import PopularMatchSection from "@/components/sections/PopularMatchSection";

const Show = () => {
  return (
    <>
      <HeroSection />
      {/** Popular match **/}
      <PopularMatchSection />
      {/** Popular categories **/}
      <PopularCategoriesSection />
      {/** Popular categories **/}
      <MostPopularMatchesSection />
      {/** Account Creation Section **/}
      <AccountCTASection />
      {/** Best champoins **/}
      <BestChampionships />
      {/** How it works **/}
      <HowItWorks />
      {/** FAQ **/}
      <FAQ />
    </>
  );
};

export default Show;
