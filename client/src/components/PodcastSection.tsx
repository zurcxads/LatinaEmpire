import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getImageSrc, createImageErrorHandler } from "@/lib/image-utils";

type PodcastEpisode = {
  id: string;
  title: string;
  image: string;
  duration: string;
  link: string;
};

const episodes: PodcastEpisode[] = [
  {
    id: "1",
    title: "Breaking the Glass Ceiling in Corporate America",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    duration: "42 min",
    link: "#"
  },
  {
    id: "2",
    title: "Finding Your Purpose as a Latina Entrepreneur",
    image: "https://images.unsplash.com/photo-1533582437341-8b0cd724568f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    duration: "38 min",
    link: "#"
  },
  {
    id: "3",
    title: "Building Wealth: Investment Strategies for Latinas",
    image: "https://images.unsplash.com/photo-1602992708636-43c4751410e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    duration: "45 min",
    link: "#"
  }
];

const PodcastEpisodeCard = ({ episode }: { episode: PodcastEpisode }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-all">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={getImageSrc(episode.image, true)} 
          alt={episode.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={createImageErrorHandler()}
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center border-2 border-white backdrop-blur-sm">
            <Play className="h-8 w-8 text-white fill-white ml-1" />
          </button>
        </div>
        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {episode.duration}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-serif font-bold text-xl mb-4 line-clamp-2">{episode.title}</h3>
        <Button 
          className="w-full accent-button justify-center"
        >
          Listen Now
        </Button>
      </div>
    </div>
  );
};

const PodcastSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div className="max-w-2xl mb-6 md:mb-0">
            <span className="font-sans uppercase tracking-wider text-magenta font-semibold text-sm mb-3 block">
              PODCAST
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-5xl mb-4">
              Listen & Learn
            </h2>
            <p className="text-gray-600">
              Practical insights and inspiring stories to fuel your personal and professional growth.
            </p>
          </div>
          <Button className="secondary-button">
            View All Episodes
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {episodes.map(episode => (
            <PodcastEpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;