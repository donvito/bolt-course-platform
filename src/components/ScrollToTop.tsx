import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that automatically scrolls to the top of the page
 * when navigating between routes
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component doesn't render anything
  return null;
};