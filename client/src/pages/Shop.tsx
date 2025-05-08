import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Shop = () => {
  return (
    <div className="container max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-center">Latina Empire Shop</h1>
      <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
        Browse our collection of exclusive merchandise and products that celebrate and empower Latina leadership.
      </p>

      {/* Placeholder content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
              <div className="text-3xl text-gray-400">Product Image</div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">Product {idx + 1}</h3>
              <p className="text-gray-600 mb-4">
                Description for this amazing product that empowers Latina leaders.
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">$29.99</span>
                <Button className="primary-button text-sm">Add to Cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button asChild className="primary-button px-8 py-6 text-lg">
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Shop;