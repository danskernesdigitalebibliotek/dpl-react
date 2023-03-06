import React, { useState, useEffect } from "react";
import ResultPager from "./result-pager";

type PagerProps = {
  hitcount: number;
  pageSize: number;
  overrideItemsShown?: () => number;
  isLoading?: boolean;
};

const usePager = ({
  hitcount,
  pageSize,
  overrideItemsShown,
  isLoading
}: PagerProps) => {
  const [itemsShown, setItemsShown] = useState(
    pageSize >= hitcount ? hitcount : pageSize
  );
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const onLastPage = pageSize > hitcount;
    setItemsShown(onLastPage ? hitcount : pageSize);
  }, [hitcount, pageSize]);

  const pagehandler = () => {
    const currentPage = page + 1;
    const itemsOnPage = (currentPage + 1) * pageSize;
    const onLastPage = itemsOnPage > hitcount;
    // the "itemsOnPage > hitcount"-check is to
    // To avoid the "showing 10 out of 8"-situation
    setItemsShown(onLastPage ? hitcount : itemsOnPage);
    setPage(currentPage);
  };

  const PagerComponent = hitcount ? (
    <ResultPager
      itemsShown={overrideItemsShown ? overrideItemsShown() : itemsShown}
      hitcount={hitcount}
      setPageHandler={pagehandler}
      isLoading={isLoading}
    />
  ) : null;

  return { itemsShown, PagerComponent, page };
};

export default usePager;
