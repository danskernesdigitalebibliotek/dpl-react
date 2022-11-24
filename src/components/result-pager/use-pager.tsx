import React, { useState } from "react";
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

  const [itemsShown, setitemsShown] = useState(
    pageSize >= hitcount ? hitcount : pageSize
  );
  const [page, setPage] = useState<number>(0);

  const resetPager = () => {
    setPage(0);
    setitemsShown(pageSize);
  };

  const pagehandler = () => {
    const currentPage = page + 1;
    const itemsOnPage = (currentPage + 1) * pageSize;
    setPage(currentPage);
    setitemsShown(itemsOnPage);
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
