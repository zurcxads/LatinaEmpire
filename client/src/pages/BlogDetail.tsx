import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { blogService, BlogPost } from "@/lib/blogService";
import { 
  Calendar, 
  Clock, 
  ChevronLeft,
  Facebook,
  Twitter,
  Linkedin,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Related articles component
const RelatedArticles = ({ posts, currentPostId }: { posts: BlogPost[], currentPostId: string }) => {
  // Filter out current post and limit to 3 posts
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3);
  
  if (relatedPosts.length === 0) return null;
  
  return (
    <div className="mt-16">
      <h3 className="font-serif font-bold text-2xl mb-6">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map(post => (
          <div key={post.id} className="group">
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h4 className="font-serif font-bold text-lg mb-2 group-hover:text-magenta transition-colors">
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h4>
            <div className="text-sm text-gray-500 mb-2">
              {new Date(post.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Social share buttons
const SocialShare = ({ post }: { post: BlogPost }) => {
  const [currentUrl, setCurrentUrl] = useState("");
  
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);
  
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
  };
  
  const handleShare = () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing', error));
    }
  };
  
  return (
    <div className="flex items-center space-x-2 mt-6">
      <span className="text-sm text-gray-500 mr-1">Share:</span>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href={shareUrls.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-magenta p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on Facebook</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href={shareUrls.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-magenta p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on Twitter</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href={shareUrls.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-magenta p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on LinkedIn</p>
          </TooltipContent>
        </Tooltip>
        
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={handleShare}
                className="text-gray-600 hover:text-magenta p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share this article</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  );
};

// Author bio
const AuthorBio = ({ post }: { post: BlogPost }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-xl my-12">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="flex flex-col">
          <h4 className="font-serif font-bold text-xl mb-2">About the Author</h4>
          <h5 className="font-medium text-lg mb-1">{post.author}</h5>
          <p className="text-gray-600 text-sm">{post.authorTitle}</p>
          <SocialShare post={post} />
        </div>
      </div>
    </div>
  );
};

// Newsletter CTA
const NewsletterCTA = () => {
  return (
    <div className="bg-magenta/10 p-8 rounded-xl my-12 text-center">
      <h4 className="font-serif font-bold text-2xl mb-3">
        Enjoy this article?
      </h4>
      <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
        Subscribe to our newsletter for more insights, tips, and exclusive content for Latina professionals.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
        <input 
          type="email" 
          placeholder="Your email address" 
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-magenta/50"
        />
        <Button className="bg-magenta hover:bg-magenta/90 whitespace-nowrap px-6 rounded-full">
          Subscribe
        </Button>
      </div>
    </div>
  );
};

// Format blog content with appropriate styling
const formatContent = (content: string) => {
  // Split by newlines and wrap paragraphs
  return content.split('\n\n').map((paragraph, index) => {
    // Check if paragraph is a header (starts with # or ##)
    if (paragraph.startsWith('# ')) {
      return (
        <h2 key={index} className="font-serif font-bold text-2xl mt-8 mb-4">
          {paragraph.substring(2)}
        </h2>
      );
    } else if (paragraph.startsWith('## ')) {
      return (
        <h3 key={index} className="font-serif font-bold text-xl mt-6 mb-3">
          {paragraph.substring(3)}
        </h3>
      );
    } else if (paragraph.startsWith('**') && paragraph.includes('**:')) {
      // Handle bold points/lists
      const boldPart = paragraph.substring(2, paragraph.indexOf('**:') + 2);
      const restPart = paragraph.substring(paragraph.indexOf('**:') + 3);
      return (
        <p key={index} className="mb-4 text-gray-800 leading-relaxed">
          <strong>{boldPart.replace('**:', '')}</strong>: {restPart}
        </p>
      );
    } else {
      return (
        <p key={index} className="mb-4 text-gray-800 leading-relaxed">
          {paragraph}
        </p>
      );
    }
  });
};

// Main blog detail component
const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  
  // Fetch blog post data
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const postData = await blogService.getPostBySlug(slug);
        if (postData) {
          setPost(postData);
          document.title = `${postData.title} | Latina Empire Blog`;
          
          // Fetch related posts (same category)
          const allPosts = await blogService.getAllPosts({
            category: postData.category
          });
          setRelatedPosts(allPosts.blog);
        } else {
          // Post not found, redirect to blog page
          setLocation("/blog");
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setLocation("/blog");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
    
    // Cleanup
    return () => {
      document.title = "Latina Empire | Empowering Latina Professionals";
    };
  }, [slug, setLocation]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="w-full h-12 bg-gray-200 animate-pulse mb-4"></div>
          <div className="w-3/4 h-8 bg-gray-200 animate-pulse mb-8"></div>
          <div className="w-full h-80 bg-gray-200 animate-pulse mb-6"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-full h-6 bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!post) return null;
  
  return (
    <div className="flex flex-col">
      {/* Article header */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setLocation("/blog")}
              className="text-white hover:text-white/80 mb-6 pl-0"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
            
            <div className="flex items-center space-x-4 mb-4">
              <Badge className="bg-magenta hover:bg-magenta/90">{post.category}</Badge>
              <span className="text-white/70 text-sm flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              <span className="text-white/70 text-sm flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </span>
            </div>
            
            <h1 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-white/80 text-xl max-w-3xl leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Cover image */}
          <div className="mb-10 relative h-96 rounded-xl overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Article content */}
          <article className="prose max-w-none">
            {formatContent(post.content)}
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {post.tags.map(tag => (
                <Link 
                  key={tag} 
                  href={`/blog?tag=${tag}`}
                >
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                    <span className="text-gray-600">#</span> {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </article>
          
          {/* Author bio */}
          <AuthorBio post={post} />
          
          {/* Newsletter CTA */}
          <NewsletterCTA />
          
          {/* Related articles */}
          <RelatedArticles posts={relatedPosts} currentPostId={post.id} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;