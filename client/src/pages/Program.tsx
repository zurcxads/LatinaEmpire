import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Brain,
  CreditCard,
  Users,
  CalendarClock,
  UserPlus,
  MessageSquare,
  Star,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  ArrowRight
} from "lucide-react";

interface TestimonialProps {
  name: string;
  title: string;
  quote: string;
  image: string;
}

const Testimonial = ({ name, title, quote, image }: TestimonialProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
      <div className="flex items-start mb-4">
        <div className="relative w-16 h-16 mr-4 flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="rounded-full object-cover w-full h-full"
          />
          <div className="absolute -bottom-1 -right-1 bg-magenta rounded-full p-1">
            <Star className="w-3 h-3 text-white" fill="white" />
          </div>
        </div>
        <div>
          <h4 className="font-serif font-bold text-lg">{name}</h4>
          <p className="text-gray-600 text-sm">{title}</p>
        </div>
      </div>
      <p className="italic text-gray-700 leading-relaxed">"{quote}"</p>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-serif font-semibold text-lg">{question}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-magenta" />
        ) : (
          <ChevronDown className="w-5 h-5 text-magenta" />
        )}
      </button>
      <div className={`mt-2 ${isOpen ? "block" : "hidden"}`}>
        <p className="text-gray-700 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const Program = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              Step Into Your Power with the Latina Empire Elite Program
            </h1>
            <p className="font-sans text-lg md:text-xl text-gray-700 mb-10">
              A transformative journey to align your purpose, passion, and power.
            </p>
            <Button className="bg-magenta text-white px-8 py-6 h-auto rounded text-lg hover:bg-opacity-90 shadow-md">
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Program Breakdown */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">
              The Three Pillars of Transformation
            </h2>
            <p className="font-sans text-gray-700">
              Our elite program is built on these core foundations that will elevate every aspect of your life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Pillar 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-magenta rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3">Mindset Mastery</h3>
              <p className="text-gray-700 leading-relaxed">
                Transform limiting beliefs, develop unshakable confidence, and create a success-oriented mindset that propels you forward in all areas of life.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-magenta rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3">Financial Independence</h3>
              <p className="text-gray-700 leading-relaxed">
                Build wealth with purpose, overcome financial blocks, and implement strategic systems to create sustainable prosperity and generational wealth.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-magenta rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3">Community Leadership</h3>
              <p className="text-gray-700 leading-relaxed">
                Develop your authentic leadership style, amplify your voice and impact, and create a legacy that inspires and uplifts the Latina community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">
                What's Included in the Elite Program
              </h2>
              <p className="font-sans text-gray-700">
                Everything you need to transform your life and business on your terms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Item 1 */}
              <div className="flex">
                <div className="mr-4 mt-1">
                  <div className="w-12 h-12 bg-white rounded-full border-2 border-magenta flex items-center justify-center">
                    <CalendarClock className="h-6 w-6 text-magenta" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl mb-2">Weekly Live Coaching</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Participate in interactive group coaching sessions led by our expert mentors, addressing your specific challenges and providing real-time guidance.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex">
                <div className="mr-4 mt-1">
                  <div className="w-12 h-12 bg-white rounded-full border-2 border-magenta flex items-center justify-center">
                    <UserPlus className="h-6 w-6 text-magenta" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl mb-2">Accountability Pods</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Join a small, curated group of like-minded Latinas who will support your journey, celebrate your wins, and help you stay committed to your goals.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex">
                <div className="mr-4 mt-1">
                  <div className="w-12 h-12 bg-white rounded-full border-2 border-magenta flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-magenta" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl mb-2">Private Community Access</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Get exclusive access to our thriving online community where you can network, share resources, and connect with successful Latina leaders.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex">
                <div className="mr-4 mt-1">
                  <div className="w-12 h-12 bg-white rounded-full border-2 border-magenta flex items-center justify-center">
                    <Star className="h-6 w-6 text-magenta" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl mb-2">Event VIP Access</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Enjoy priority registration, exclusive networking opportunities, and special perks at all Latina Empire in-person events and retreats.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white p-6 md:p-8 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-serif font-bold text-xl mb-4 text-center">
                Additional Program Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Personalized success roadmap</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Monthly 1:1 strategy sessions</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Leadership skills development</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Resources & templates library</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Expert guest speaker sessions</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Cultural identity exploration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">
              Success Stories from Our Community
            </h2>
            <p className="font-sans text-gray-700">
              Hear from women who have transformed their lives through the Elite Program.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Testimonial
              name="Maria Gonzalez"
              title="Entrepreneur & Mother of Two"
              quote="The Elite Program gave me the confidence and tools to launch my business while balancing family life. The community of powerful Latinas continues to inspire me every day."
              image="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
            />
            <Testimonial
              name="Gabriela Reyes"
              title="Corporate Executive"
              quote="I was stuck in my career for years before joining this program. Within 6 months, I negotiated a promotion and 35% salary increase using the strategies I learned here."
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
            />
            <Testimonial
              name="Sofia Mendez"
              title="Nonprofit Founder"
              quote="The mindset work in this program transformed not just my approach to business, but my entire life. I've created impact I never thought possible for my community."
              image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
            />
            <Testimonial
              name="Carolina Diaz"
              title="Author & Speaker"
              quote="Finding my voice and owning my story was the greatest gift of this program. I've now published my book and speak internationally about Latina leadership."
              image="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
            />
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">
                Frequently Asked Questions
              </h2>
              <p className="font-sans text-gray-700">
                Everything you need to know about joining the Elite Program.
              </p>
            </div>

            <div className="space-y-1">
              <FAQItem
                question="How much time should I commit to the program?"
                answer="We recommend dedicating 3-5 hours per week to get the most out of the Elite Program. This includes attending the weekly live coaching sessions (90 minutes), participating in your accountability pod (60 minutes), and implementing the strategies in your business and life. The program is designed for busy Latinas, and all sessions are recorded if you can't attend live."
              />
              <FAQItem
                question="What if I'm just starting my business or career?"
                answer="The Elite Program is designed for Latinas at all stages of their journey. We have members who are just starting their businesses, those climbing the corporate ladder, and established entrepreneurs looking to scale. Our curriculum and coaching are personalized to meet you where you are and help you reach your specific goals."
              />
              <FAQItem
                question="How long is the program and when can I join?"
                answer="The Elite Program is a 6-month immersive experience with the option to continue in our alumni community afterwards. We open enrollment four times per year (January, April, July, and October). Once you apply, we'll schedule a call to discuss your goals and ensure the program is the right fit for you."
              />
              <FAQItem
                question="What makes this program different from other coaching programs?"
                answer="Our program is specifically designed for Latina professionals and entrepreneurs, addressing the unique cultural contexts, challenges, and strengths we bring to the table. We combine practical business strategies with deep mindset work, all within a supportive community that understands your experience. The combination of group coaching, 1:1 support, and peer accountability creates a powerful framework for transformation."
              />
              <FAQItem
                question="What is the investment for the Elite Program?"
                answer="The investment for the 6-month Elite Program starts at $5,997 (payment plans available). This includes all weekly group coaching, monthly 1:1 calls, accountability pods, community access, and VIP event benefits. Considering the comprehensive support and the results our members achieve, many report that the program pays for itself through increased income, new opportunities, and improved business outcomes within the first few months."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">
              Are You Ready to Rise?
            </h2>
            <p className="font-sans text-lg opacity-90 mb-10 max-w-2xl mx-auto">
              Step into your power, embrace your cultural heritage, and create the impact, income, and influence you deserve. Join a community of Latinas who are changing the world on their own terms.
            </p>
            <Button className="bg-magenta text-white px-8 py-6 h-auto rounded text-lg hover:bg-opacity-90 shadow-md inline-flex items-center">
              Apply for the Program
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-6 text-sm opacity-70">
              Applications are reviewed within 48 hours. Limited spots available.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Program;