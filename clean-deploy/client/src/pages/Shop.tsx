import { useState, useEffect } from "react";
import { Link } from "wouter";
import { products, getProductsByCategory, getBestsellerProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
// Footer is already included in App.tsx
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag,
  ArrowRight,
  Circle
} from "lucide-react";

// Category type for tab filtering
type Category = 'All' | 'Books' | 'Digital' | 'Journals' | 'Supplements' | 'Apparel';

const Shop = () => {
  // State for category filtering
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [bestsellerProducts, setBestsellerProducts] = useState(getBestsellerProducts());
  
  // Update filtered products when category changes
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(getProductsByCategory(activeCategory));
    }
  }, [activeCategory]);
  
  // List of all available categories
  const categories: Category[] = ['All', 'Books', 'Digital', 'Journals', 'Supplements', 'Apparel'];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-black via-black/90 to-magenta/30 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center gap-2 justify-center mb-4">
              <Circle className="w-2 h-2 fill-magenta text-magenta" />
              <span className="uppercase tracking-widest text-sm">MANA BOUTIQUE</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif mb-6">
              Explore Products &<br/>Programs
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Turn any hour of the day into an opportunity for transformation with resources from 
              the number one personal development program of all time.
            </p>
            
            <Button className="bg-magenta hover:bg-magenta/90 text-white rounded-full text-lg py-6 px-10">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop All
            </Button>
          </div>
        </div>
      </section>
      
      {/* Category Filter Tabs */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-10 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-center flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full text-sm px-6 ${
                  activeCategory === category 
                    ? 'bg-magenta hover:bg-magenta/90 text-white' 
                    : 'text-gray-700 hover:text-magenta hover:border-magenta'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-medium text-gray-700 mb-4">No products found</h3>
              <p className="text-gray-500 mb-6">We couldn't find any products in this category.</p>
              <Button 
                onClick={() => setActiveCategory('All')}
                className="bg-magenta hover:bg-magenta/90 text-white"
              >
                View All Products
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-serif font-bold mb-8">
                {activeCategory === 'All' ? 'All Products' : `${activeCategory}`}
                <span className="text-gray-400 ml-2 text-lg">({filteredProducts.length})</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Bestsellers Highlight Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold">Bestsellers</h2>
            <Link href="/shop" className="text-magenta hover:text-magenta/80 font-medium flex items-center gap-1">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bestsellerProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
              Own Your Empowerment
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join our exclusive community of powerful Latina leaders and gain access to premium resources,
              special events, and connection with like-minded women.
            </p>
            <Link href="/join">
              <Button className="bg-magenta hover:bg-magenta/90 text-white rounded-full text-lg py-6 px-10">
                Join the Empire
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer is rendered in App.tsx */}
    </div>
  );
};

export default Shop;