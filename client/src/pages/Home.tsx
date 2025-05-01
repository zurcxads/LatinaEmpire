import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandIntro from "@/components/BrandIntro";
import Testimonial from "@/components/Testimonial";
import EventsPreview from "@/components/EventsPreview";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <BrandIntro />
      <Testimonial />
      <EventsPreview />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
