import React from "react";
import { useText } from "../../core/utils/text";

export interface ResultPagerProps {
  setPageHandler: () => void;
  itemsShown: number;
  hitcount: number;
  isLoading?: boolean;
}
function ResultPager({
  setPageHandler,
  itemsShown,
  hitcount,
  isLoading
}: ResultPagerProps) {
  const t = useText();
  return (
    <div className="result-pager">
      <p className="text-small-caption result-pager__title">
        {t("resultPagerStatusText", {
          placeholders: { "@itemsShown": itemsShown, "@hitcount": hitcount }
        })}
      </p>
      {/* If all items are not visible yet, we need to show the button. */}
      {itemsShown !== hitcount && (
        <button
          disabled={isLoading}
          type="button"
          className="btn-primary btn-outline btn-medium arrow__hover--right-small uppercase"
          onClick={setPageHandler}
        >
          {isLoading ? t("loadingText") : t("showMoreText")}
        </button>
      )}
    </div>
  );
}

export default ResultPager;
