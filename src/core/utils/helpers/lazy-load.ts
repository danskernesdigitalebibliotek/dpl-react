import { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";

export const useItemHasBeenVisible = () => {
  const itemRef = useRef(null);
  const intersection = useIntersection(itemRef, {
    root: null,
    rootMargin: "0%",
    threshold: 0
  });
  const isInViewPort = Boolean(intersection?.isIntersecting);
  const [hasBeenVisible, setHasBeenVisible] = useState<boolean>(false);

  // We need to track if the item has been visible already
  // in order to prevent rerunning setHasBeenVisible again.
  useEffect(() => {
    if (hasBeenVisible) {
      return;
    }

    if (isInViewPort) {
      setHasBeenVisible(true);
    }
  }, [hasBeenVisible, isInViewPort]);

  return { itemRef, hasBeenVisible: isInViewPort || hasBeenVisible };
};

export default {};
