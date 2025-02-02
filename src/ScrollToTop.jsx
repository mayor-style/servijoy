import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Scroll to top whenever the pathname or search params change
    window.scrollTo(0, 0);
  }, [pathname, search]); // Watch both pathname and search for changes

  return null;
};

export default ScrollToTop;
