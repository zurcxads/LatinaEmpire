import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
// Footer is already included in App.tsx
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
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black text-white">
        {/* Empty space for nav bar */}
        <div className="h-16 w-full absolute top-0 left-0 z-20"></div>
        
        {/* Container with padding for rounded corners - Similar to about-founder */}
        <div className="absolute inset-x-8 top-24 bottom-8 rounded-3xl overflow-hidden z-0">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
          <img 
            src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg"
            alt="Latina Leaders in Conference"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.pexels.com/photos/7096497/pexels-photo-7096497.jpeg";
            }}
          />
        </div>
        
        {/* Radial gradients for depth and visual interest */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#f23889,_transparent)] opacity-20 z-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#140a1f,_transparent)] opacity-40 z-30 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-50 pt-20 md:pt-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm mb-8">
              <span className="text-sm uppercase tracking-wider font-medium text-white">Premium Access</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
              Join the Latina Empire
            </h1>
            <p className="font-sans text-lg md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Choose your path. Unlock your access. Build your legacy.
            </p>
            <Link href="/join">
              <Button className="bg-white text-black hover:bg-white/90 hover:text-magenta rounded-full px-10 py-6 h-auto text-lg transition-all shadow-xl hover:shadow-magenta hover:scale-102">
                Become a Member
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Join Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-magenta/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-magenta/5 rounded-full translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
              <span className="text-xs uppercase tracking-wider font-medium text-magenta">Your Membership Benefits</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-5 tracking-tight">
              Why Join Latina Empire?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Become part of a powerful network designed to help Latina leaders thrive personally and professionally.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Enhanced BenefitCard component */}
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 hover:border-magenta/20 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-magenta to-magenta/70 rounded-xl flex items-center justify-center shadow-md mb-5">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3 group-hover:text-magenta transition-colors">
                Exclusive Workshops
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access to training and development programs others pay thousands for. Learn from industry experts.
              </p>
            </div>
            
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 hover:border-magenta/20 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-magenta to-magenta/70 rounded-xl flex items-center justify-center shadow-md mb-5">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3 group-hover:text-magenta transition-colors">
                Community Calls
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with mentors and peers through structured group calls for guidance, support and network expansion.
              </p>
            </div>
            
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 hover:border-magenta/20 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-magenta to-magenta/70 rounded-xl flex items-center justify-center shadow-md mb-5">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3 group-hover:text-magenta transition-colors">
                Digital Vault
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Unlimited access to templates, masterclasses, replays, and educational resources for your success.
              </p>
            </div>
            
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 hover:border-magenta/20 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-magenta to-magenta/70 rounded-xl flex items-center justify-center shadow-md mb-5">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-3 group-hover:text-magenta transition-colors">
                VIP Benefits
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Event discounts, exclusive merchandise, priority access to new programs, and private community spaces.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Membership Tiers */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-magenta/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-magenta/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
              <span className="text-xs uppercase tracking-wider font-medium text-magenta">Select Your Plan</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-5 tracking-tight">
              Membership Tiers
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose the level of access and support that fits your journey and ambitions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-300 flex flex-col h-full">
              <div className="p-8 bg-gray-50 border-b border-gray-100">
                <h3 className="font-serif font-bold text-2xl mb-3">Free Access</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-sm text-gray-500 ml-1">/month</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Perfect for those just beginning their journey
                </p>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <ul className="space-y-4 mb-8 flex-grow">
                  {[
                    "Access to blog content",
                    "Podcast episodes",
                    "Basic community forum access",
                    "Monthly newsletter"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/join?plan=free">
                  <Button className="w-full rounded-full bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300 py-6">
                    Join Free
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* VIP Tier */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-magenta flex flex-col h-full transform hover:-translate-y-1 relative">
              <div className="bg-magenta text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 text-center">
                Most Popular
              </div>
              
              <div className="p-8 bg-magenta/10 border-b border-magenta/20">
                <h3 className="font-serif font-bold text-2xl mb-3">VIP Member</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold">$49</span>
                  <span className="text-sm text-gray-500 ml-1">/month</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Enhanced access and resources for committed members
                </p>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <ul className="space-y-4 mb-8 flex-grow">
                  {[
                    "All Free features",
                    "VIP events access",
                    "Monthly group coaching calls",
                    "Member directory access",
                    "Exclusive digital resources"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-magenta flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/join?plan=vip">
                  <Button className="w-full rounded-full bg-magenta hover:bg-magenta/90 text-white py-6">
                    Join VIP
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Premium Tier */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-300 flex flex-col h-full">
              <div className="p-8 bg-gray-50 border-b border-gray-100">
                <h3 className="font-serif font-bold text-2xl mb-3">Premium Empire</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold">$499</span>
                  <span className="text-sm text-gray-500 ml-1">/year</span>
                </div>
                <p className="text-gray-600 text-sm">
                  The complete experience for serious leaders
                </p>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <ul className="space-y-4 mb-8 flex-grow">
                  {[
                    "All VIP features",
                    "Quarterly merchandise box",
                    "1:1 mentoring sessions",
                    "VIP event discounts",
                    "Featured member profile",
                    "Early access to new content"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/join?plan=premium">
                  <Button className="w-full rounded-full bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300 py-6">
                    Go Premium
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-magenta/5 rounded-full translate-x-1/3"></div>
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-magenta/5 rounded-full -translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
              <span className="text-xs uppercase tracking-wider font-medium text-magenta">Real Results</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-5 tracking-tight">
              Member Success Stories
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hear from women who have transformed their lives through our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Enhanced testimonial cards */}
            <div className="bg-white rounded-2xl shadow-xl p-8 relative border border-gray-100">
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-gradient-to-br from-magenta to-magenta/70 rounded-full flex items-center justify-center text-white font-serif text-2xl shadow-lg">
                "
              </div>
              
              <div className="pt-4">
                <p className="text-gray-700 italic mb-8 text-lg leading-relaxed">
                  "Since joining the Latina Empire, I've connected with mentors who helped me launch my business with confidence. The resources and community support have been invaluable."
                </p>
                
                <div className="flex items-center mt-4 border-t border-gray-100 pt-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-magenta/20">
                    <img 
                      src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150"
                      alt="Maria Rodriguez" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/placeholder-image.png";
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Maria Rodriguez</h4>
                    <p className="text-magenta text-sm">Business Owner, VIP Member</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 relative border border-gray-100">
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-gradient-to-br from-magenta to-magenta/70 rounded-full flex items-center justify-center text-white font-serif text-2xl shadow-lg">
                "
              </div>
              
              <div className="pt-4">
                <p className="text-gray-700 italic mb-8 text-lg leading-relaxed">
                  "The Premium membership has paid for itself many times over. The connections I've made and the skills I've developed through the workshops have directly contributed to my career advancement."
                </p>
                
                <div className="flex items-center mt-4 border-t border-gray-100 pt-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-magenta/20">
                    <img 
                      src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"
                      alt="Isabella Martinez" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/placeholder-image.png";
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Isabella Martinez</h4>
                    <p className="text-magenta text-sm">Marketing Director, Premium Member</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black z-10"></div>
          
          {/* Radial gradient for visual interest */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#f23889,_transparent)] opacity-10 z-20 pointer-events-none"></div>
          
          {/* Background image */}
          <img 
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
            alt="Latina Leaders Collaborating"
            className="w-full h-full object-cover absolute inset-0"
            onError={(e) => {
              e.currentTarget.src = "https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg";
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8 text-white leading-tight tracking-tight">
              Claim Your Seat <br/>at the Table
            </h2>
            
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join a community of powerful Latina leaders who are changing the world through leadership, innovation, and connection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/join">
                <Button className="bg-white text-black hover:bg-white/90 hover:text-magenta rounded-full px-10 py-6 h-auto text-lg font-medium transition-all shadow-xl hover:shadow-white/30">
                  Join Latina Empire
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button variant="outline" className="bg-transparent text-white border-2 border-white/50 hover:border-white rounded-full px-10 py-6 h-auto text-lg transition-all">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer is rendered in App.tsx */}
    </div>
  );
};

export default Membership;