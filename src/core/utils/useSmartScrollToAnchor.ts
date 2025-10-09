import { useEffect, useRef, useState } from "react";
import { useIsFetching } from "react-query";

/**
 * Scrolls to an element specified by the current URL hash
 * once data fetching is complete. Retries until element is found
 * and visible. Listens for hash changes and re-scrolls accordingly.
 */
export const useSmartScrollToAnchor = () => {
  const isFetching = useIsFetching();
  const isReady = isFetching === 0;

  const [scrolledHash, setScrolledHash] = useState<string | null>(null);
  const hasRescrolled = useRef(false);
  const observerRef = useRef<ResizeObserver | MutationObserver | null>(null);
  const stabilityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to get the current hash without '#'
  const getHash = () =>
    decodeURIComponent(window.location.hash.replace("#", ""));

  useEffect(() => {
    console.log("[ScrollDebug] useEffect triggered:", {
      isReady,
      hash: getHash(),
      scrolledHash,
      isFetching
    });

    if (!isReady) {
      console.log("[ScrollDebug] Not ready, isFetching =", isFetching);
      return;
    }

    const hash = getHash();
    if (!hash) {
      console.log("[ScrollDebug] No hash in URL");
      return;
    }

    if (scrolledHash === hash) {
      console.log("[ScrollDebug] Already scrolled to:", hash);
      return; // Already scrolled to this hash
    }

    console.log("[ScrollDebug] Starting scroll attempt for:", hash);

    let retryCount = 0;
    const maxRetries = 10;
    const retryDelay = 300;

    const scrollToElement = () => {
      const el = document.getElementById(hash);
      console.log("[ScrollDebug] Looking for element:", hash, "found:", !!el);

      if (!el) {
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(
            "[ScrollDebug] Element not found, retry",
            retryCount,
            "in",
            retryDelay + "ms"
          );
          setTimeout(scrollToElement, retryDelay);
        } else {
          console.log(
            "[ScrollDebug] Max retries reached, element not found:",
            hash
          );
        }
        return;
      }

      const rect = el.getBoundingClientRect();
      const visible = rect.width > 0 && rect.height > 0;
      console.log("[ScrollDebug] Element visibility:", {
        visible,
        rect: { width: rect.width, height: rect.height, top: rect.top }
      });

      if (!visible && retryCount < maxRetries) {
        retryCount++;
        console.log("[ScrollDebug] Element not visible, retry", retryCount);
        setTimeout(scrollToElement, retryDelay);
        return;
      }

      // Use scrollIntoView for consistent behavior across all devices
      console.log("[ScrollDebug] Attempting to scroll to element");
      try {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
        console.log("[ScrollDebug] Smooth scroll completed");
      } catch (error) {
        // Fallback if smooth scroll is not supported
        console.log("[ScrollDebug] Smooth scroll failed, using auto:", error);
        el.scrollIntoView({
          behavior: "auto",
          block: "start",
          inline: "nearest"
        });
      }

      setScrolledHash(hash);
      hasRescrolled.current = false;
    };

    // Wait for page to stabilize before scrolling
    const waitForPageStability = () => {
      console.log("[ScrollDebug] Waiting for page stability");

      // Clear any existing stability timeout
      if (stabilityTimeoutRef.current) {
        clearTimeout(stabilityTimeoutRef.current);
      }

      // Use MutationObserver to detect when DOM changes stop
      const observer = new MutationObserver(() => {
        console.log(
          "[ScrollDebug] DOM mutation detected, resetting stability timer"
        );

        // Reset the stability timer every time DOM changes
        if (stabilityTimeoutRef.current) {
          clearTimeout(stabilityTimeoutRef.current);
        }

        stabilityTimeoutRef.current = setTimeout(() => {
          console.log("[ScrollDebug] Page appears stable, starting scroll");
          observer.disconnect();
          scrollToElement();
        }, 500); // Wait 500ms after last DOM change
      });

      // Observe changes to the document body and its children
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: false,
        characterData: true,
        characterDataOldValue: false
      });

      // Also set a maximum wait time as fallback
      setTimeout(() => {
        console.log("[ScrollDebug] Maximum wait time reached, forcing scroll");
        observer.disconnect();
        if (stabilityTimeoutRef.current) {
          clearTimeout(stabilityTimeoutRef.current);
        }
        scrollToElement();
      }, 3000); // Maximum 3 seconds wait

      // Start the initial stability timer
      stabilityTimeoutRef.current = setTimeout(() => {
        console.log("[ScrollDebug] Initial stability period completed");
        observer.disconnect();
        scrollToElement();
      }, 500);
    };

    waitForPageStability();

    // Listen for hash changes
    const onHashChange = () => {
      const newHash = getHash();
      if (newHash && newHash !== scrolledHash) {
        setScrolledHash(null); // Reset to allow re-scroll
      }
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (stabilityTimeoutRef.current) {
        clearTimeout(stabilityTimeoutRef.current);
        stabilityTimeoutRef.current = null;
      }
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [isFetching, isReady, scrolledHash]);
};
