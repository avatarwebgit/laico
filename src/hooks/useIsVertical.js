import { useEffect, useState } from 'react';

export const useIsVertical = () => {
 const [isVertical, setIsVertical] = useState(false);

 useEffect(() => {
  // Ensure window is available (for SSR)
  if (typeof window === 'undefined') return;

  const handleResize = () => {
   setIsVertical(window.innerWidth < window.innerHeight);
  };

  // Set initial value
  handleResize();

  // Add event listener
  window.addEventListener('resize', handleResize);

  // Cleanup
  return () => window.removeEventListener('resize', handleResize);
 }, []);

 return isVertical;
};
