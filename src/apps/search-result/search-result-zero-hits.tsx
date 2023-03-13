import * as React from "react";
import { FC } from "react";
import { useText } from "../../core/utils/text";

const SearchResultZeroHits: FC = () => {
  const t = useText();

  return (
    <div className="search-result-page">
      <h1
        className="text-header-h2 search-result-title my-112"
        data-cy="search-result-title"
      >
        {t("noSearchResultText")}
      </h1>
    </div>
  );
};

export default SearchResultZeroHits;
