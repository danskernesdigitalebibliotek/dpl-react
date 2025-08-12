import React, { memo } from "react";
import { useText } from "../../../core/utils/text";
import { useConfig } from "../../../core/utils/config";

export interface SearchResultHeaderProps {
  hitcount: number;
  displayQuery: string;
}

type WebSearchConfigType = {
  webSearchUrl: string;
  webSearchText: string;
  webSearchTotal: string;
  hasWebSearchResults: boolean;
};

const SearchResultHeader: React.FC<SearchResultHeaderProps> = ({
  hitcount,
  displayQuery
}) => {
  const t = useText();
  const config = useConfig();
  const webSearchConfig = config<WebSearchConfigType>("webSearchConfig", {
    transformer: "jsonParse"
  });

  return (
    <>
      <h1
        className="content-list-page__heading"
        data-cy="search-result-header"
        aria-live="polite"
      >
        {`${t("showingResultsForText", {
          placeholders: { "@query": displayQuery }
        })} (${hitcount})`}
      </h1>
      {webSearchConfig.hasWebSearchResults && (
        <h2 className="content-list-page__subheading">
          {t("webSearchLinkText")}&nbsp;
          <a
            className="link-tag text-body-medium-medium"
            href={webSearchConfig.webSearchUrl}
          >
            {webSearchConfig.webSearchText} ({webSearchConfig.webSearchTotal})
          </a>
        </h2>
      )}
    </>
  );
};

export default memo(SearchResultHeader);
