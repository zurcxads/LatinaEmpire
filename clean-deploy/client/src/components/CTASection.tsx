import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import JoinModal from "./JoinModal";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";

const CTASection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <JoinModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      
      {/* First CTA Section - Webinar Promotion */}
      <section className="py-12 sm:py-16 md:py-20 bg-black text-white relative overflow-hidden">
        {/* Background design elements */}
        <div className="absolute -top-40 -right-40 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-magenta/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-magenta/10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-5 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-3">
              <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-2 sm:mb-3 inline-block">FREE MASTERCLASS</span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 leading-tight">
                Unlock Your Latina Power: 5 Keys to Success in Business & Life
              </h2>
              <p className="font-sans text-base sm:text-lg opacity-90 mb-6 sm:mb-8 max-w-2xl">
                Join our founder for a free 60-minute webinar revealing the proven framework that has helped thousands of Latinas transform their careers and businesses.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-white/5 p-4 sm:p-5 rounded-lg border border-white/10">
                  <div className="font-serif font-bold text-lg sm:text-xl mb-1">May 15, 2025</div>
                  <div className="text-white/70 text-sm sm:text-base">7:00 PM EST / 4:00 PM PST</div>
                </div>
                <div className="bg-white/5 p-4 sm:p-5 rounded-lg border border-white/10">
                  <div className="font-serif font-bold text-lg sm:text-xl mb-1">May 22, 2025</div>
                  <div className="text-white/70 text-sm sm:text-base">1:00 PM EST / 10:00 AM PST</div>
                </div>
              </div>
              
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-black px-6 sm:px-8 py-4 sm:py-6 h-auto rounded-full font-sans font-semibold text-base sm:text-lg hover:bg-gray-100 shadow-md inline-flex items-center w-full sm:w-auto justify-center sm:justify-start"
              >
                Register for Free Webinar
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </Button>
            </div>
            
            <div className="lg:col-span-2">
              <div className="rounded-lg overflow-hidden border-8 border-white/10 shadow-2xl">
                <img 
                  src={getImageSrc("https://images.unsplash.com/photo-1551836022-deb4988cc6c0", true)} 
                  alt="Free Masterclass" 
                  className="w-full h-full object-cover"
                  onError={createImageErrorHandler()}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Second CTA Section - Program Signup */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-2 sm:mb-3 inline-block">LIMITED TIME OFFER</span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 leading-tight">Ready To Transform Your Life?</h2>
            <p className="font-sans text-base sm:text-lg opacity-90 mb-5 sm:mb-6 max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
              Join thousands of Latinas who are changing their lives through our Elite Program. 
              Enrollment closes May 31st.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8 md:mb-10">
              <div className="bg-white/5 rounded-lg p-4 sm:p-5 md:p-6 border border-white/10">
                <div className="font-serif font-bold text-lg sm:text-xl mb-1 sm:mb-2">LIMITED</div>
                <div className="text-white/80 text-sm sm:text-base">Early Bird Offer</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 sm:p-5 md:p-6 border border-white/10">
                <div className="font-serif font-bold text-lg sm:text-xl mb-1 sm:mb-2">12</div>
                <div className="text-white/80 text-sm sm:text-base">Weeks of Training</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 sm:p-5 md:p-6 border border-white/10">
                <div className="font-serif font-bold text-lg sm:text-xl mb-1 sm:mb-2">100%</div>
                <div className="text-white/80 text-sm sm:text-base">Money-Back Guarantee</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-black px-6 sm:px-8 py-4 sm:py-6 h-auto rounded-full font-sans font-semibold text-base sm:text-lg hover:bg-gray-100 shadow-md w-full sm:w-auto"
              >
                Join the Elite Program
              </Button>
              <Button 
                variant="outline" 
                className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-4 sm:py-6 h-auto rounded-full font-sans font-semibold text-base sm:text-lg hover:bg-white hover:text-black transition-all w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;
