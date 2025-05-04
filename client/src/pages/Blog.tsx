import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { blogService, BlogPost, BlogResponse } from "@/lib/blogService";
import { 
  Calendar, 
  Clock, 
  Search, 
  Tag,
  ArrowRight, 
  ChevronRight,
  ChevronLeft,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

// Featured post section (hero style)
const FeaturedPost = ({ post }: { post: BlogPost }) => {
  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg group">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${post.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-10">
        <div className="mb-3">
          <span className="uppercase tracking-wider text-sm text-white/70">{post.category}</span>
        </div>
        
        <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight group-hover:text-magenta transition-colors">
          {post.title}
        </h2>
        
        <p className="text-white/80 text-base md:text-lg max-w-3xl mb-6">
          {post.excerpt.length > 140 
            ? post.excerpt.slice(0, 140) + '...' 
            : post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-white/70 text-sm">
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
            className="text-white border border-white/30 hover:border-magenta hover:bg-magenta hover:text-white rounded-full px-4 py-2 text-sm transition-colors flex items-center gap-1.5"
          >
            Read More
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      
      <div className="absolute top-6 left-6 z-10">
        <span className="inline-flex h-2 w-2 rounded-full bg-magenta mr-2"></span>
        <span className="text-white text-xs font-medium uppercase tracking-wider">Featured</span>
      </div>
    </div>
  );
};

// Regular blog post card
const BlogPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group h-full flex flex-col">
      <div className="h-48 relative overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center space-x-3 mb-3">
          <Badge className="bg-magenta hover:bg-magenta/90">{post.category}</Badge>
          <span className="text-gray-500 text-xs">{post.readTime}</span>
        </div>
        
        <h3 className="font-serif font-bold text-xl mb-3 group-hover:text-magenta transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {post.excerpt.length > 120 
            ? post.excerpt.slice(0, 120) + '...' 
            : post.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </div>
          
          <Link href={`/blog/${post.slug}`} className="text-magenta hover:underline text-sm font-medium group flex items-center">
            Read More
            <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Blog list section
const BlogList = ({ 
  posts, 
  isLoading 
}: { 
  posts: BlogPost[], 
  isLoading: boolean 
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl h-96 animate-pulse"></div>
        ))}
      </div>
    );
  }
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-medium text-gray-700 mb-4">No posts found</h3>
        <p className="text-gray-500">Try adjusting your filters or search terms</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map(post => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

// Sidebar components
const SearchBox = ({ 
  searchTerm, 
  setSearchTerm, 
  onSearch 
}: { 
  searchTerm: string, 
  setSearchTerm: (term: string) => void,
  onSearch: () => void
}) => {
  return (
    <div className="mb-8">
      <h3 className="font-serif font-bold text-xl mb-4">Search</h3>
      <div className="flex gap-2">
        <Input 
          placeholder="Search articles..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          className="flex-1"
        />
        <Button 
          onClick={onSearch}
          variant="default" 
          size="icon"
          className="bg-magenta hover:bg-magenta/90"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const CategoriesList = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: { 
  categories: string[], 
  selectedCategory: string | null,
  onSelectCategory: (category: string | null) => void
}) => {
  return (
    <div className="mb-8">
      <h3 className="font-serif font-bold text-xl mb-4">Categories</h3>
      <div className="space-y-2">
        <div 
          className={`cursor-pointer hover:text-magenta transition-colors ${!selectedCategory ? 'text-magenta font-medium' : 'text-gray-700'}`}
          onClick={() => onSelectCategory(null)}
        >
          All Categories
        </div>
        
        {categories.map(category => (
          <div 
            key={category} 
            className={`cursor-pointer hover:text-magenta transition-colors ${selectedCategory === category ? 'text-magenta font-medium' : 'text-gray-700'}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

const PopularTags = ({ 
  tags, 
  selectedTag, 
  onSelectTag 
}: { 
  tags: string[], 
  selectedTag: string | null,
  onSelectTag: (tag: string | null) => void
}) => {
  return (
    <div className="mb-8">
      <h3 className="font-serif font-bold text-xl mb-4">Popular Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge 
            key={tag} 
            variant="outline"
            className={`cursor-pointer ${
              selectedTag === tag 
                ? 'bg-magenta text-white hover:bg-magenta/90 border-magenta' 
                : 'hover:bg-gray-100 hover:text-magenta'
            }`}
            onClick={() => onSelectTag(tag === selectedTag ? null : tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

const SocialMedia = () => {
  return (
    <div className="mb-8">
      <h3 className="font-serif font-bold text-xl mb-4">Follow Us</h3>
      <div className="flex items-center space-x-2">
        <a 
          href="#" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-black text-white hover:bg-magenta p-2 rounded-full transition-colors"
          aria-label="Facebook"
        >
          <Facebook className="h-5 w-5" />
        </a>
        <a 
          href="#" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-black text-white hover:bg-magenta p-2 rounded-full transition-colors"
          aria-label="Twitter"
        >
          <X className="h-5 w-5" />
        </a>
        <a 
          href="#" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-black text-white hover:bg-magenta p-2 rounded-full transition-colors"
          aria-label="Instagram"
        >
          <Instagram className="h-5 w-5" />
        </a>
        <a 
          href="#" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-black text-white hover:bg-magenta p-2 rounded-full transition-colors"
          aria-label="YouTube"
        >
          <Youtube className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
};

// Newsletter sign-up
const Newsletter = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-xl mb-8">
      <h3 className="font-serif font-bold text-xl mb-2">Subscribe to Our Newsletter</h3>
      <p className="text-gray-600 text-sm mb-4">
        Get the latest articles, resources and updates right to your inbox.
      </p>
      <div className="space-y-3">
        <Input placeholder="Your Email Address" type="email" />
        <Button className="w-full bg-magenta hover:bg-magenta/90">
          Subscribe
        </Button>
      </div>
    </div>
  );
};

// Main blog page component
const Blog = () => {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState<BlogResponse>({
    blog: [],
    categories: [],
    popularTags: []
  });
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [sortBy, setSortBy] = useState("newest");
  
  const [displayPosts, setDisplayPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  
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
        
        // Remove featured post from the list to avoid duplication
        setDisplayPosts(data.blog.filter(post => post.id !== featured?.id));
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlogData();
  }, []);
  
  // Filter and sort posts
  useEffect(() => {
    if (!blogData.blog.length) return;
    
    let filtered = [...blogData.blog];
    
    // Remove featured post to avoid duplication
    if (featuredPost) {
      filtered = filtered.filter(post => post.id !== featuredPost.id);
    }
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    // Apply tag filter
    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.excerpt.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    
    // Calculate pagination
    setTotalPages(Math.ceil(filtered.length / postsPerPage));
    
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setDisplayPosts(filtered.slice(indexOfFirstPost, indexOfLastPost));
    
  }, [blogData.blog, featuredPost, selectedCategory, selectedTag, searchTerm, sortBy, currentPage, postsPerPage]);
  
  // Handle search
  const handleSearch = () => {
    setCurrentPage(1);
  };
  
  // Handle category selection
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setSelectedTag(null);
    setCurrentPage(1);
  };
  
  // Handle tag selection
  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };
  
  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <div className="bg-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl mb-10 leading-tight tracking-tight">
              Inspiration at<br />your fingertips
            </h1>
            
            {/* Category tabs */}
            <div className="mt-8">
              <Tabs defaultValue="all-topics" className="w-full">
                <TabsList className="bg-transparent border-b border-gray-800 w-full justify-start gap-2 md:gap-4 overflow-x-auto">
                  <TabsTrigger 
                    value="all-topics" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent px-1 py-2 text-sm md:text-base"
                    onClick={() => handleCategorySelect(null)}
                  >
                    All topics
                  </TabsTrigger>
                  <TabsTrigger 
                    value="leadership" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent px-1 py-2 text-sm md:text-base"
                    onClick={() => handleCategorySelect("Leadership")}
                  >
                    Leadership
                  </TabsTrigger>
                  <TabsTrigger 
                    value="happiness" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent px-1 py-2 text-sm md:text-base"
                    onClick={() => handleCategorySelect("Happiness")}
                  >
                    Happiness
                  </TabsTrigger>
                  <TabsTrigger 
                    value="health" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent px-1 py-2 text-sm md:text-base"
                    onClick={() => handleCategorySelect("Health")}
                  >
                    Health
                  </TabsTrigger>
                  <TabsTrigger 
                    value="business" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent px-1 py-2 text-sm md:text-base"
                    onClick={() => handleCategorySelect("Business")}
                  >
                    Business
                  </TabsTrigger>
                  <TabsTrigger 
                    value="mindset" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent px-1 py-2 text-sm md:text-base"
                    onClick={() => handleCategorySelect("Mindset")}
                  >
                    Mindset
                  </TabsTrigger>
                  <TabsTrigger 
                    value="relationships" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent px-1 py-2 text-sm md:text-base"
                    onClick={() => handleCategorySelect("Relationships")}
                  >
                    Relationships
                  </TabsTrigger>
                  <TabsTrigger 
                    value="wealth" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent px-1 py-2 text-sm md:text-base"
                    onClick={() => handleCategorySelect("Wealth")}
                  >
                    Wealth
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured post */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        {isLoading ? (
          <div className="w-full h-[500px] bg-gray-200 rounded-xl animate-pulse"></div>
        ) : featuredPost ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <FeaturedPost post={featuredPost} />
            </div>
            <div className="space-y-6">
              {/* Health Section - First Article */}
              {blogData.blog.filter(post => post.category === "Health").slice(0, 3).map((post, index) => (
                <article key={post.id} className="group">
                  <div className="mb-2">
                    <span className="text-xs uppercase tracking-wider text-gray-500">Health</span>
                  </div>
                  <h3 className="font-medium text-lg group-hover:text-magenta mb-1 line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{post.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </section>
      
      {/* Main content */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content area */}
          <div className="lg:w-2/3">
            {/* Filtering and sorting controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="font-serif font-bold text-2xl md:text-3xl">
                  {selectedCategory ? selectedCategory : "All Articles"}
                  {selectedTag ? ` - Tagged: ${selectedTag}` : ""}
                </h2>
                <div className="text-gray-500 mt-1">
                  {displayPosts.length} articles
                  {searchTerm ? ` matching "${searchTerm}"` : ""}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Sort by:</span>
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                      <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Blog posts grid */}
            <BlogList posts={displayPosts} isLoading={isLoading} />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index}
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      className={currentPage === index + 1 ? "bg-magenta hover:bg-magenta/90" : ""}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              {/* Search */}
              <SearchBox 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                onSearch={handleSearch}
              />
              
              {/* Newsletter */}
              <Newsletter />
              
              {/* Categories */}
              <CategoriesList 
                categories={blogData.categories} 
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
              />
              
              {/* Popular tags */}
              <PopularTags 
                tags={blogData.popularTags} 
                selectedTag={selectedTag}
                onSelectTag={handleTagSelect}
              />
              
              {/* Social media */}
              <SocialMedia />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">
              Ready to Join the Latina Empire Community?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Connect with like-minded Latina professionals and access exclusive resources and events.
            </p>
            <Button 
              onClick={() => setLocation("/join")}
              className="bg-magenta hover:bg-magenta/90 text-white px-8 py-6 h-auto rounded-full text-lg shadow-[0_0_20px_rgba(242,56,137,0.4)]"
            >
              Join Latina Empire
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;