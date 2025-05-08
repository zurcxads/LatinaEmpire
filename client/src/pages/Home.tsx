import Hero from "@/components/Hero";
import NextEventBanner from "@/components/NextEventBanner";
import ProgramCarousel from "@/components/ProgramCarousel";
import BrandIntro from "@/components/BrandIntro";
import Testimonial from "@/components/Testimonial";
import PillarsSection from "@/components/PillarsSection";
import FounderSection from "@/components/FounderSection";
import ShopSection from "@/components/ShopSection";
import MediaSection from "@/components/MediaSection";
import QuizSection from "@/components/QuizSection";
import FinalCTA from "@/components/FinalCTA";

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* SECTION 1: Hero Banner - Full-screen flagship program promo */}
      <Hero />

      {/* SECTION 2: Next Event Promo Banner */}
      <NextEventBanner />

      {/* SECTION 3: Event/Program Carousel - Horizontal slider */}
      <ProgramCarousel />

      {/* SECTION 4: Life Mastery Quiz */}
      <QuizSection />

      {/* SECTION 5: Pillars Section */}
      <PillarsSection />

      {/* SECTION 6: Testimonials */}
      <Testimonial />

      {/* SECTION 7: Meet Our Founder */}
      <FounderSection />

      {/* SECTION 8: Shop Preview */}
      <ShopSection />

      {/* SECTION 9: Media Section */}
      <MediaSection />

      {/* SECTION 10: Final CTA Section */}
      <FinalCTA />
    </div>
  );
};

export default Home;