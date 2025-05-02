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
      <section className="pt-20 relative min-h-screen overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <img 
            src="https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg" 
            alt="Perla Tamez Casasnovas" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 min-h-[calc(100vh-5rem)] flex items-center relative z-20">
          <div className="max-w-4xl">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 md:mb-8">
              The Story of Latina Empire
            </h1>
            <p className="font-sans text-xl md:text-2xl text-white/90 mb-8 md:mb-10 font-light leading-relaxed">
              Meet Perla Tamez Casasnovas — Entrepreneur. Leader. Visionary.
            </p>
            <Button
              asChild
              className="bg-magenta hover:bg-magenta/90 text-white font-medium text-lg px-6 py-6 h-auto rounded-lg"
            >
              <Link href="#early-life">
                Read Her Story
                <ArrowDown className="ml-2 h-5 w-5" />
              </Link>
            </Button>
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

      {/* Quote Section */}
      <section className="relative py-24 overflow-hidden bg-black">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/80 z-10"></div>
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
            <p className="font-serif text-3xl md:text-4xl text-white leading-tight">
              Now she's a recognized Latina leader, the founder of a global empowerment platform, and has impacted thousands with her transformative programs.
            </p>
          </div>
          
          {/* Auto-rotating carousel */}
          <ImpactCarousel />
          
          <div className="max-w-4xl mx-auto mt-12 space-y-6">
            <p className="font-serif text-xl text-white leading-relaxed">
              She's been featured in Latina Magazine's 25 most influential Latinas, recognized by Hispanic Business Journal as one of the "Rising Stars in Business," and selected by the National Association of Professional Women as one of the "Top Ten Latina Leaders to Watch."
            </p>
            
            <p className="font-serif text-xl text-white leading-relaxed">
              Forbes' feature article called her the "Latina Empowerment Catalyst."
            </p>
            
            <p className="font-serif text-xl text-white leading-relaxed">
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

      {/* The Mission of Latina Empire */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">
              THE FRAMEWORK
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6 tracking-tight">
              Heart. Mind. Money.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The revolutionary framework at the core of Latina Empire
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Heart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-magenta/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-magenta"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
              </div>
              <h3 className="font-serif font-bold text-xl mb-4">Heart</h3>
              <p className="text-gray-700 leading-relaxed">
                Honoring cultural values and emotional intelligence as professional assets. Building confidence through authenticity and community connection.
              </p>
            </div>

            {/* Mind */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-magenta/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-magenta"><path d="M2 12h1"></path><path d="M6 12h1"></path><path d="M10 12h1"></path><path d="M14 12h1"></path><path d="M18 12h1"></path><path d="M22 12h1"></path><path d="M12 2v1"></path><path d="M12 6v1"></path><path d="M12 10v1"></path><path d="M12 18v1"></path><path d="M12 22v1"></path><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1"></circle></svg>
              </div>
              <h3 className="font-serif font-bold text-xl mb-4">Mind</h3>
              <p className="text-gray-700 leading-relaxed">
                Developing strategic thinking and leadership skills that draw on Latina perspectives. Creating new paradigms for success that don't require assimilation.
              </p>
            </div>

            {/* Money */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-magenta/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-magenta"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 18V6"></path></svg>
              </div>
              <h3 className="font-serif font-bold text-xl mb-4">Money</h3>
              <p className="text-gray-700 leading-relaxed">
                Building financial literacy and wealth-building strategies. Breaking generational patterns and creating new legacies of abundance.
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed italic text-center">
              "The Heart-Mind-Money framework emerged from countless conversations with Latina professionals. We saw that traditional professional development focused on skills and strategy but ignored the cultural and emotional dimensions that are essential to our experience. Our approach integrates all aspects of who we are."
            </p>
            <p className="text-right text-gray-500 mt-4 font-medium">— Perla Tamez Casasnovas</p>
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-16 md:py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">
              KEY MOMENTS
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6 tracking-tight">
              Milestones
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The journey of building Latina Empire
            </p>
          </div>

          <div className="overflow-x-auto pb-6">
            <div className="inline-flex space-x-8 md:space-x-12 min-w-max">
              {/* Timeline Item 1 */}
              <div className="w-60 flex flex-col items-center">
                <div className="text-3xl font-bold text-magenta mb-2">2015</div>
                <div className="h-0.5 w-full bg-magenta mb-4"></div>
                <h3 className="font-serif font-bold text-xl mb-2 text-center">First Company Founded</h3>
                <p className="text-gray-700 text-center">
                  Launched Latina Consulting Group focused on corporate diversity initiatives
                </p>
              </div>

              {/* Timeline Item 2 */}
              <div className="w-60 flex flex-col items-center">
                <div className="text-3xl font-bold text-magenta mb-2">2017</div>
                <div className="h-0.5 w-full bg-magenta mb-4"></div>
                <h3 className="font-serif font-bold text-xl mb-2 text-center">Media Expansion</h3>
                <p className="text-gray-700 text-center">
                  Created "Latina Leaders" digital content series highlighting success stories
                </p>
              </div>

              {/* Timeline Item 3 */}
              <div className="w-60 flex flex-col items-center">
                <div className="text-3xl font-bold text-magenta mb-2">2020</div>
                <div className="h-0.5 w-full bg-magenta mb-4"></div>
                <h3 className="font-serif font-bold text-xl mb-2 text-center">Latina Empire Born</h3>
                <p className="text-gray-700 text-center">
                  Launched comprehensive platform during pandemic to support Latinas globally
                </p>
              </div>

              {/* Timeline Item 4 */}
              <div className="w-60 flex flex-col items-center">
                <div className="text-3xl font-bold text-magenta mb-2">2021</div>
                <div className="h-0.5 w-full bg-magenta mb-4"></div>
                <h3 className="font-serif font-bold text-xl mb-2 text-center">Heart-Mind-Money</h3>
                <p className="text-gray-700 text-center">
                  Developed and trademarked revolutionary professional development framework
                </p>
              </div>

              {/* Timeline Item 5 */}
              <div className="w-60 flex flex-col items-center">
                <div className="text-3xl font-bold text-magenta mb-2">2023</div>
                <div className="h-0.5 w-full bg-magenta mb-4"></div>
                <h3 className="font-serif font-bold text-xl mb-2 text-center">Global Expansion</h3>
                <p className="text-gray-700 text-center">
                  Reached 10,000 members across 27 countries, launched Ambassador program
                </p>
              </div>
            </div>
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