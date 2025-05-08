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
    <div className="relative rounded-2xl overflow-hidden shadow-xl group mb-12 border border-gray-100 bg-white hover:shadow-2xl transition-all duration-300">
      <div className="aspect-[16/9] overflow-hidden relative">
        {/* Gradient overlay with animation */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/10 z-10 opacity-40 transition-opacity duration-300 group-hover:opacity-30"></div>
        {/* Soft light effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_70%)] z-20"></div>
        
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.currentTarget.src = "https://images.pexels.com/photos/7709020/pexels-photo-7709020.jpeg";
          }}
        />
        
        {/* Category tag */}
        <div className="absolute top-6 left-6 z-30">
          <Badge className="bg-magenta/90 hover:bg-magenta text-white px-4 py-2 text-sm font-medium rounded-full shadow-lg">
            {post.category}
          </Badge>
        </div>
      </div>
      
      <div className="p-8 md:p-10 relative">
        {/* Small highlight dot design element */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-magenta/5 rounded-full"></div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1.5 text-magenta" />
            {new Date(post.date).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1.5 text-magenta" />
            {post.readTime}
          </span>
        </div>
        
        <h2 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl mb-4 line-clamp-2 leading-tight group-hover:text-magenta transition-colors">
          {post.title}
        </h2>
        
        <p className="text-gray-600 text-lg mb-8 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3"
                alt={post.author}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
                }}
              />
            </div>
            <div>
              <p className="font-medium text-sm">{post.author}</p>
              <p className="text-xs text-gray-500">{post.authorTitle}</p>
            </div>
          </div>
          
          <Link 
            href={`/blog/${post.slug}`} 
            className="inline-flex items-center gap-2 bg-magenta hover:bg-magenta/90 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Read More
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Article card component
const ArticleCard = ({ post }: { post: BlogPost }) => {
  return (
    <div className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:scale-[1.01]">
      <div className="aspect-[16/9] overflow-hidden relative">
        {/* Gradient overlay with animation */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 z-10 opacity-30 transition-opacity duration-300 group-hover:opacity-20"></div>
        
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.currentTarget.src = "https://images.pexels.com/photos/6325/desk-laptop-notebook-pen.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
          }}
        />
        
        {/* Category tag */}
        <div className="absolute top-4 left-4 z-30">
          <Badge className="bg-magenta/90 hover:bg-magenta text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
            {post.category}
          </Badge>
        </div>
      </div>
      
      <div className="p-6 md:p-7 flex flex-col flex-grow">
        <h3 className="font-serif font-bold text-xl md:text-2xl mb-3 leading-tight line-clamp-2 group-hover:text-magenta transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2 flex-grow leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1.5 text-magenta/70" />
            {new Date(post.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          
          <Link 
            href={`/blog/${post.slug}`} 
            className="text-magenta font-medium text-sm inline-flex items-center hover:text-magenta/80 transition-colors"
          >
            Read Article
            <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
    <div className="flex flex-col items-center text-center mb-12">
      <div className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
        <span className="text-xs uppercase tracking-wider font-medium text-magenta flex items-center gap-1.5">
          {icon}
          <span>{title}</span>
        </span>
      </div>
      <h2 className="font-serif font-bold text-3xl md:text-4xl tracking-tight">
        {title}
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-magenta/80 to-magenta/30 mt-4 rounded-full"></div>
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
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black text-white hero-navbar-spacing">
        {/* Empty space for nav bar */}
        <div className="h-16 w-full absolute top-0 left-0 z-20"></div>
        
        {/* Container with padding for rounded corners - Similar to about-founder */}
        <div className="absolute inset-x-8 top-24 bottom-8 rounded-3xl overflow-hidden z-0">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3"
            alt="Latina women reading"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.pexels.com/photos/6146929/pexels-photo-6146929.jpeg";
            }}
          />
        </div>
        
        {/* Radial gradients for depth and visual interest */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#f23889,_transparent)] opacity-20 z-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#140a1f,_transparent)] opacity-40 z-30 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-50 pt-20 md:pt-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm mb-8">
              <span className="text-sm uppercase tracking-wider font-medium text-white">Insights & Wisdom</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
              La Voz de Latina Empire
            </h1>
            <p className="font-sans text-lg md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Powerful stories, business wisdom, and cultural leadership — written for and by Latinas.
            </p>
            <Button className="bg-white text-black hover:bg-white/90 hover:text-magenta rounded-full px-10 py-6 h-auto text-lg transition-all shadow-xl hover:shadow-magenta hover:scale-102">
              <Mail className="mr-2 h-5 w-5" />
              Subscribe to Insights
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Article Section */}
      <section className="section-spacing bg-white">
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
      
      {/* Category Filter Bar - MOVED ABOVE CONTENT SECTIONS */}
      <section className="section-spacing bg-gray-50/80 border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
                <span className="text-xs uppercase tracking-wider font-medium text-magenta">Explore Topics</span>
              </span>
              <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4 tracking-tight">
                Find What Interests You
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Explore our content by category or search for specific topics that resonate with your journey.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <Button className="bg-magenta text-white rounded-full hover:bg-magenta/90 shadow-md hover:shadow-lg transition-all">
                Featured Articles
              </Button>
              
              {blogData.categories.map((category, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  className="rounded-full border-gray-300 hover:border-magenta hover:text-magenta transition-all bg-white/90"
                >
                  {category}
                </Button>
              ))}
              
              {blogData.popularTags.slice(0, 5).map((tag, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  className="rounded-full hover:bg-magenta/10 hover:text-magenta"
                >
                  #{tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* YouTube Video Section - NEW SECTION */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center bg-magenta/10 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
                <span className="text-xs uppercase tracking-wider font-medium text-magenta">Video Content</span>
              </span>
              <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4 tracking-tight">
                Watch Latina Empire on YouTube
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                See behind-the-scenes moments, interviews, and video insights from our community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Video Card 1 */}
              <div className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white border border-gray-100">
                <div className="aspect-video relative overflow-hidden">
                  {/* Thumbnail with play button overlay */}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="w-16 h-16 bg-magenta/90 rounded-full flex items-center justify-center">
                      <div className="ml-1 w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent"></div>
                    </div>
                  </div>
                  <img 
                    src="https://images.pexels.com/photos/7742774/pexels-photo-7742774.jpeg" 
                    alt="Latina Empire Leadership Summit" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.pexels.com/photos/7742774/pexels-photo-7742774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-bold text-xl mb-4 line-clamp-2 leading-tight">
                    Leadership Summit 2023: Building Your Empire From Scratch
                  </h3>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-white text-magenta border border-magenta hover:bg-magenta hover:text-white transition-colors px-5 py-2 rounded-full text-sm font-medium"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
              
              {/* Video Card 2 */}
              <div className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white border border-gray-100">
                <div className="aspect-video relative overflow-hidden">
                  {/* Thumbnail with play button overlay */}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="w-16 h-16 bg-magenta/90 rounded-full flex items-center justify-center">
                      <div className="ml-1 w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent"></div>
                    </div>
                  </div>
                  <img 
                    src="https://images.pexels.com/photos/7709020/pexels-photo-7709020.jpeg" 
                    alt="Latina Empire Financial Masterclass" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.pexels.com/photos/7709020/pexels-photo-7709020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-bold text-xl mb-4 line-clamp-2 leading-tight">
                    Financial Masterclass: Investing Strategies for Latina Entrepreneurs
                  </h3>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-white text-magenta border border-magenta hover:bg-magenta hover:text-white transition-colors px-5 py-2 rounded-full text-sm font-medium"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
              
              {/* Video Card 3 */}
              <div className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white border border-gray-100">
                <div className="aspect-video relative overflow-hidden">
                  {/* Thumbnail with play button overlay */}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="w-16 h-16 bg-magenta/90 rounded-full flex items-center justify-center">
                      <div className="ml-1 w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent"></div>
                    </div>
                  </div>
                  <img 
                    src="https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg" 
                    alt="Latina Empire Interviews" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-bold text-xl mb-4 line-clamp-2 leading-tight">
                    Interview Series: Conversations with Successful Latina Leaders
                  </h3>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-white text-magenta border border-magenta hover:bg-magenta hover:text-white transition-colors px-5 py-2 rounded-full text-sm font-medium"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-magenta hover:bg-magenta/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                View YouTube Channel
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trending Now Section */}
      <section className="section-spacing bg-white">
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
      <section className="section-spacing bg-white">
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
      <section className="section-spacing bg-white">
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
      <section className="section-spacing bg-white">
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
      <section className="relative section-spacing overflow-hidden bg-black text-white">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/80 z-10"></div>
          {/* Radial gradient for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#d81b60,_transparent)] opacity-10 z-20"></div>
          {/* Fade effect at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20"></div>
          <img 
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3"
            alt="Women sharing stories" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-30">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm mb-8">
              <span className="text-sm uppercase tracking-wider font-medium text-white">Join Our Community</span>
            </div>
            <h2 className="font-serif font-bold text-3xl md:text-5xl lg:text-6xl mb-8 leading-tight">
              Want more stories like this?
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Join our community of powerful Latina leaders and get exclusive content delivered straight to your inbox.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Button 
                onClick={() => {
                  // Open join modal or navigate to join page
                  setLocation("/join");
                }}
                className="bg-magenta hover:bg-magenta/90 text-white px-10 py-6 h-auto rounded-full text-lg shadow-xl transition-all duration-300 hover:shadow-magenta hover:scale-102"
              >
                Join the Empire
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                className="bg-transparent text-white border border-white/30 hover:bg-white/10 px-8 py-6 h-auto rounded-full text-lg transition-all duration-300 backdrop-blur-sm hover:border-white/80"
              >
                <Mail className="mr-2 h-5 w-5" />
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog;