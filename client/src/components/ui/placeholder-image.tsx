import React from "react";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the placeholder image */
  width?: string | number;
  /** Height of the placeholder image */
  height?: string | number;
  /** Whether this is a hero section placeholder (adds darker overlay) */
  isHero?: boolean;
  /** Alternative text for accessibility */
  alt?: string;
  /** Optional image URL to use instead of gradient (falls back to gradient if image fails) */
  src?: string;
  /** Whether to round the image as a circle */
  isCircle?: boolean;
}

const PlaceholderImage = ({
  className,
  width = "100%",
  height = "100%",
  isHero = false,
  alt = "Placeholder image",
  src,
  isCircle = false,
  ...props
}: PlaceholderImageProps) => {
  const [imgError, setImgError] = React.useState(!src);

  const handleError = () => {
    setImgError(true);
  };

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
      {src && !imgError ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover",
            isCircle ? "rounded-full" : "rounded-[16px]"
          )}
          onError={handleError}
        />
      ) : null}
    </div>
  );
};

export { PlaceholderImage };