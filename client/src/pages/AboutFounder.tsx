import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import JoinModal from "@/components/JoinModal";
import ImpactCarousel from "@/components/ImpactCarousel";
import { useState } from "react";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";

const AboutFounder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative bg-black text-white hero-navbar-spacing py-6 md:py-16 lg:py-20 mb-16 md:mb-24">
        <div className="relative w-full px-4 md:px-8 pt-12 pb-12 md:pt-20 mx-auto">
          {/* Main hero container with shadow and rounded corners */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-[80vh] md:min-h-[500px] lg:min-h-[550px] flex items-center bg-gradient-to-br from-[#3c003e] via-[#99004d] to-[#4e0059]">
            {/* Background Image */}
            <img 
              src={getImageSrc("https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg", true)} 
              alt="Perla Tamez Casasnovas" 
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
              onError={createImageErrorHandler()}
            />
            
            {/* Overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40 backdrop-blur-sm z-10"></div>
            
            {/* Content */}
            <div className="container mx-auto px-6 md:px-8 py-10 relative z-20 w-full">
              <div className="text-white space-y-8 text-center md:text-left max-w-xl mx-auto md:mx-0 flex flex-col justify-center">
                <p className="text-sm font-semibold tracking-wide text-pink-300 inline-flex items-center justify-center md:justify-start">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-pink-400"></span>
                  ABOUT PERLA
                </p>
                
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                  Extraordinary lives answer to a higher calling
                </h1>
                
                <button 
                  onClick={() => {
                    const earlyLifeSection = document.getElementById('early-life');
                    if (earlyLifeSection) {
                      // Get the navbar height to account for fixed positioning
                      const navbarHeight = 80; // Approximate height of navbar
                      const elementPosition = earlyLifeSection.getBoundingClientRect().top + window.pageYOffset;
                      // Scroll with offset to account for navbar
                      window.scrollTo({
                        top: elementPosition - navbarHeight,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="inline-flex items-center justify-center md:justify-start text-white underline decoration-dotted hover:text-pink-300 transition-colors no-underline text-base font-medium cursor-pointer bg-transparent border-0 p-0 tracking-wide mx-auto md:mx-0"
                >
                  READ HER STORY
                  <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Quote Section */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight text-gray-900">
              An extraordinary life is one on your terms, both of deep meaning and incredible impact. Driven by the pursuit of excellence and guided by a profound sense of purpose, Perla Tamez Casasnovas has inspired thousands to dream bigger and reach higher.
            </p>
          </div>
        </div>
      </section>

      {/* Early Life Section */}
      <section className="section-spacing bg-white" id="early-life">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={getImageSrc("https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg", true)} 
                  alt="Perla's childhood in Hidalgo, Texas" 
                  className="w-full h-full object-cover"
                  onError={createImageErrorHandler()}
                />
              </div>

            </div>
            <div>
              <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6 tracking-tight">
                Early Life
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Born and raised in Hidalgo, Texas to Mexican immigrant parents, Perla experienced firsthand the challenges and beauty of straddling two cultures. From an early age, she demonstrated an unusual drive, selling homemade jewelry to classmates and organizing community events in her teens.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                "Growing up on the border taught me to be a bridge," Perla recalls. "I learned to navigate different worlds and realized this skill was something many Latinas share but don't always recognize as valuable."
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                This border upbringing—physically and metaphorically—would later inspire her approach to empowering Latina professionals to embrace their cultural duality as a strength in the workplace.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Guiding Principles Section */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6 tracking-tight">
                Guiding Principles
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                At the core of Perla's leadership approach is her commitment to authentic representation. "When we fully embrace who we are, including our cultural heritage, we unlock a unique power," she explains. This belief has shaped every aspect of Latina Empire's development.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                "Too often, professional development for underrepresented groups focuses on assimilation rather than leveraging cultural differences as strengths," Perla notes. "Our approach flips that narrative completely."
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                This philosophy extends beyond business to encompass a holistic view of success that balances career advancement with personal fulfillment, community impact, and financial prosperity—without compromising cultural identity.
              </p>
            </div>
            <div className="relative order-first md:order-last">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={getImageSrc("https://images.pexels.com/photos/6893988/pexels-photo-6893988.jpeg", true)} 
                  alt="Perla speaking at a leadership conference" 
                  className="w-full h-full object-cover"
                  onError={createImageErrorHandler()}
                />
              </div>

            </div>
          </div>
        </div>
      </section>
      
      {/* Life Dedication Section */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={getImageSrc("https://images.pexels.com/photos/7713516/pexels-photo-7713516.jpeg", true)} 
                  alt="Perla mentoring Latina professionals" 
                  className="w-full h-full object-cover"
                  onError={createImageErrorHandler()}
                />
              </div>
            </div>
            <div>
              <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6 tracking-tight">
                Life Dedication
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                What began as a career pivot has evolved into Perla's life purpose: creating economic opportunity and leadership pathways for Latina women globally. She has dedicated herself to dismantling systemic barriers that have historically limited Latina advancement.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                "I believe that when Latinas thrive, whole communities transform," Perla emphasizes. "Our economic empowerment creates ripples that extend across generations, industries, and borders."
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                This dedication has led Perla to personally mentor over 500 Latina professionals, develop community programs in underserved areas, and advocate for policy changes that support equity in the workplace—all while building Latina Empire into a movement that extends far beyond its initial business model.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative section-spacing overflow-hidden bg-black">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/80 z-10"></div>
          {/* Fade effect at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20"></div>
          <img 
            src={getImageSrc("https://images.pexels.com/photos/7433922/pexels-photo-7433922.jpeg", true)} 
            alt="Background" 
            className="w-full h-full object-cover"
            onError={createImageErrorHandler()}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-3xl">
              <p className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
                "I decided that I was going to find a way, somehow, someday, to give back and pay it forward."
              </p>
              <div className="flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-magenta flex-shrink-0 mr-3 overflow-hidden">
                  <img 
                    src={getImageSrc("https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg", true)} 
                    alt="Perla Tamez Casasnovas" 
                    className="h-full w-full object-cover"
                    onError={createImageErrorHandler()}
                  />
                </div>
                <span className="text-white font-medium">Perla Tamez Casasnovas</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Carousel Section */}
      <section className="section-spacing bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="font-serif text-2xl md:text-2xl lg:text-3xl text-white leading-tight">
              Now she's a recognized Latina leader, the founder of a global empowerment platform, and has impacted thousands with her transformative programs.
            </p>
          </div>
          
          {/* Auto-rotating carousel */}
          <ImpactCarousel />
          
          <div className="max-w-4xl mx-auto mt-12 space-y-6">
            <p className="font-sans text-base md:text-lg text-white/90 leading-relaxed">
              She's been featured in Latina Magazine's 25 most influential Latinas, recognized by Hispanic Business Journal as one of the "Rising Stars in Business," and selected by the National Association of Professional Women as one of the "Top Ten Latina Leaders to Watch."
            </p>
            
            <p className="font-sans text-base md:text-lg text-white/90 leading-relaxed">
              Forbes' feature article called her the "Latina Empowerment Catalyst."
            </p>
            
            <p className="font-sans text-base md:text-lg text-white/90 leading-relaxed">
              And it's why corporations and organizations seek her guidance to create more inclusive workplaces.
            </p>
          </div>
        </div>
      </section>

      {/* The Spark / Rise to Entrepreneurship */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6 tracking-tight">
                From Purpose to Profit
              </h2>
            </div>
            
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              After graduating with honors from the University of Texas, Perla's career trajectory seemed set: climbing the corporate ladder at breakneck speed, she became one of the youngest marketing directors at a Fortune 500 company.
            </p>
            
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Yet at the height of her corporate success, Perla experienced what she calls her "clarity moment." Despite her achievements, she noticed a pattern: talented Latina professionals were consistently underrepresented in leadership, not due to lack of talent or drive, but because of systemic barriers and missing support networks.
            </p>

            <div className="my-12 flex items-center justify-center">
              <div className="relative py-12 px-8 md:px-16 bg-gradient-to-r from-magenta/10 to-magenta/5 rounded-xl shadow-sm w-full max-w-3xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-magenta to-magenta/30 rounded-t-xl"></div>
                <span className="text-magenta text-5xl absolute top-6 left-8 opacity-20 font-serif">"</span>
                <p className="text-2xl md:text-3xl text-gray-800 font-serif text-center relative z-10">
                  I didn't just want success — I wanted to rewrite the Latina playbook.
                </p>
                <span className="text-magenta text-5xl absolute bottom-6 right-8 opacity-20 font-serif">"</span>
              </div>
            </div>
            
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              In 2015, Perla launched her first company—a consulting firm helping corporations better engage with Latino talent. By 2017, she had expanded into media campaigns highlighting Latina achievement. And in 2020, Latina Empire was born, bringing together all aspects of her vision into a comprehensive ecosystem for Latina professional development.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              Her entrepreneurial journey has spanned multiple industries, from corporate training to digital media, events, and now a global membership community—all united by a single mission: to create pathways to power for Latina professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Dual Cards CTA Section */}
      <section className="section-spacing bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card 1 - Framework for Success */}
            <div className="relative rounded-xl overflow-hidden h-[350px] shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
              <img 
                src={getImageSrc("https://images.pexels.com/photos/6325907/pexels-photo-6325907.jpeg", true)} 
                alt="A Framework for Success" 
                className="w-full h-full object-cover"
                onError={createImageErrorHandler()}
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                <h3 className="text-white text-2xl md:text-3xl font-serif mb-2">
                  A Framework for Success
                </h3>
                <p className="text-white/80 mb-4 text-sm md:text-base">
                  Comprised of 3 key pillars, the Heart-Mind-Money Framework bridges the gap between where you are and where you want to go.
                </p>
                <Button
                  asChild
                  className="w-fit bg-white hover:bg-white/90 text-black text-sm"
                >
                  <Link href="/program">
                    Learn more
                  </Link>
                </Button>
              </div>
            </div>

            {/* Card 2 - Real Community Impact */}
            <div className="relative rounded-xl overflow-hidden h-[350px] shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
              <img 
                src={getImageSrc("https://images.pexels.com/photos/8192042/pexels-photo-8192042.jpeg", true)} 
                alt="Real Community Impact" 
                className="w-full h-full object-cover"
                onError={createImageErrorHandler()}
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                <h3 className="text-white text-2xl md:text-3xl font-serif mb-2">
                  An Impact with Measurable Results
                </h3>
                <p className="text-white/80 mb-4 text-sm md:text-base">
                  Our ambassador program has empowered Latinas across 27 countries to create local impact with global support.
                </p>
                <Button
                  asChild
                  className="w-fit bg-white hover:bg-white/90 text-black text-sm"
                >
                  <Link href="/ambassadors">
                    Learn more
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Modal */}
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default AboutFounder;