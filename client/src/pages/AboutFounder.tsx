import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import JoinModal from "@/components/JoinModal";
import ImpactCarousel from "@/components/ImpactCarousel";
import { useState } from "react";

const AboutFounder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column - Text */}
          <div className="flex flex-col justify-center px-8 py-16 md:py-24 md:px-12 bg-black">
            <div className="mb-10">
              <span className="inline-flex items-center text-white/90 uppercase text-sm tracking-wider font-medium">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-magenta"></span>
                About Perla
              </span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-8 max-w-lg">
              Extraordinary lives answer to a higher calling
            </h1>
            
            <Button
              asChild
              className="bg-magenta hover:bg-magenta/90 text-white font-medium text-lg w-fit px-6 py-5 h-auto rounded-lg mt-4"
            >
              <Link href="#early-life">
                Read Her Story
                <ArrowDown className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative h-[50vh] md:h-auto">
            <img 
              src="https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg" 
              alt="Perla Tamez Casasnovas" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Inspirational Quote Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight text-gray-900">
              An extraordinary life is one on your terms, both of deep meaning and incredible impact. Driven by the pursuit of excellence and guided by a profound sense of purpose, Perla Tamez Casasnovas has inspired thousands to dream bigger and reach higher.
            </p>
          </div>
        </div>
      </section>

      {/* Early Life Section */}
      <section className="py-16 md:py-20 bg-white" id="early-life">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg" 
                  alt="Perla's childhood in Hidalgo, Texas" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-magenta/10 rounded-full hidden md:block"></div>
            </div>
            <div>
              <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">
                ORIGINS
              </span>
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
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">
                PHILOSOPHY
              </span>
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
                  src="https://images.pexels.com/photos/6893988/pexels-photo-6893988.jpeg" 
                  alt="Perla speaking at a leadership conference" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-magenta/10 rounded-full hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Life Dedication Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/7713516/pexels-photo-7713516.jpeg" 
                  alt="Perla mentoring Latina professionals" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-magenta/10 rounded-full hidden md:block"></div>
            </div>
            <div>
              <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">
                MISSION
              </span>
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
      <section className="relative py-24 overflow-hidden bg-black">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/80 z-10"></div>
          {/* Fade effect at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20"></div>
          <img 
            src="https://images.pexels.com/photos/7433922/pexels-photo-7433922.jpeg" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex items-center">
            <div className="w-full lg:w-3/5 ml-auto">
              <p className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
                "I decided that I was going to find a way, somehow, someday, to give back and pay it forward."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-magenta flex-shrink-0 mr-3 overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg" 
                    alt="Perla Tamez Casasnovas" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-white font-medium">Perla Tamez Casasnovas</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Carousel Section */}
      <section className="py-16 md:py-20 bg-black">
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
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">
                THE JOURNEY
              </span>
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

            <div className="my-12 bg-magenta/5 p-8 md:p-12 border-l-4 border-magenta rounded-r-lg">
              <p className="text-2xl md:text-3xl text-gray-800 italic font-serif">
                "I didn't just want success — I wanted to rewrite the Latina playbook."
              </p>
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
      <section className="py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card 1 - Framework for Success */}
            <div className="relative rounded-xl overflow-hidden h-[350px] shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
              <img 
                src="https://images.pexels.com/photos/6325907/pexels-photo-6325907.jpeg" 
                alt="A Framework for Success" 
                className="w-full h-full object-cover"
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
                src="https://images.pexels.com/photos/8192042/pexels-photo-8192042.jpeg" 
                alt="Real Community Impact" 
                className="w-full h-full object-cover"
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