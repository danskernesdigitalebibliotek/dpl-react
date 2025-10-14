import { useEffect } from "react";

function useSetSmoothScroll() {
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = "smooth";

    return () => {
      html.style.scrollBehavior = "auto";
    };
  }, []);
}

export default useSetSmoothScroll;
