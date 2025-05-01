import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NextEventBanner from "@/components/NextEventBanner";
import ProgramCarousel from "@/components/ProgramCarousel";
import BrandIntro from "@/components/BrandIntro";
import Testimonial from "@/components/Testimonial";
import EventsPreview from "@/components/EventsPreview";
import CTASection from "@/components/CTASection";
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
      
      {/* Additional sections - with TonyRobbins.com styling */}
      <BrandIntro />
      <Testimonial />
      <EventsPreview />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
