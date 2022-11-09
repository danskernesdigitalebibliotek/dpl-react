import React from "react";
import { useText } from "../../core/utils/text";

export interface ResultPagerProps {
  setPageHandler: () => void;
  itemsShown: number;
  hitcount: number;
}
function ResultPager({
  setPageHandler,
  itemsShown,
  hitcount
}: ResultPagerProps) {
  const t = useText();
  return (
    <div className="result-pager">
      <p className="text-small-caption result-pager__title">
        {t("resultPagerStatusText", {
          placeholders: { "@itemsShown": itemsShown, "@hitcount": hitcount }
        })}
      </p>
      <button
        type="button"
        className="btn-primary btn-outline btn-medium arrow__hover--right-small"
        onClick={setPageHandler}
      >
        {/* TODO: Solve casing in CSS */}
        {t("showMoreText").toUpperCase()}
      </button>
    </div>
  );
}

export default ResultPager;
