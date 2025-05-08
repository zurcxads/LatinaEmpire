import Hero from "@/components/Hero";
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
      {/* SECTION 1: Hero Banner */}
      <Hero />

      {/* SECTION 2: Event/Program Carousel */}
      <ProgramCarousel />

      {/* SECTION 3: Life Mastery Quiz */}
      <QuizSection />

      {/* SECTION 4: Three Pillars Section */}
      <PillarsSection />

      {/* SECTION 5: Testimonials */}
      <Testimonial />

      {/* SECTION 6: Meet Our Founder */}
      <FounderSection />

      {/* SECTION 7: Shop Preview */}
      <ShopSection />

      {/* SECTION 8: Media Section */}
      <MediaSection />

      {/* SECTION 9: Elite Program Overview */}
      <BrandIntro />

      {/* SECTION 10: Final CTA Section */}
      <FinalCTA />
    </div>
  );
};

export default Home;