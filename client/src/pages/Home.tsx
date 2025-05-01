import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NextEventBanner from "@/components/NextEventBanner";
import ProgramCarousel from "@/components/ProgramCarousel";
import BrandIntro from "@/components/BrandIntro";
import Testimonial from "@/components/Testimonial";
import PillarsSection from "@/components/PillarsSection";
import CoachingSection from "@/components/CoachingSection";
import PodcastSection from "@/components/PodcastSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* SECTION 1: Hero Banner - Full-screen flagship program promo */}
      <Hero />
      
      {/* SECTION 2: Next Event Promo Banner */}
      <NextEventBanner />
      
      {/* SECTION 3: Event/Program Carousel - Horizontal slider */}
      <ProgramCarousel />
      
      {/* SECTION 4: Pillars Section */}
      <PillarsSection />
      
      {/* SECTION 5: Testimonials */}
      <Testimonial />
      
      {/* SECTION 6: Brand Introduction - Core Values */}
      <BrandIntro />
      
      {/* SECTION 7: Coaching Section */}
      <CoachingSection />
      
      {/* SECTION 8: Podcast Section */}
      <PodcastSection />
      
      {/* SECTION 9: Final CTA Section */}
      <FinalCTA />
      
      <Footer />
    </div>
  );
};

export default Home;
