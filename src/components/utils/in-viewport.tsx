import { RefObject, useEffect, useRef, useState } from "react";

function useIsInViewport(offset = 0): [boolean, RefObject<HTMLInputElement>] {
  const [isVisible, setIsVisible] = useState(false);
  const currentElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const scrollFunction = () => {
      if (!currentElement.current) {
        setIsVisible(false);
        return;
      }

      const { top } = currentElement.current.getBoundingClientRect();
      // Offset is the pixels up to the of the element
      setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
    };

    document.addEventListener("scroll", scrollFunction, true);

    return () => {
      document.removeEventListener("scroll", scrollFunction, true);
    };
  }, [offset]);

  return [isVisible, currentElement];
}

export default useIsInViewport;
