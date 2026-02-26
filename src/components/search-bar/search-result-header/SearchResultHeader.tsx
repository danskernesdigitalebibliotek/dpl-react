import React, { memo } from "react";
import { useText } from "../../../core/utils/text";
import { useConfig } from "../../../core/utils/config";

type WebSearchConfigType = {
  webSearchUrl: string;
  webSearchText: string;
  webSearchTotal: string;
  hasWebSearchResults: boolean;
};

const SearchResultHeader: React.FC = () => {
  const t = useText();
  const config = useConfig();
  const webSearchConfig = config<WebSearchConfigType>("webSearchConfig", {
    transformer: "jsonParse"
  });

  if (!webSearchConfig.hasWebSearchResults) {
    return null;
  }

  return (
    <h2 className="content-list-page__subheading">
      {`${t("webSearchLinkText")} `}
      <a
        className="link-tag text-body-medium-medium"
        href={webSearchConfig.webSearchUrl}
      >
        {webSearchConfig.webSearchTotal
          ? `${webSearchConfig.webSearchText} (${webSearchConfig.webSearchTotal})`
          : webSearchConfig.webSearchText}
      </a>
    </h2>
  );
};

export default memo(SearchResultHeader);
