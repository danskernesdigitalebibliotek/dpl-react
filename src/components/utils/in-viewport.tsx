import { RefObject, useEffect, useRef, useState, useCallback } from "react";

function useIsInViewport(offset = 0): [boolean, RefObject<HTMLInputElement>] {
  const currentElement = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const getVisibility = useCallback(() => {
    let returnOffset = false;
    if (currentElement.current) {
      const { top } = currentElement.current.getBoundingClientRect();
      // Offset is the pixels up to the of the element

      returnOffset = top + offset >= 0 && top - offset <= window.innerHeight;
    }
    return returnOffset;
  }, [offset]);

  useEffect(() => {
    const scrollFunction = () => {
      setIsVisible(getVisibility());
    };

    document.addEventListener("scroll", scrollFunction, true);

    return () => {
      document.removeEventListener("scroll", scrollFunction, true);
    };
  }, [getVisibility]);

  return [isVisible, currentElement];
}

export default useIsInViewport;
