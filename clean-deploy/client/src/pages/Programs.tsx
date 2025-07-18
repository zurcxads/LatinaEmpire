import { Link } from "wouter";
import Navbar from "@/components/Navbar";
// Footer is already included in App.tsx
import { Button } from "@/components/ui/button";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";
import { 
  ArrowRight, 
  Heart,
  Brain,
  Coins
} from "lucide-react";

// Testimonial component
interface TestimonialProps {
  name: string;
  title: string;
  quote: string;
  image: string;
  pillar?: "Heart" | "Mind" | "Money";
}

const Testimonial = ({ name, title, quote, image, pillar }: TestimonialProps) => {
  // Map pillars to colors for the tag
  const pillarColors = {
    Heart: "bg-pink-100 text-pink-800 border-pink-200",
    Mind: "bg-indigo-100 text-indigo-800 border-indigo-200",
    Money: "bg-emerald-100 text-emerald-800 border-emerald-200"
  };
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="flex items-start mb-5">
        <div className="relative w-20 h-20 mr-4 flex-shrink-0">
          <img
            src={getImageSrc(image, true)}
            alt={name}
            className="rounded-full object-cover w-full h-full"
            onError={createImageErrorHandler()}
          />
        </div>
        <div>
          <h4 className="font-serif font-bold text-xl">{name}</h4>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          {pillar && (
            <span className={`text-xs px-2 py-0.5 rounded-full border ${pillarColors[pillar]}`}>
              {pillar}
            </span>
          )}
        </div>
      </div>
      <p className="italic text-gray-700 leading-relaxed">{quote}</p>
    </div>
  );
};

// Workshop/Course Card Component
interface CourseCardProps {
  title: string;
  description: string;
  image?: string;
  onClick?: () => void;
}

const CourseCard = ({ title, description, image, onClick }: CourseCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="h-40 bg-gray-100 relative overflow-hidden">
        {image ? (
          <img 
            src={getImageSrc(image, true)} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={createImageErrorHandler()}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"></div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-serif font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <Button
          onClick={onClick}
          variant="outline"
          className="text-sm border-magenta text-magenta hover:bg-magenta hover:text-white transition-all"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

// Programs Page Component
const Programs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white text-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f5f5f5,_transparent)] opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#f8e8f0,_transparent)] opacity-60"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif font-bold text-4xl md:text-6xl mb-6 leading-tight">
              Heart · Mind · Money
            </h1>
            <p className="font-sans text-lg md:text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto">
              Our signature framework for Latina empowerment through healing, clarity, and abundance.
            </p>
            <div className="inline-flex space-x-1 items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-pink-400"></span>
              <span className="w-3 h-3 rounded-full bg-indigo-400 mx-2"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Three Pillars Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">
              Three Pillars of Latina Empowerment
            </h2>
            <p className="font-sans text-gray-700 text-lg">
              Our holistic approach addresses every dimension of your personal and professional growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Heart Pillar */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:border-pink-200 group relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-pink-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center mb-6 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="font-serif font-bold text-2xl mb-4 group-hover:text-pink-600 transition-colors duration-300">Heart</h3>
              <p className="text-gray-700 leading-relaxed mb-8">
                Emotional wellness, healing from within, and rising with self-worth.
              </p>
              <Link href="/programs/heart">
                <Button
                  className="w-full bg-white text-pink-600 hover:bg-pink-600 hover:text-white border border-pink-200 transition-all group-hover:border-pink-400"
                >
                  <span className="mr-2">Explore Heart</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Mind Pillar */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:border-indigo-200 group relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-indigo-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="font-serif font-bold text-2xl mb-4 group-hover:text-indigo-600 transition-colors duration-300">Mind</h3>
              <p className="text-gray-700 leading-relaxed mb-8">
                Mental clarity, mindset development, and leadership elevation.
              </p>
              <Link href="/programs/mind">
                <Button
                  className="w-full bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white border border-indigo-200 transition-all group-hover:border-indigo-400"
                >
                  <span className="mr-2">Explore Mind</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Money Pillar */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:border-emerald-200 group relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-emerald-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                <Coins className="h-8 w-8" />
              </div>
              <h3 className="font-serif font-bold text-2xl mb-4 group-hover:text-emerald-600 transition-colors duration-300">Money</h3>
              <p className="text-gray-700 leading-relaxed mb-8">
                Build financial power, business growth, and wealth access.
              </p>
              <Link href="/programs/money">
                <Button
                  className="w-full bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-all group-hover:border-emerald-400"
                >
                  <span className="mr-2">Explore Money</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Workshops & Courses Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">
              Workshops & Learning Paths
            </h2>
            <p className="font-sans text-gray-700 text-lg">
              Practical learning experiences designed to accelerate your growth in specific areas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <CourseCard 
              title="Financial Freedom Intensive" 
              description="A 6-week program to master your money mindset and create sustainable wealth building practices."
            />
            <CourseCard 
              title="Emotional Healing & Boundaries" 
              description="Learn effective techniques to process emotions and establish healthy boundaries in all relationships."
            />
            <CourseCard 
              title="Latina Leadership Masterclass" 
              description="Develop your authentic leadership style and leverage your cultural strengths in professional settings."
            />
            <CourseCard 
              title="Business Brand Building" 
              description="Create a powerful personal or business brand that resonates with your ideal audience and clients."
            />
            <CourseCard 
              title="Wealth Building for Latinas" 
              description="Practical strategies to build wealth through investments, real estate, and passive income streams."
            />
            <CourseCard 
              title="Community Impact & Legacy" 
              description="Design and implement community initiatives that create generational impact for Latinas."
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">
              Success Stories
            </h2>
            <p className="font-sans text-gray-700 text-lg">
              Hear from women who have transformed their lives through our Heart · Mind · Money framework.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              name="Maria Rodriguez"
              title="Entrepreneur & Community Leader"
              quote="The Heart program helped me heal generations of emotional trauma and finally build the confidence to launch my dream business."
              image="/assets/placeholder-image.png"
              pillar="Heart"
            />
            <Testimonial 
              name="Carmen Vega"
              title="Tech Executive"
              quote="The Mind pillar gave me the tools to overcome imposter syndrome and step into leadership roles I never thought possible for someone like me."
              image="/assets/placeholder-image.png"
              pillar="Mind"
            />
            <Testimonial 
              name="Sofia Hernandez"
              title="Real Estate Investor"
              quote="Thanks to the Money pillar, I've built a 7-figure portfolio that will create generational wealth for my family and community."
              image="/assets/placeholder-image.png"
              pillar="Money"
            />
          </div>
        </div>
      </section>
      
      {/* Final CTA Block */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif font-bold text-3xl md:text-5xl mb-8">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of Latinas who are transforming their lives through our comprehensive programs and supportive community.
            </p>
            <Link href="/join">
              <Button className="bg-magenta hover:bg-magenta/90 text-white px-10 py-6 h-auto rounded-lg text-lg shadow-lg transition-all duration-300">
                Join a Program
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer is rendered in App.tsx */}
    </div>
  );
};

export default Programs;