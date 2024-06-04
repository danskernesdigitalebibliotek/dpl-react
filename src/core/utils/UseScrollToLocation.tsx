import { useEffect, useState } from "react";

// The dependency prop is given to the hook so that it can scroll based on
// external changes (e.g. scroll when some data on the page loads).
export const useScrollToLocation = (dependency: unknown) => {
  const [scrolledAlready, setScrolledAlready] = useState<boolean>(false);
  const urlAnchor = window.location.hash;
  useEffect(() => {
    if (urlAnchor && !scrolledAlready) {
      const anchorId = urlAnchor.replace("#", "");
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setScrolledAlready(true);
      }
    }
  }, [urlAnchor, dependency, scrolledAlready]);
};

export default {};
