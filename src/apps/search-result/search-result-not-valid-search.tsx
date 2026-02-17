import * as React from "react";
import { FC } from "react";
import { useText } from "../../core/utils/text";
import ContentListPage from "../../components/content-list/ContentListPage";

export interface SearchResultInvalidSearchProps {
  dataCy?: string;
}

const SearchResultInvalidSearch: FC<SearchResultInvalidSearchProps> = ({
  dataCy = "search-result-not-valid-search"
}) => {
  const t = useText();

  return (
    <ContentListPage
      title={t("invalidSearchText")}
      headingClassName="my-112"
      headingDataCy="search-result-zero-hits"
      dataCy={dataCy}
    >
      <p className="text-body-medium-regular">
        {t("invalidSearchDescriptionText")}
      </p>
    </ContentListPage>
  );
};

export default SearchResultInvalidSearch;
