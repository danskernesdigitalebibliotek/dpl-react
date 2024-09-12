import * as React from "react";
import { FC } from "react";
import { useText } from "../../core/utils/text";
import "./no-results.scss";

export interface SearchResultZeroHitsProps {
  dataCy?: string;
}

const SearchResultZeroHits: FC<SearchResultZeroHitsProps> = ({
  dataCy = "search-result-zero-hits"
}) => {
  const t = useText();
  const searchAppElement = document.querySelector(
    '[data-dpl-app="search-result"]'
  );
  const noResultsHeading =
    searchAppElement?.getAttribute("data-no-results-heading") || "";
  const noResultsText =
    searchAppElement?.getAttribute("data-no-results-text") || "";
  const noResultsEnabled =
    searchAppElement?.getAttribute("data-no-results-enabled") === "true";

  return (
    <div className="content-list-page" data-cy={dataCy}>
      <h1
        className="content-list-page__heading my-112"
        data-cy="search-result-zero-hits"
      >
        {t("noSearchResultText")}
      </h1>
      {noResultsEnabled && (
        <div className="content-list-page--help">
          <h2 className="content-list-page--help-title">{noResultsHeading}</h2>
          <p className="content-list-page--help-description">{noResultsText}</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultZeroHits;
