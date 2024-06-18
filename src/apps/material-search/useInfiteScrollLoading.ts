import { useEffect, useRef, useCallback } from "react";
import { useKeyPressEvent, useIntersection } from "react-use";
import { WorkId } from "../../core/utils/types/ids";
import { SearchWithPaginationQuery } from "../../core/dbc-gateway/generated/graphql";

type UseInfiniteScrollLoadingProps = {
  data: SearchWithPaginationQuery["search"]["works"];
  isLoading: boolean;
  loadMore: () => void;
  hitCount: number;
  onWorkIdSelect: (workId: WorkId) => void;
};

const useInfiniteScrollLoading = ({
  data,
  loadMore,
  hitCount,
  onWorkIdSelect
}: UseInfiniteScrollLoadingProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastItemRef = useRef<HTMLLIElement | null>(null);
  const lastItemFocusRef = useRef<HTMLButtonElement | null>(null);

  // Handle scroll event to load more items when reaching the bottom
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (
        scrollTop + clientHeight >= scrollHeight - 5 &&
        data.length < hitCount
      ) {
        loadMore();
      }
    }
  }, [loadMore, data.length, hitCount]);

  // Set up and clean up scroll event listener
  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  // Handle intersection to load more items when the last item becomes visible using useIntersection
  const intersection = useIntersection(lastItemRef, {
    root: containerRef.current,
    rootMargin: "0px",
    threshold: 1.0
  });

  useEffect(() => {
    if (
      intersection &&
      intersection.intersectionRatio === 1 &&
      data.length < hitCount
    ) {
      loadMore();
    }
  }, [intersection, loadMore, data.length, hitCount]);

  // Common handler for Enter and Space key events
  const handleKeySelect = useCallback(
    (e: KeyboardEvent) => {
      if (lastItemFocusRef.current) {
        e.preventDefault();
        onWorkIdSelect(lastItemFocusRef.current.dataset.workId as WorkId);
      }
    },
    [onWorkIdSelect]
  );

  // Handle keyboard navigation
  useKeyPressEvent("Enter", handleKeySelect);
  useKeyPressEvent(" ", handleKeySelect);
  useKeyPressEvent("Tab", () => {
    if (lastItemFocusRef.current) {
      loadMore();
    }
  });

  // Handle focus on the last item
  const handleFocus = useCallback(
    (index: number, itemRef: HTMLButtonElement) => {
      if (index === data.length - 1) {
        lastItemFocusRef.current = itemRef;
      } else {
        lastItemFocusRef.current = null;
      }
    },
    [data.length]
  );

  // Set focus on the last item when data changes
  useEffect(() => {
    if (lastItemFocusRef.current) {
      lastItemFocusRef.current.focus();
    }
  }, [data]);

  return {
    containerRef,
    lastItemRef,
    handleFocus
  };
};

export default useInfiniteScrollLoading;
