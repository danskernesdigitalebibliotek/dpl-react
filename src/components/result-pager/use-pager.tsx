import React, { useState, useEffect } from "react";
import ResultPager from "./result-pager";

type PagerProps = {
  hitcount: number;
  pageSize: number;
  overrideItemsShown?: () => number;
};

type PagerComponentProps = {
  classNames?: string;
  isLoading?: boolean;
};

const usePager = ({ hitcount, pageSize, overrideItemsShown }: PagerProps) => {
  const [itemsShown, setItemsShown] = useState(
    pageSize >= hitcount ? hitcount : pageSize
  );
  const [page, setPage] = useState<number>(0);
  const [firstInNewPage, setFirstInNewPage] = useState<number | null>(null);

  useEffect(() => {
    const onLastPage = pageSize > hitcount;
    setItemsShown(onLastPage ? hitcount : pageSize);
  }, [hitcount, pageSize]);

  const pagehandler = () => {
    const currentPage = page + 1;
    const itemsOnPage = (currentPage + 1) * pageSize;
    const onLastPage = itemsOnPage > hitcount;
    setFirstInNewPage(itemsOnPage - pageSize);
    // the "itemsOnPage > hitcount"-check is to
    // To avoid the "showing 10 out of 8"-situation
    setItemsShown(onLastPage ? hitcount : itemsOnPage);
    setPage(currentPage);
  };

  const resetPage = () => {
    setPage(0);
    setFirstInNewPage(null);
    const onLastPage = pageSize >= hitcount;
    setItemsShown(onLastPage ? hitcount : pageSize);
  };

  const PagerComponent: React.FC<PagerComponentProps> = ({
    isLoading,
    classNames = ""
  }) =>
    hitcount ? (
      <ResultPager
        itemsShown={overrideItemsShown ? overrideItemsShown() : itemsShown}
        hitcount={hitcount}
        classNames={classNames}
        setPageHandler={pagehandler}
        isLoading={isLoading}
      />
    ) : null;

  return { itemsShown, PagerComponent, page, firstInNewPage, resetPage };
};

export default usePager;
