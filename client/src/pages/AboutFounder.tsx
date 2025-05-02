import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import JoinModal from "@/components/JoinModal";
import { useState } from "react";

const AboutFounder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg" 
            alt="Perla Tamez Casasnovas" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center relative z-20">
          <div className="max-w-4xl">
            <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              The Story of Latina Empire
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-10 font-light leading-relaxed">
              Meet Perla Tamez Casasnovas — Entrepreneur. Leader. Visionary.
            </p>
            <Button
              asChild
              className="bg-white hover:bg-white/90 text-black rounded-none px-8 py-7 h-auto font-medium text-lg"
            >
              <Link href="#early-life">
                Read Her Story
                <ArrowDown className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Early Life Section */}
      <section className="py-20 md:py-32 bg-white" id="early-life">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg" 
                alt="Perla's childhood in Hidalgo, Texas" 
                className="w-full h-auto shadow-xl"
              />
            </div>
            <div>
              <h2 className="font-serif font-bold text-3xl md:text-4xl mb-8 leading-tight">
                Early Life
              </h2>
              <p className="text-gray-800 text-lg mb-6 leading-relaxed">
                Born and raised in Hidalgo, Texas to Mexican immigrant parents, Perla experienced firsthand the challenges and beauty of straddling two cultures. From an early age, she demonstrated an unusual drive, selling homemade jewelry to classmates and organizing community events in her teens.
              </p>
              <p className="text-gray-800 text-lg mb-6 leading-relaxed">
                "Growing up on the border taught me to be a bridge," Perla recalls. "I learned to navigate different worlds and realized this skill was something many Latinas share but don't always recognize as valuable."
              </p>
              <p className="text-gray-800 text-lg leading-relaxed">
                This border upbringing—physically and metaphorically—would later inspire her approach to empowering Latina professionals to embrace their cultural duality as a strength in the workplace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Spark / Rise to Entrepreneurship */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif font-bold text-4xl md:text-5xl mb-10 leading-tight text-center">
              From Purpose to Profit
            </h2>
            
            <p className="text-gray-800 text-lg mb-6 leading-relaxed">
              After graduating with honors from the University of Texas, Perla's career trajectory seemed set: climbing the corporate ladder at breakneck speed, she became one of the youngest marketing directors at a Fortune 500 company.
            </p>
            
            <p className="text-gray-800 text-lg mb-6 leading-relaxed">
              Yet at the height of her corporate success, Perla experienced what she calls her "clarity moment." Despite her achievements, she noticed a pattern: talented Latina professionals were consistently underrepresented in leadership, not due to lack of talent or drive, but because of systemic barriers and missing support networks.
            </p>

            <div className="my-12 bg-magenta/5 p-8 md:p-12 border-l-4 border-magenta">
              <p className="text-2xl md:text-3xl text-gray-800 italic font-serif">
                "I didn't just want success — I wanted to rewrite the Latina playbook."
              </p>
            </div>
            
            <p className="text-gray-800 text-lg mb-6 leading-relaxed">
              In 2015, Perla launched her first company—a consulting firm helping corporations better engage with Latino talent. By 2017, she had expanded into media campaigns highlighting Latina achievement. And in 2020, Latina Empire was born, bringing together all aspects of her vision into a comprehensive ecosystem for Latina professional development.
            </p>
            
            <p className="text-gray-800 text-lg leading-relaxed">
              Her entrepreneurial journey has spanned multiple industries, from corporate training to digital media, events, and now a global membership community—all united by a single mission: to create pathways to power for Latina professionals.
            </p>
          </div>
        </div>
      </section>

      {/* The Mission of Latina Empire */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-serif font-bold text-4xl md:text-5xl mb-6 leading-tight">
              Heart. Mind. Money.
            </h2>
            <p className="text-gray-800 text-xl leading-relaxed">
              The revolutionary framework at the core of Latina Empire
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Heart */}
            <div className="bg-gray-50 p-8 shadow-sm">
              <h3 className="font-serif font-bold text-2xl mb-4 text-magenta">Heart</h3>
              <p className="text-gray-800 leading-relaxed">
                Honoring cultural values and emotional intelligence as professional assets. Building confidence through authenticity and community connection.
              </p>
            </div>

            {/* Mind */}
            <div className="bg-gray-50 p-8 shadow-sm">
              <h3 className="font-serif font-bold text-2xl mb-4 text-magenta">Mind</h3>
              <p className="text-gray-800 leading-relaxed">
                Developing strategic thinking and leadership skills that draw on Latina perspectives. Creating new paradigms for success that don't require assimilation.
              </p>
            </div>

            {/* Money */}
            <div className="bg-gray-50 p-8 shadow-sm">
              <h3 className="font-serif font-bold text-2xl mb-4 text-magenta">Money</h3>
              <p className="text-gray-800 leading-relaxed">
                Building financial literacy and wealth-building strategies. Breaking generational patterns and creating new legacies of abundance.
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <p className="text-gray-800 text-lg leading-relaxed">
              "The Heart-Mind-Money framework emerged from countless conversations with Latina professionals," explains Perla. "We saw that traditional professional development focused on skills and strategy but ignored the cultural and emotional dimensions that are essential to our experience. Our approach integrates all aspects of who we are."
            </p>
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-20 md:py-32 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6 leading-tight">
              Milestones
            </h2>
            <p className="text-gray-800 text-xl leading-relaxed">
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

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-magenta">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif font-bold text-3xl md:text-5xl text-white mb-6 leading-tight">
              Join the Movement
            </h2>
            <p className="text-white text-xl md:text-2xl mb-10 leading-relaxed">
              Be part of the next chapter in Latina history.
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-magenta hover:bg-white/90 rounded-none px-10 py-8 h-auto font-medium text-xl shadow-lg"
            >
              Join Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Join Modal */}
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default AboutFounder;