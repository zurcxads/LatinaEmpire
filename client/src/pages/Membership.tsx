import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Users, Calendar, BookOpen, Zap, Globe, Star, 
  Check, ArrowRight, Circle, Crown, 
  Video, HeartHandshake 
} from "lucide-react";

// Benefit card component
const BenefitCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      {/* Icon */}
      <div className="w-12 h-12 bg-magenta/10 rounded-full flex items-center justify-center mb-4 text-magenta group-hover:bg-magenta group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      
      {/* Content */}
      <h3 className="font-sans font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

// Membership tier component
const MembershipTier = ({ 
  title, 
  price, 
  billingPeriod,
  description, 
  features,
  isPopular,
  ctaText,
  ctaHref
}: { 
  title: string;
  price: string;
  billingPeriod: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaHref: string;
}) => {
  return (
    <div className={`rounded-xl overflow-hidden h-full transition-all duration-300 ${
      isPopular 
        ? 'shadow-xl hover:shadow-2xl border-2 border-magenta transform hover:-translate-y-1' 
        : 'shadow-md hover:shadow-lg border border-gray-200'
    }`}>
      {/* Popular badge */}
      {isPopular && (
        <div className="bg-magenta text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 text-center">
          Most Popular
        </div>
      )}
      
      {/* Header */}
      <div className={`p-6 ${isPopular ? 'bg-magenta/10' : 'bg-gray-50'}`}>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="flex items-baseline mb-2">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-sm text-gray-500 ml-1">/{billingPeriod}</span>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      
      {/* Features */}
      <div className="p-6 bg-white flex flex-col h-full">
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className={`h-5 w-5 mr-2 flex-shrink-0 ${isPopular ? 'text-magenta' : 'text-green-600'}`} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA */}
        <Link href={ctaHref}>
          <Button className={`w-full py-6 ${
            isPopular 
              ? 'bg-magenta hover:bg-magenta/90 text-white' 
              : 'bg-white border-2 border-magenta text-magenta hover:bg-magenta/10'
          }`}>
            {ctaText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

// Testimonial component
const MemberTestimonial = ({
  quote,
  name,
  role,
  image
}: {
  quote: string;
  name: string;
  role: string;
  image: string;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 relative">
      {/* Quotation mark */}
      <div className="absolute -top-4 -left-4 w-10 h-10 bg-magenta rounded-full flex items-center justify-center text-white font-serif text-2xl">
        "
      </div>
      
      <div className="pt-4">
        <p className="text-gray-700 italic mb-6">{quote}</p>
        
        <div className="flex items-center">
          <img 
            src={image} 
            alt={name} 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="font-bold">{name}</h4>
            <p className="text-gray-600 text-sm">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Membership = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-black to-magenta/50 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center gap-2 justify-center mb-4">
              <Circle className="w-2 h-2 fill-magenta text-magenta" />
              <span className="uppercase tracking-widest text-sm">EXCLUSIVE ACCESS</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif mb-6">
              Join the Movement
            </h1>
            
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Access exclusive resources, mentorship, and a global community of empowered Latinas.
            </p>
            
            <Link href="/join">
              <Button className="bg-magenta hover:bg-magenta/90 text-white rounded-full text-lg py-6 px-10">
                Become a Member
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Join Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Why Join?</h2>
            <p className="text-xl text-gray-600">
              Become part of a powerful network designed to help Latina leaders thrive personally and professionally.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BenefitCard 
              icon={<Calendar className="h-6 w-6" />}
              title="Monthly Calls"
              description="Connect with mentors and peers through structured group calls for guidance and support."
            />
            
            <BenefitCard 
              icon={<Video className="h-6 w-6" />}
              title="Exclusive Workshops"
              description="Access workshops and training sessions only available to members."
            />
            
            <BenefitCard 
              icon={<BookOpen className="h-6 w-6" />}
              title="Digital Library"
              description="Unlimited access to templates, masterclasses, and educational resources."
            />
            
            <BenefitCard 
              icon={<Globe className="h-6 w-6" />}
              title="Global Sisterhood"
              description="Join a community-led accountability network that spans across countries."
            />
          </div>
        </div>
      </section>
      
      {/* Membership Tiers */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Membership Tiers</h2>
            <p className="text-xl text-gray-600">
              Choose the level of access and support that fits your journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <MembershipTier 
              title="Free Access"
              price="$0"
              billingPeriod="month"
              description="Perfect for those just beginning their journey"
              features={[
                "Access to blog content",
                "Podcast episodes",
                "Basic community forum access",
                "Monthly newsletter"
              ]}
              ctaText="Join Free"
              ctaHref="/join?plan=free"
            />
            
            <MembershipTier 
              title="VIP"
              price="$49"
              billingPeriod="month"
              description="Enhanced access and resources for committed members"
              features={[
                "All Free features",
                "VIP events access",
                "Monthly group coaching calls",
                "Member directory access",
                "Exclusive digital resources"
              ]}
              isPopular={true}
              ctaText="Join VIP"
              ctaHref="/join?plan=vip"
            />
            
            <MembershipTier 
              title="Premium"
              price="$499"
              billingPeriod="year"
              description="The complete experience for serious leaders"
              features={[
                "All VIP features",
                "Quarterly merchandise box",
                "1:1 mentoring sessions",
                "VIP event discounts",
                "Featured member profile",
                "Early access to new content"
              ]}
              ctaText="Go Premium"
              ctaHref="/join?plan=premium"
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Member Success Stories</h2>
            <p className="text-xl text-gray-600">
              Hear from women who have transformed their lives through our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <MemberTestimonial 
              quote="Since joining the Latina Empire, I've connected with mentors who helped me launch my business with confidence. The resources and community support have been invaluable."
              name="Maria Rodriguez"
              role="Business Owner, VIP Member"
              image="/assets/placeholder-image.png"
            />
            
            <MemberTestimonial 
              quote="The Premium membership has paid for itself many times over. The connections I've made and the skills I've developed through the workshops have directly contributed to my career advancement."
              name="Isabella Martinez"
              role="Marketing Director, Premium Member"
              image="/assets/placeholder-image.png"
            />
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
              Claim Your Seat at the Table
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join a community of powerful Latina leaders who are changing the world through leadership, innovation, and connection.
            </p>
            <Link href="/join">
              <Button className="bg-magenta hover:bg-magenta/90 text-white rounded-full text-lg py-6 px-10">
                Join Latina Empire
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Membership;