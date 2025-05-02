import { ArrowRight, ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductProps {
  title: string;
  image: string;
  price: string;
  url: string;
}

const ProductCard = ({ title, image, price, url }: ProductProps) => {
  return (
    <div className="group relative transition-all duration-300 h-full">
      <Link href={url}>
        <div className="overflow-hidden rounded-xl bg-gray-100 mb-4 aspect-[4/5]">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        </div>
      </Link>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-serif font-bold text-lg">{title}</h3>
          <p className="text-gray-700">{price}</p>
        </div>
        
        <Button size="sm" variant="outline" className="rounded-full h-9 w-9 p-0">
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </div>
    </div>
  );
};

const ShopSection = () => {
  const products: ProductProps[] = [
    {
      title: "Empire Journal",
      image: "https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: "$24.99",
      url: "/shop/empire-journal"
    },
    {
      title: "Heart Mind Money Tee",
      image: "https://images.pexels.com/photos/5325599/pexels-photo-5325599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: "$32.99",
      url: "/shop/heart-mind-money-tee"
    },
    {
      title: "Latina Empowerment Planner",
      image: "https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: "$29.99",
      url: "/shop/latina-empowerment-planner"
    },
    {
      title: "Empire Water Bottle",
      image: "https://images.pexels.com/photos/4116993/pexels-photo-4116993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: "$18.99",
      url: "/shop/empire-water-bottle"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">
                FEATURED PRODUCTS
              </span>
              <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl mb-2 tracking-tight">
                Shop Latina Empire
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Empowering products for your growth, style, and mindset.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product, index) => (
              <ProductCard 
                key={index}
                title={product.title}
                image={product.image}
                price={product.price}
                url={product.url}
              />
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button 
              asChild
              className="bg-magenta hover:bg-magenta/90 text-white rounded-full px-6 py-3 h-auto font-medium"
            >
              <Link href="/shop">
                Visit the Shop
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;