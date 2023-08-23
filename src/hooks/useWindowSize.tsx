import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: undefined | number;
    height: undefined | number;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({
        width: window.screen.width,
        height: window.screen.height,
      });

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
