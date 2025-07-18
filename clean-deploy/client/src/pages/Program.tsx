import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";

import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";
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
  ArrowRight,
  PlayCircle,
  Award,
  Target,
  BookOpen,
  Clock,
  Briefcase,
  Globe
} from "lucide-react";

interface TestimonialProps {
  name: string;
  title: string;
  quote: string;
  image: string;
}

const Testimonial = ({ name, title, quote, image }: TestimonialProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start mb-5">
        <div className="relative w-20 h-20 mr-4 flex-shrink-0">
          <img
            src={getImageSrc(image, true)}
            alt={name}
            className="rounded-full object-cover w-full h-full ring-2 ring-magenta/20"
            onError={createImageErrorHandler()}
          />
          <div className="absolute -bottom-1 -right-1 bg-magenta rounded-full p-1.5 shadow-lg">
            <Star className="w-3 h-3 text-white" fill="white" />
          </div>
        </div>
        <div>
          <h4 className="font-serif font-bold text-xl">{name}</h4>
          <p className="text-gray-600 text-sm">{title}</p>
        </div>
      </div>
      <p className="italic text-gray-700 leading-relaxed text-lg">"{quote}"</p>
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
    <div className="border-b border-gray-200 py-5">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none transition-all duration-300 hover:text-magenta"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-serif font-bold text-xl">{question}</h3>
        <div className={`transition-all duration-300 transform ${isOpen ? "rotate-180 bg-magenta text-white" : "bg-gray-100"} rounded-full p-2`}>
          {isOpen ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>
      <div className={`mt-4 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-gray-700 leading-relaxed pb-4">{answer}</p>
      </div>
    </div>
  );
};

const Program = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-magenta/30 via-transparent to-black/60"></div>
        
        <div className="container relative mx-auto px-4 md:px-6 z-10">
          <div className="lg:flex lg:items-center lg:gap-x-16">
            <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left lg:w-1/2">
              <span className="inline-block px-4 py-1 rounded-full bg-magenta/20 text-magenta font-medium text-sm mb-6">
                EXCLUSIVE PROGRAM
              </span>
              <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                Step Into Your Power with the <span className="text-magenta">Latina Empire</span> Elite Program
              </h1>
              <p className="font-sans text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
                A transformative journey to align your purpose, passion, and power. Join a community of ambitious Latinas creating generational impact.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button className="bg-magenta hover:bg-magenta/90 text-white px-8 py-6 h-auto rounded-full text-lg shadow-lg shadow-magenta/30 transition-all duration-300">
                  Apply Now
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setVideoModalOpen(true)}
                  className="border-2 border-white/30 text-white px-8 py-6 h-auto rounded-full text-lg hover:bg-white/10 transition-all duration-300 inline-flex items-center"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Overview
                </Button>
              </div>
              
              <div className="mt-10 flex justify-center lg:justify-start">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold font-serif text-magenta">6</div>
                    <div className="text-gray-300 text-sm">Month Program</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-serif text-magenta">500+</div>
                    <div className="text-gray-300 text-sm">Graduates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-serif text-magenta">95%</div>
                    <div className="text-gray-300 text-sm">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block lg:w-1/2 mt-10 lg:mt-0">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-magenta/30 to-magenta/10 blur-xl"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-wider text-gray-400">Next Cohort</div>
                      <div className="font-medium">July 15, 2023</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-wider text-gray-400">Application Deadline</div>
                      <div className="font-medium">June 30, 2023</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-wider text-gray-400">Format</div>
                      <div className="font-medium">Live Online + Community</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-wider text-gray-400">Program Fee</div>
                      <div className="font-medium">$5,997 (payment plans available)</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-magenta/20 rounded-lg">
                    <div className="flex items-center">
                      <Star className="text-magenta h-5 w-5 mr-2" fill="currentColor" />
                      <p className="text-sm font-medium">Limited spots available for the next cohort</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-20 bg-white relative">
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-gray-900 to-transparent"></div>
        <div className="container mx-auto px-4 md:px-6 pt-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-magenta/10 text-magenta font-medium text-sm mb-4">
              PROGRAM OVERVIEW
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6">
              The Three Pillars of Transformation
            </h2>
            <p className="font-sans text-gray-700 text-lg">
              Our elite program is built on these core foundations that will elevate every aspect of your life and career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Pillar 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-magenta/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-magenta to-magenta/70 rounded-2xl flex items-center justify-center mb-6 relative shadow-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif font-bold text-2xl mb-4">Mindset Mastery</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Transform limiting beliefs, develop unshakable confidence, and create a success-oriented mindset that propels you forward in all areas of life.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Identity & belief transformation</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Cultural confidence building</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Decision-making framework</span>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-magenta/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-magenta to-magenta/70 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif font-bold text-2xl mb-4">Financial Independence</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Build wealth with purpose, overcome financial blocks, and implement strategic systems to create sustainable prosperity and generational wealth.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Wealth building strategies</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Financial literacy education</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Passive income development</span>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-magenta/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-magenta to-magenta/70 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif font-bold text-2xl mb-4">Community Leadership</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Develop your authentic leadership style, amplify your voice and impact, and create a legacy that inspires and uplifts the Latina community.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Authentic leadership development</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Community impact strategies</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Networking & visibility training</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gray-50 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3')] bg-fixed bg-cover bg-center opacity-5"></div>
        <div className="container relative mx-auto px-4 md:px-6 z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-magenta/10 text-magenta font-medium text-sm mb-4">
                PROGRAM COMPONENTS
              </span>
              <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6">
                What's Included in the Elite Program
              </h2>
              <p className="font-sans text-gray-700 text-lg">
                Everything you need to transform your life and business on your terms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Item 1 */}
              <div className="bg-white rounded-xl p-6 shadow-md flex hover:shadow-xl transition-all duration-300">
                <div className="mr-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-magenta to-magenta/70 rounded-xl flex items-center justify-center shadow-md">
                    <CalendarClock className="h-7 w-7 text-white" />
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
              <div className="bg-white rounded-xl p-6 shadow-md flex hover:shadow-xl transition-all duration-300">
                <div className="mr-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-magenta to-magenta/70 rounded-xl flex items-center justify-center shadow-md">
                    <UserPlus className="h-7 w-7 text-white" />
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
              <div className="bg-white rounded-xl p-6 shadow-md flex hover:shadow-xl transition-all duration-300">
                <div className="mr-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-magenta to-magenta/70 rounded-xl flex items-center justify-center shadow-md">
                    <MessageSquare className="h-7 w-7 text-white" />
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
              <div className="bg-white rounded-xl p-6 shadow-md flex hover:shadow-xl transition-all duration-300">
                <div className="mr-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-magenta to-magenta/70 rounded-xl flex items-center justify-center shadow-md">
                    <Star className="h-7 w-7 text-white" />
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

            <div className="mt-16 bg-gradient-to-br from-gray-800 to-black p-8 rounded-2xl border border-gray-700 shadow-xl text-white">
              <h3 className="font-serif font-bold text-2xl mb-6 text-center">
                Additional Program Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-10">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-3 flex-shrink-0 mt-0.5" />
                  <span>Personalized success roadmap</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-3 flex-shrink-0 mt-0.5" />
                  <span>Monthly 1:1 strategy sessions</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-3 flex-shrink-0 mt-0.5" />
                  <span>Leadership skills development</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-3 flex-shrink-0 mt-0.5" />
                  <span>Resources & templates library</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-3 flex-shrink-0 mt-0.5" />
                  <span>Expert guest speaker sessions</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-magenta mr-3 flex-shrink-0 mt-0.5" />
                  <span>Cultural identity exploration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-magenta/10 text-magenta font-medium text-sm mb-4">
                  PROGRAM IMPACT
                </span>
                <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6">
                  Transformational Results for Latina Leaders
                </h2>
                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  The Elite Program delivers measurable outcomes for participants across career advancement, business growth, and personal development metrics.
                </p>
                
                <div className="space-y-5">
                  <div className="relative h-12">
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-magenta to-magenta/70 h-full rounded-full" style={{ width: '84%' }}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="font-medium">84% of graduates increased their income</span>
                      <span className="font-bold text-magenta">+84%</span>
                    </div>
                  </div>
                  
                  <div className="relative h-12">
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-magenta to-magenta/70 h-full rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="font-medium">92% reported improved confidence and leadership</span>
                      <span className="font-bold text-magenta">+92%</span>
                    </div>
                  </div>
                  
                  <div className="relative h-12">
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-magenta to-magenta/70 h-full rounded-full" style={{ width: '76%' }}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="font-medium">76% launched or expanded their businesses</span>
                      <span className="font-bold text-magenta">+76%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-gray-50 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:bg-gray-100">
                  <Award className="h-10 w-10 text-magenta mx-auto mb-4" />
                  <div className="font-serif font-bold text-3xl md:text-4xl mb-1 text-gray-900">98%</div>
                  <p className="text-gray-700">Satisfaction rate</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:bg-gray-100">
                  <Target className="h-10 w-10 text-magenta mx-auto mb-4" />
                  <div className="font-serif font-bold text-3xl md:text-4xl mb-1 text-gray-900">6x</div>
                  <p className="text-gray-700">Average ROI within a year</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:bg-gray-100">
                  <BookOpen className="h-10 w-10 text-magenta mx-auto mb-4" />
                  <div className="font-serif font-bold text-3xl md:text-4xl mb-1 text-gray-900">300+</div>
                  <p className="text-gray-700">Hours of curriculum</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:bg-gray-100">
                  <Globe className="h-10 w-10 text-magenta mx-auto mb-4" />
                  <div className="font-serif font-bold text-3xl md:text-4xl mb-1 text-gray-900">19</div>
                  <p className="text-gray-700">Countries represented</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-100 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-129418cb2dfe?ixlib=rb-4.0.3')] bg-fixed bg-cover bg-center opacity-5"></div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-magenta/10 text-magenta font-medium text-sm mb-4">
              SUCCESS STORIES
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6">
              Hear From Our Community
            </h2>
            <p className="font-sans text-gray-700 text-lg">
              Discover how the Elite Program has transformed the lives and careers of Latinas just like you.
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
          
          <div className="mt-12 text-center">
            <Button 
              variant="outline"
              className="bg-white border-2 border-magenta text-magenta hover:bg-magenta hover:text-white transition-all duration-300 px-8 py-3 rounded-full font-medium shadow-md"
            >
              Read More Success Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Program Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-magenta/10 text-magenta font-medium text-sm mb-4">
                PROGRAM TIMELINE
              </span>
              <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6">
                Your 6-Month Transformation Journey
              </h2>
              <p className="font-sans text-gray-700 text-lg">
                A structured approach to help you achieve meaningful results.
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
              
              {/* Month 1 */}
              <div className="relative mb-16">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-1">
                  <div className="w-10 h-10 rounded-full border-4 border-magenta bg-white flex items-center justify-center">
                    <span className="font-bold text-magenta">1</span>
                  </div>
                </div>
                <div className="ml-0 md:ml-auto md:w-5/12 p-6 bg-gray-50 rounded-xl shadow-md mr-12 md:mr-0">
                  <h3 className="font-serif font-bold text-xl mb-2">Foundation & Clarity</h3>
                  <p className="text-gray-700 mb-3">Establish your vision, identify your core values, and create your personalized success roadmap.</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Weeks 1-4</span>
                  </div>
                </div>
              </div>
              
              {/* Month 2 */}
              <div className="relative mb-16">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-1">
                  <div className="w-10 h-10 rounded-full border-4 border-magenta bg-white flex items-center justify-center">
                    <span className="font-bold text-magenta">2</span>
                  </div>
                </div>
                <div className="ml-12 md:ml-0 md:w-5/12 p-6 bg-gray-50 rounded-xl shadow-md">
                  <h3 className="font-serif font-bold text-xl mb-2">Mindset & Identity</h3>
                  <p className="text-gray-700 mb-3">Transform limiting beliefs, develop your cultural power, and build unshakable confidence.</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Weeks 5-8</span>
                  </div>
                </div>
              </div>
              
              {/* Month 3 & 4 */}
              <div className="relative mb-16">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-1">
                  <div className="w-10 h-10 rounded-full border-4 border-magenta bg-white flex items-center justify-center">
                    <span className="font-bold text-magenta">3-4</span>
                  </div>
                </div>
                <div className="ml-0 md:ml-auto md:w-5/12 p-6 bg-gray-50 rounded-xl shadow-md mr-12 md:mr-0">
                  <h3 className="font-serif font-bold text-xl mb-2">Strategy & Implementation</h3>
                  <p className="text-gray-700 mb-3">Develop and implement strategic action plans for financial growth, career advancement or business scaling.</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Weeks 9-16</span>
                  </div>
                </div>
              </div>
              
              {/* Month 5 & 6 */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-1">
                  <div className="w-10 h-10 rounded-full border-4 border-magenta bg-white flex items-center justify-center">
                    <span className="font-bold text-magenta">5-6</span>
                  </div>
                </div>
                <div className="ml-12 md:ml-0 md:w-5/12 p-6 bg-gray-50 rounded-xl shadow-md">
                  <h3 className="font-serif font-bold text-xl mb-2">Leadership & Legacy</h3>
                  <p className="text-gray-700 mb-3">Refine your leadership style, build your platform, and create plans for lasting impact in your community.</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Weeks 17-24</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-magenta/30 text-magenta font-medium text-sm mb-4">
                COMMON QUESTIONS
              </span>
              <h2 className="font-serif font-bold text-3xl md:text-5xl mb-6">
                Frequently Asked Questions
              </h2>
              <p className="font-sans text-gray-300 text-lg">
                Everything you need to know about joining the Elite Program.
              </p>
            </div>

            <div className="space-y-4 bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
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
      <section className="py-20 bg-gradient-to-br from-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-magenta/20 to-black/60"></div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white font-medium text-sm mb-6">
                LIMITED ENROLLMENT
              </span>
              <h2 className="font-serif font-bold text-4xl md:text-6xl mb-6 leading-tight">
                Are You Ready to Step Into Your <span className="text-magenta">Power</span>?
              </h2>
              <p className="font-sans text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join a community of Latinas who are creating impact, building wealth, and changing the world on their own terms.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
              <Button className="bg-magenta hover:bg-magenta/90 text-white px-10 py-6 h-auto rounded-full text-lg shadow-lg shadow-magenta/30 transition-all duration-300 w-full md:w-auto inline-flex items-center justify-center">
                Apply for the Program
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white/30 text-white px-10 py-6 h-auto rounded-full text-lg hover:bg-white/10 transition-all duration-300 w-full md:w-auto"
              >
                Schedule a Call
              </Button>
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-gray-300 font-medium">
                Applications for the July cohort close on June 30th
              </p>
              <div className="flex items-center justify-center mt-3 gap-2">
                <div className="flex -space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-magenta"></div>
                  <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-magenta"></div>
                  <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-magenta"></div>
                </div>
                <p className="text-sm text-gray-300">
                  <span className="text-magenta font-bold">Only 8 spots</span> remain for this cohort
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black rounded-full p-2 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="aspect-w-16 aspect-h-9 bg-gray-800">
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-white/70">Video player would be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Program;