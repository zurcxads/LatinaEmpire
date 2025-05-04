import placeholderImagePath from "../assets/placeholder-image.png";

/**
 * Utility functions for handling images throughout the application
 */

/**
 * Returns the placeholder image path for use throughout the application
 * @returns The path to the placeholder image
 */
export const getPlaceholderImage = (): string => {
  return placeholderImagePath;
};

/**
 * Global function that can be used to replace any image URL with our placeholder
 * This is especially useful for replacing external URLs like unsplash images
 * @param originalSrc The original image source
 * @param forcePlaceholder Whether to force using the placeholder image regardless of original source
 * @returns The placeholder image path or the original source
 */
export const getImageSrc = (originalSrc: string | undefined, forcePlaceholder: boolean = true): string => {
  // If forcePlaceholder is true or there's no original source, return the placeholder
  if (forcePlaceholder || !originalSrc) {
    return placeholderImagePath;
  }
  
  return originalSrc;
};

/**
 * Creates an onError handler for image elements
 * @returns A function that can be used as the onError handler for image elements
 */
export const createImageErrorHandler = () => {
  return (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = placeholderImagePath;
  };
};