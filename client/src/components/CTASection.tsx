import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">Ready To Transform Your Life?</h2>
          <p className="font-sans text-lg opacity-90 mb-10 max-w-2xl mx-auto">
            Join thousands of Latinas who are changing their lives through our community, coaching, and events.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-magenta text-white px-8 py-6 h-auto rounded font-sans font-semibold text-base hover:bg-opacity-90 w-full sm:w-auto">
              Join Our Community
            </Button>
            <Button variant="outline" className="bg-transparent border-2 border-white text-white px-8 py-6 h-auto rounded font-sans font-semibold text-base hover:bg-white hover:text-black transition-all w-full sm:w-auto">
              Learn About Our Program
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
