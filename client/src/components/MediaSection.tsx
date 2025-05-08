import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";
import { Link } from "wouter";

type MediaItem = {
  id: string;
  title: string;
  image: string;
  source: string;
  type: "video" | "article" | "press"; 
  link: string;
};

const mediaItems: MediaItem[] = [
  {
    id: "1",
    title: "How Latina Empire is Changing the Leadership Landscape",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    source: "YouTube",
    type: "video",
    link: "https://youtube.com"
  },
  {
    id: "2",
    title: "Empowering a New Generation of Latina Leaders in Business",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    source: "Forbes",
    type: "article",
    link: "https://forbes.com"
  },
  {
    id: "3",
    title: "The Cultural Advantage: How Latina Empire Celebrates Heritage in Leadership",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    source: "Interview",
    type: "press",
    link: "/blog/cultural-advantage"
  }
];

const MediaItemCard = ({ item }: { item: MediaItem }) => {
  const isExternal = item.link.startsWith('http');
  const actionText = item.type === 'video' ? 'Watch' : 'Read';
  
  return (
    <div className="card-base card-hover group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={getImageSrc(item.image, true)} 
          alt={item.title} 
          className="card-image"
          onError={createImageErrorHandler()}
        />
        <div className="card-text-overlay opacity-60 group-hover:opacity-70 transition-opacity"></div>
        <div className="absolute bottom-4 left-4">
          <div className="inline-block bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {item.source}
          </div>
        </div>
      </div>
      <div className="card-content">
        <h3 className="font-serif font-bold text-xl mb-4 line-clamp-2">{item.title}</h3>
        
        {isExternal ? (
          <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="cta-button inline-flex items-center justify-center w-full rounded-full border-2 border-magenta text-magenta hover:bg-[#d81b60] hover:text-white font-medium py-3 transition-colors"
          >
            {actionText} <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        ) : (
          <button 
            onClick={() => window.location.href = item.link}
            className="cta-button inline-flex items-center justify-center w-full rounded-full border-2 border-magenta text-magenta hover:bg-[#d81b60] hover:text-white font-medium py-3 transition-colors"
          >
            {actionText} <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

const MediaSection = () => {
  return (
    <section className="section-spacing bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div className="max-w-2xl mb-6 md:mb-0">
            <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">
              FEATURED
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl mb-4">
              Latina Empire In the Media
            </h2>
            <p className="text-gray-600">
              Watch and read features about Latina Empire — from interviews and video reels to press stories that inspire.
            </p>
          </div>
          <button 
            onClick={() => window.location.href = "/blog"}
            className="cta-button inline-flex items-center justify-center rounded-full border-2 border-magenta text-magenta hover:bg-[#d81b60] hover:text-white font-medium px-6 py-3 transition-colors"
          >
            Explore Blog & Media <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mediaItems.map(item => (
            <MediaItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;