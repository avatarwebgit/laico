import { useEffect, useState } from 'react';

export const useIsVertical = () => {
 const [isVertical, setIsVertical] = useState(
  window.innerWidth < window.innerHeight,
 );

 useEffect(() => {
  const handleResize = () => {
   setIsVertical(window.innerWidth < window.innerHeight);
  };

  window.addEventListener('resize', handleResize);

  return () => {
   window.removeEventListener('resize', handleResize);
  };
 }, []);

 return isVertical;
};
