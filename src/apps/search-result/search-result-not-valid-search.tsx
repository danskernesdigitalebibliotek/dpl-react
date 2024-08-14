import * as React from "react";
import { FC } from "react";
import { useText } from "../../core/utils/text";

export interface SearchResultInvalidSearchProps {
  dataCy?: string;
}

const SearchResultInvalidSearch: FC<SearchResultInvalidSearchProps> = ({
  dataCy = "search-result-not-valid-search"
}) => {
  const t = useText();

  return (
    <div className="content-list-page" data-cy={dataCy}>
      <h1
        className="content-list-page__heading my-112"
        data-cy="search-result-zero-hits"
      >
        {t("invalidSearchText")}
      </h1>
      <p className="text-body-medium-regular">
        {t("invalidSearchDescriptionText")}
      </p>
    </div>
  );
};

export default SearchResultInvalidSearch;
