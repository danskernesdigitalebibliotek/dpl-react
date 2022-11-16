import React, { useState } from "react";
import ResultPager from "./result-pager";

const usePager = (
  hitcount: number,
  pageSize: number,
  overrideItemsShown?: () => number
) => {
  const [itemsShown, setItemsShown] = useState(pageSize);
  const [page, setPage] = useState<number>(0);

  const resetPager = () => {
    setPage(0);
    setItemsShown(pageSize);
  };

  const pagehandler = () => {
    const currentPage = page + 1;
    const itemsOnPage = (currentPage + 1) * pageSize;
    // the "itemsOnPage > hitcount"-check is to
    // To avoid the "showing 10 out of 8"-situation
    setItemsShown(itemsOnPage > hitcount ? hitcount : itemsOnPage);
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
