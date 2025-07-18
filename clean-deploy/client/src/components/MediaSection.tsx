import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ExternalLink, PlayCircle, Newspaper, Headphones, ArrowRight } from "lucide-react";

// Define media item types for different categories
type MediaItem = {
  id: string;
  title: string;
  thumbnail: string;
  source: string;
  sourceLabel: string;
  link: string;
  type: "video" | "article" | "podcast";
};

// Sample media items 
const mediaItems: MediaItem[] = [
  {
    id: "1",
    title: "Elevating Latina Leadership: Breaking Barriers in Corporate America",
    thumbnail: "https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    source: "YouTube",
    sourceLabel: "Watch",
    link: "https://www.youtube.com/watch?v=example1",
    type: "video"
  },
  {
    id: "2",
    title: "How Latina Empire is Transforming Leadership Development",
    thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    source: "Forbes",
    sourceLabel: "Read",
    link: "https://www.forbes.com/example-article",
    type: "article"
  },
  {
    id: "3",
    title: "Building Cultural Intelligence in Today's Global Business Environment",
    thumbnail: "https://images.unsplash.com/photo-1581368135153-a506cf13531c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    source: "The Latina Leadership Podcast",
    sourceLabel: "Listen",
    link: "https://podcasts.example.com/latina-leadership/episode123",
    type: "podcast"
  }
];

// Individual media card component
const MediaItemCard = ({ item }: { item: MediaItem }) => {
  // Get the appropriate icon based on media type
  const getIcon = () => {
    switch (item.type) {
      case "video":
        return <PlayCircle className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "article":
        return <Newspaper className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "podcast":
        return <Headphones className="h-4 w-4 sm:h-5 sm:w-5" />;
      default:
        return <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  // Function to handle card click that navigates to the link
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    window.open(item.link, "_blank", "noopener,noreferrer");
  };

  return (
    <div 
      className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-md group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
        <img 
          src={item.thumbnail} 
          alt={item.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x400/e83e8c/ffffff?text=Media+Content";
            e.currentTarget.alt = "Media content placeholder";
          }}
        />
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20">
          <span className="inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-black text-white">
            {item.source}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 group-hover:text-magenta transition-colors line-clamp-2">
          {item.title}
        </h3>
        
        <Button variant="outline" className="mt-1 sm:mt-2 rounded-full flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4">
          {getIcon()}
          <span>{item.sourceLabel}</span>
        </Button>
      </div>
    </div>
  );
};

const MediaSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-5 md:px-6">
        {/* Flexbox header with title on left, button on right */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 text-left">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">In the Media</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl">
              Explore how Latina Empire is shaping culture and leadership in publications, podcasts, and videos around the world.
            </p>
          </div>
          
          {/* Ghost-style button moved to the top right */}
          <div className="mt-4 sm:mt-0">
            <Button 
              asChild
              variant="outline"
              className="rounded-full border border-gray-300 text-gray-700 hover:border-black hover:text-black px-4 sm:px-6 py-1.5 sm:py-2 h-auto text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
            >
              <Link href="/blog">
                Explore All Media
                <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 sm:h-4 w-3.5 sm:w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Media item cards - responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {mediaItems.map(item => (
            <MediaItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;