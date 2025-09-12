import { useEffect, useState } from "react";

export const useIsVertical = () => {
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsVertical(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isVertical;
};
