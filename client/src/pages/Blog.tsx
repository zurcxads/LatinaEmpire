import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { blogService, BlogPost, BlogResponse } from "@/lib/blogService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Calendar, 
  Clock, 
  Flame,
  Briefcase,
  Brain,
  Heart,
  ChevronRight,
  ArrowRight, 
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Featured article component
const FeaturedArticle = ({ post }: { post: BlogPost }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg group mb-8">
      <div className="aspect-[16/9] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      
      <div className="p-6 bg-white">
        <Badge className="mb-3 bg-magenta hover:bg-magenta/90">
          {post.category}
        </Badge>
        
        <h2 className="font-sans font-bold text-2xl md:text-3xl mb-4 line-clamp-2 group-hover:text-magenta transition-colors">
          {post.title}
        </h2>
        
        <p className="text-gray-600 mb-6 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime}
            </span>
          </div>
          
          <Link 
            href={`/blog/${post.slug}`} 
            className="inline-flex items-center gap-2 bg-magenta hover:bg-magenta/90 text-white px-5 py-2 rounded-full font-medium transition-colors text-sm"
          >
            Read More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Article card component
const ArticleCard = ({ post }: { post: BlogPost }) => {
  return (
    <div className="group h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="aspect-[16/9] overflow-hidden relative">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <Badge className="mb-3 w-fit bg-magenta hover:bg-magenta/90">
          {post.category}
        </Badge>
        
        <h3 className="font-sans font-bold text-xl mb-3 line-clamp-2 group-hover:text-magenta transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric'
            })}
          </div>
          
          <Link 
            href={`/blog/${post.slug}`} 
            className="text-magenta font-medium text-sm group-hover:underline inline-flex items-center"
          >
            Read
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Section header with icon component
const SectionHeader = ({ 
  icon, 
  title 
}: { 
  icon: React.ReactNode, 
  title: string 
}) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-magenta/10 text-magenta p-2 rounded-full">
        {icon}
      </div>
      <h2 className="font-serif font-bold text-2xl">{title}</h2>
    </div>
  );
};

// Main Blog component
const Blog = () => {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState<BlogResponse>({
    blog: [],
    categories: [],
    popularTags: []
  });
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  
  const businessPosts = blogData.blog.filter(post => 
    post.category === "Career Development" || 
    post.category === "Professional Growth" || 
    post.category === "Financial Wellness");
  
  const mindsetPosts = blogData.blog.filter(post => 
    post.category === "Leadership" || 
    post.category === "Work-Life Balance");
  
  const communityCulturePosts = blogData.blog.filter(post => 
    post.category === "Health" ||
    post.category === "Relationships");
  
  // Fetch blog data
  useEffect(() => {
    const fetchBlogData = async () => {
      setIsLoading(true);
      try {
        const data = await blogService.getAllPosts();
        setBlogData(data);
        
        // Set featured post to the first featured post or first post if none is featured
        const featured = data.blog.find(post => post.featured) || data.blog[0];
        setFeaturedPost(featured);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlogData();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-black to-magenta/90 text-white pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-tight">
              La Voz de Latina Empire
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Insights, stories, and resources to fuel your growth in business, wealth, and purpose.
            </p>
            <Button className="bg-white text-black hover:bg-white/90 rounded-full px-10 py-3 h-auto text-lg transition-all shadow-xl">
              <Mail className="mr-2 h-5 w-5" />
              Subscribe for Updates
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Article Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="max-w-4xl mx-auto">
              <div className="w-full aspect-[16/9] bg-gray-200 rounded-xl animate-pulse mb-4"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-1/3 animate-pulse mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-full animate-pulse mb-2"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-2/3 animate-pulse mb-4"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-40 animate-pulse"></div>
            </div>
          ) : featuredPost ? (
            <div className="max-w-4xl mx-auto">
              <FeaturedArticle post={featuredPost} />
            </div>
          ) : null}
        </div>
      </section>
      
      {/* Trending Now Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            icon={<Flame className="h-6 w-6" />}
            title="Trending Now"
          />
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogData.blog.slice(0, 3).map(post => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Business & Wealth Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            icon={<Briefcase className="h-6 w-6" />}
            title="Business & Wealth"
          />
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {businessPosts.slice(0, 3).map(post => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Mindset & Growth Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            icon={<Brain className="h-6 w-6" />}
            title="Mindset & Growth"
          />
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mindsetPosts.slice(0, 3).map(post => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Cultura & Community Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            icon={<Heart className="h-6 w-6" />}
            title="Cultura & Community"
          />
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {communityCulturePosts.slice(0, 3).map(post => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl mb-8">
              Want more stories like this?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join our community of powerful Latina leaders and get exclusive content delivered straight to your inbox.
            </p>
            <Button 
              onClick={() => {
                // Open join modal or navigate to join page
                setLocation("/join");
              }}
              className="bg-magenta hover:bg-magenta/90 text-white font-semibold text-lg py-6 px-10 rounded-lg transition-all shadow-2xl"
            >
              Join the Empire
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog;