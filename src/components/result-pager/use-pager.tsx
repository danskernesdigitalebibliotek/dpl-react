import React, { useState, useEffect } from "react";
import ResultPager from "./result-pager";

const usePager = (
  hitcount: number | null,
  pageSize: number,
  overrideItemsShown?: () => number
) => {
  if (hitcount === null) {
    // eslint-disable-next-line no-param-reassign
    hitcount = 0;
  }

  const [itemsShown, setItemsShown] = useState(
    pageSize >= hitcount ? hitcount : pageSize
  );
  const [page, setPage] = useState<number>(0);

  const resetPager = () => {
    setPage(0);
    setItemsShown(pageSize);
  };

  useEffect(() => {
    setItemsShown(pageSize >= hitcount ? hitcount : pageSize);
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
    />
  ) : null;

  return { itemsShown, PagerComponent, page, resetPager };
};

export default usePager;
