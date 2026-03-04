import * as React from "react";
import { FC } from "react";
import { useText } from "../../core/utils/text";
import ContentListPage from "../../components/content-list/ContentListPage";

export interface SearchResultZeroHitsProps {
  dataCy?: string;
}

const SearchResultZeroHits: FC<SearchResultZeroHitsProps> = ({
  dataCy = "search-result-zero-hits"
}) => {
  const t = useText();

  return (
    <ContentListPage
      title={t("noSearchResultText")}
      headingClassName="my-112"
      headingDataCy="search-result-zero-hits"
      dataCy={dataCy}
    />
  );
};

export default SearchResultZeroHits;
