/**
 * Custom hook for handling scroll behavior
 */
export const useScroll = () => {
  /**
   * Scrolls to top of the page
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  /**
   * Scrolls to a specific element by ID
   * @param elementId - The ID of the element to scroll to
   */
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return {
    scrollToTop,
    scrollToElement
  };
};