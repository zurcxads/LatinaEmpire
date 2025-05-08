export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Books' | 'Digital' | 'Journals' | 'Supplements' | 'Apparel';
  image: string;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
}

// Sample product data
export const products: Product[] = [
  {
    id: "1",
    name: "Empire Journal",
    description: "Premium journal with prompts to help you track goals, gratitude, and growth.",
    price: 24.99,
    category: "Journals",
    image: "/assets/placeholder-image.png",
    isBestseller: true
  },
  {
    id: "2",
    name: "Heart Mind Money Tee",
    description: "Soft cotton tee with the Heart · Mind · Money mantra.",
    price: 32.99,
    category: "Apparel",
    image: "/assets/placeholder-image.png",
    isFeatured: true
  },
  {
    id: "3",
    name: "Latina Empowerment Planner",
    description: "12-month planner with goal-setting frameworks and inspiration.",
    price: 29.99,
    category: "Journals",
    image: "/assets/placeholder-image.png",
    isBestseller: true
  },
  {
    id: "4",
    name: "Empire Water Bottle",
    description: "Sustainable water bottle with motivational time markers.",
    price: 18.99,
    category: "Apparel",
    image: "/assets/placeholder-image.png"
  },
  {
    id: "5",
    name: "Digital Vision Board Kit",
    description: "Create your own digital vision board with our templates and guides.",
    price: 14.99,
    category: "Digital",
    image: "/assets/placeholder-image.png",
    isFeatured: true
  },
  {
    id: "6",
    name: "Unbreakable: Latina Edition",
    description: "Bestselling book about building resilience and finding your power.",
    price: 22.99,
    category: "Books",
    image: "/assets/placeholder-image.png",
    isBestseller: true
  },
  {
    id: "7",
    name: "Mindful Leadership Meditation Pack",
    description: "Digital download with 5 guided meditations for leadership presence.",
    price: 19.99,
    category: "Digital",
    image: "/assets/placeholder-image.png"
  },
  {
    id: "8",
    name: "Rise & Conquer Morning Journal",
    description: "Start your day with purpose using our structured morning journal.",
    price: 22.99,
    category: "Journals",
    image: "/assets/placeholder-image.png"
  },
  {
    id: "9",
    name: "Collagen Beauty Supplement",
    description: "Premium collagen supplement for hair, skin, and nails.",
    price: 39.99,
    category: "Supplements",
    image: "/assets/placeholder-image.png",
    isNew: true
  },
  {
    id: "10",
    name: "Immune Support Vitamin Pack",
    description: "Daily vitamin pack to support immune health and energy.",
    price: 34.99,
    category: "Supplements",
    image: "/assets/placeholder-image.png"
  },
  {
    id: "11",
    name: "Empire Notebook Set",
    description: "Set of 3 matching notebooks for different areas of your life.",
    price: 19.99,
    category: "Journals",
    image: "/assets/placeholder-image.png"
  },
  {
    id: "12",
    name: "Latina Leadership Hoodie",
    description: "Cozy hoodie with empowering message on the back.",
    price: 49.99,
    category: "Apparel",
    image: "/assets/placeholder-image.png",
    isNew: true
  }
];

// Helper functions to filter products
export const getProductsByCategory = (category: string | null): Product[] => {
  if (!category || category === 'All') return products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getBestsellerProducts = (): Product[] => {
  return products.filter(product => product.isBestseller);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};