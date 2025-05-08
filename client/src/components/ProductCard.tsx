import { useState } from "react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format price to always show two decimal places
  const formattedPrice = `$${product.price.toFixed(2)}`;
  
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
        
        {/* Badge indicators */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isBestseller && (
            <Badge className="bg-amber-500 hover:bg-amber-600 text-white">Bestseller</Badge>
          )}
          {product.isNew && (
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">New</Badge>
          )}
          {product.isFeatured && (
            <Badge className="bg-purple-500 hover:bg-purple-600 text-white">Featured</Badge>
          )}
        </div>
      </div>
      
      {/* Product details */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs uppercase tracking-wider text-gray-500 mb-1">{product.category}</span>
        <h3 className="font-bold text-xl mb-2 leading-tight">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="font-medium text-lg">{formattedPrice}</span>
          <Button 
            size="sm" 
            className="bg-magenta hover:bg-magenta/90 text-white rounded-full px-4"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;