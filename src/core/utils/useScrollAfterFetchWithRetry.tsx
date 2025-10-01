import { useEffect, useState } from "react";
import { useIsFetching } from "react-query";

export const useScrollAfterFetchWithRetry = () => {
  const [scrolledAlready, setScrolledAlready] = useState<boolean>(false);

  const isFetching = useIsFetching();
  const isQueriesReady = isFetching === 0;

  const urlHash = window.location.hash;
  const anchorId = urlHash.replace("#", "");

  useEffect(() => {
    if (anchorId && !scrolledAlready && isQueriesReady) {
      let lastElementTop = 0;
      let stableCount = 0;

      const scrollToElement = (retryCount = 0) => {
        const element = document.getElementById(anchorId);

        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.height > 0 && rect.width > 0;

          if (isVisible) {
            const currentTop = rect.top + window.scrollY;

            // Check if element position has stabilized
            if (Math.abs(currentTop - lastElementTop) < 5) {
              stableCount++;
            } else {
              stableCount = 0;
              lastElementTop = currentTop;
            }

            // Only scroll when position is stable for 2 consecutive checks
            if (stableCount >= 2) {
              element.scrollIntoView({ behavior: "smooth" });
              setScrolledAlready(true);
            } else if (retryCount < 10) {
              // Use longer delay to allow for layout shifts
              setTimeout(() => scrollToElement(retryCount + 1), 300);
            }
          } else if (retryCount < 10) {
            setTimeout(() => scrollToElement(retryCount + 1), 300);
          }
        } else if (retryCount < 10) {
          setTimeout(() => scrollToElement(retryCount + 1), 300);
        }
      };

      scrollToElement(0);
    }
  }, [isQueriesReady, anchorId, scrolledAlready]);
};
