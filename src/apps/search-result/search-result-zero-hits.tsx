import * as React from "react";
import { FC } from "react";
import { useText } from "../../core/utils/text";

const SearchResultZeroHits: FC = () => {
  const t = useText();

  return (
    <div className="search-result-page">
      <h1
        className="text-header-h2 mb-16 search-result-title"
        data-cy="search-result-title"
      >
        <div className="my-112">{t("noSearchResultText")}</div>
      </h1>
    </div>
  );
};

export default SearchResultZeroHits;
