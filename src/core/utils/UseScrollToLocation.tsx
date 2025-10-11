import { useEffect, useState } from "react";
import { getFromUrlHash } from "./helpers/url";

// The dependency prop is given to the hook so that it can scroll based on
// external changes (e.g. scroll when some data on the page loads).
export const useScrollToLocation = (dependencies: Array<unknown>) => {
  const [scrolledAlready, setScrolledAlready] = useState<boolean>(false);
  const hash = getFromUrlHash();
  useEffect(() => {
    if (hash && !scrolledAlready) {
      const element = document.querySelector(`[data-scroll-target="${hash}"]`);

      if (element) {
        // TODO: Find a better way to do this without using a timeout
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setScrolledAlready(true);
        }, 300);
      }
    }
  }, [hash, ...dependencies, scrolledAlready]);
};

export default {};
