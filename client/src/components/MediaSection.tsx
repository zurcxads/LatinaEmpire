import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ExternalLink, PlayCircle, Newspaper, Headphones } from "lucide-react";

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
        return <PlayCircle className="h-5 w-5" />;
      case "article":
        return <Newspaper className="h-5 w-5" />;
      case "podcast":
        return <Headphones className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  // Function to handle card click that navigates to the link
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    window.open(item.link, "_blank", "noopener,noreferrer");
  };

  return (
    <div 
      className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-64 overflow-hidden">
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
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black text-white">
            {item.source}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-serif text-xl font-bold mb-3 group-hover:text-magenta transition-colors">
          {item.title}
        </h3>
        
        <Button variant="outline" className="mt-2 rounded-full flex items-center gap-2">
          {getIcon()}
          <span>{item.sourceLabel}</span>
        </Button>
      </div>
    </div>
  );
};

const MediaSection = () => {
  return (
    <section className="section-spacing bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10">
          <div className="flex mb-2">
            <span className="inline-block h-3 w-3 rounded-full bg-black"></span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">In the Media</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore how Latina Empire is shaping culture and leadership in publications, podcasts, and videos around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {mediaItems.map(item => (
            <MediaItemCard key={item.id} item={item} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            asChild
            className="bg-magenta hover:bg-magenta/90 text-white rounded-full px-8 py-6 h-auto"
          >
            <Link href="/media">
              Explore Blog & Media
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;