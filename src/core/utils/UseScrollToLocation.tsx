import { useEffect, useMemo } from "react";
import { getFromUrlHash } from "./helpers/url";

// Global registry to track which hashes have been scrolled to
const scrolledHashes = new Set<string>();

// The dependency prop is given to the hook so that it can scroll based on
// external changes (e.g. scroll when some data on the page loads).
export const useScrollToLocation = (dependencies: Array<unknown>) => {
  const stableDependencies = useMemo(() => dependencies, [dependencies]);
  const hash = getFromUrlHash();

  useEffect(() => {
    if (hash && !scrolledHashes.has(hash)) {
      const element = document.querySelector(`[data-scroll-target="${hash}"]`);

      if (element) {
        // TODO: Find a better way to do this without using a timeout
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          scrolledHashes.add(hash);
        }, 300);
      }
    }
  }, [hash, stableDependencies]);
};

export default {};
