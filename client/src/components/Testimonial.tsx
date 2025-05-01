const Testimonial = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-center mb-16">Meet Our Community</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1573497161161-c3e73707e25c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Latina businesswoman smiling" 
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <blockquote className="font-serif text-2xl italic mb-6">
                "Joining Latina Empire transformed not just my career, but my entire perspective on what's possible. The community support and coaching gave me the confidence to launch my own business."
              </blockquote>
              <div className="flex items-center">
                <div>
                  <p className="font-sans font-semibold">Maria Rodriguez</p>
                  <p className="font-sans text-sm text-gray-600">Entrepreneur & Community Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
