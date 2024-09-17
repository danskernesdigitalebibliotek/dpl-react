import * as React from "react";
import { FC } from "react";
import { useText } from "../../core/utils/text";

export interface SearchResultZeroHitsProps {
  dataCy?: string;
}

const SearchResultZeroHits: FC<SearchResultZeroHitsProps> = ({
  dataCy = "search-result-zero-hits"
}) => {
  const t = useText();

  return (
    <div className="content-list-page" data-cy={dataCy}>
      <h1
        className="content-list-page__heading my-112"
        data-cy="search-result-zero-hits"
      >
        {t("noSearchResultText")}
      </h1>
    </div>
  );
};

export default SearchResultZeroHits;
