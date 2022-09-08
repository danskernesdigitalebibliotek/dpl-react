import React, { useState } from "react";
import ResultPager from "./result-pager";
import { getPageSize } from "../../apps/search-result/helpers";

const usePager = (hitcount: number, overrideItemsShown?: () => number) => {
  const pageSize = getPageSize({});
  const [itemsShown, setitemsShown] = useState<number>(pageSize);
  const [page, setPage] = useState<number>(0);

  const pagehandler = () => {
    const currentPage = page + 1;
    const itemsOnPage = (currentPage + 1) * pageSize;
    setPage(currentPage);

    if (itemsOnPage >= hitcount) {
      setitemsShown(hitcount);
      return;
    }

    setitemsShown(itemsOnPage);
  };

  const PagerComponent = (
    <ResultPager
      itemsShown={overrideItemsShown ? overrideItemsShown() : itemsShown}
      hitcount={hitcount}
      setPageHandler={pagehandler}
    />
  );

  return { itemsShown, PagerComponent, page };
};

export default usePager;
