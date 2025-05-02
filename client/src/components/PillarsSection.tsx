import { useState } from "react";
import { X } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface PillarCategoryProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const PillarCategory = ({ label, isActive, onClick }: PillarCategoryProps) => (
  <button
    onClick={onClick}
    className={cn(
      "group text-left font-serif font-bold text-4xl md:text-6xl lg:text-7xl transition-all duration-300 block mb-4 hover:opacity-90",
      isActive ? "text-black" : "text-black"
    )}
  >
    <span className="relative">
      {label}
      <span className={cn(
        "absolute bottom-2 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full",
        isActive ? "w-full" : "w-0"
      )}></span>
    </span>
  </button>
);

const PillarsSection = () => {
  const [openPillar, setOpenPillar] = useState<string | null>(null);

  const handleOpenChange = (open: boolean) => {
    if (!open) setOpenPillar(null);
  };

  const handlePillarClick = (pillar: string) => {
    setOpenPillar(pillar);
  };

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left column: Image */}
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-[350px]">
              <div className="rounded-2xl overflow-hidden shadow-xl h-full">
                <img 
                  src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Live event with audience" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right column: Text */}
          <div className="flex flex-col justify-start h-full">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-sans uppercase tracking-wider text-gray-600 font-semibold text-sm">
                OUR MISSION
              </span>
              <div className="w-2 h-2 rounded-full bg-magenta animate-pulse shadow-[0_0_8px_4px_rgba(236,72,153,0.3)]"></div>
            </div>

            <div className="mb-8">
              <PillarCategory 
                label="Heart" 
                isActive={openPillar === 'heart'} 
                onClick={() => handlePillarClick('heart')} 
              />
              <PillarCategory 
                label="Mind" 
                isActive={openPillar === 'mind'} 
                onClick={() => handlePillarClick('mind')} 
              />
              <PillarCategory 
                label="Money" 
                isActive={openPillar === 'money'} 
                onClick={() => handlePillarClick('money')} 
              />
            </div>
          </div>

          
        </div>
      </div>

      {/* Heart Drawer */}
      <Drawer open={openPillar === 'heart'} onOpenChange={handleOpenChange}>
        <DrawerContent className="bg-black/95 text-white">
          <DrawerHeader>
            <div className="flex justify-between items-center">
              <DrawerTitle className="font-serif text-3xl">Heart</DrawerTitle>
              <DrawerClose className="rounded-full h-8 w-8 flex items-center justify-center bg-white/10">
                <X className="h-4 w-4" />
              </DrawerClose>
            </div>
            <DrawerDescription className="text-white/70 text-lg max-w-2xl mx-auto mt-4 text-center">
              Explore all content related to Heart — coming soon.
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>

      {/* Mind Drawer */}
      <Drawer open={openPillar === 'mind'} onOpenChange={handleOpenChange}>
        <DrawerContent className="bg-black/95 text-white">
          <DrawerHeader>
            <div className="flex justify-between items-center">
              <DrawerTitle className="font-serif text-3xl">Mind</DrawerTitle>
              <DrawerClose className="rounded-full h-8 w-8 flex items-center justify-center bg-white/10">
                <X className="h-4 w-4" />
              </DrawerClose>
            </div>
            <DrawerDescription className="text-white/70 text-lg max-w-2xl mx-auto mt-4 text-center">
              Explore all content related to Mind — coming soon.
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>

      {/* Money Drawer */}
      <Drawer open={openPillar === 'money'} onOpenChange={handleOpenChange}>
        <DrawerContent className="bg-black/95 text-white">
          <DrawerHeader>
            <div className="flex justify-between items-center">
              <DrawerTitle className="font-serif text-3xl">Money</DrawerTitle>
              <DrawerClose className="rounded-full h-8 w-8 flex items-center justify-center bg-white/10">
                <X className="h-4 w-4" />
              </DrawerClose>
            </div>
            <DrawerDescription className="text-white/70 text-lg max-w-2xl mx-auto mt-4 text-center">
              Explore all content related to Money — coming soon.
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </section>
  );
};

export default PillarsSection;