import React from "react";
import { cn } from "@/lib/utils";
import placeholderImagePath from "../../assets/placeholder-image.png";

interface PlaceholderImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the placeholder image */
  width?: string | number;
  /** Height of the placeholder image */
  height?: string | number;
  /** Whether this is a hero section placeholder (adds darker overlay) */
  isHero?: boolean;
  /** Alternative text for accessibility */
  alt?: string;
  /** Optional image URL to use instead of default placeholder */
  src?: string;
  /** Whether to round the image as a circle */
  isCircle?: boolean;
  /** Whether to force using the placeholder image */
  forcePlaceholder?: boolean;
}

const PlaceholderImage = ({
  className,
  width = "100%",
  height = "100%",
  isHero = false,
  alt = "Placeholder image",
  src,
  isCircle = false,
  forcePlaceholder = false,
  ...props
}: PlaceholderImageProps) => {
  // Always use the placeholder image when requested
  const imageSrc = forcePlaceholder ? placeholderImagePath : (src || placeholderImagePath);
  
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        isHero ? "hero-placeholder" : "placeholder-image",
        isCircle ? "rounded-full" : "",
        className
      )}
      style={{ 
        width, 
        height,
      }}
      {...props}
    >
      <img
        src={imageSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover",
          isCircle ? "rounded-full" : "rounded-[16px]"
        )}
        onError={(e) => {
          // If the original image fails, use the placeholder
          if (src && src !== placeholderImagePath) {
            e.currentTarget.src = placeholderImagePath;
          }
        }}
      />
    </div>
  );
};

export { PlaceholderImage };