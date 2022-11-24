import * as React from "react";
import { useText } from "../../../core/utils/text";

export interface SearchResultHeaderProps {
  hitcount: string;
  q: string;
}

const SearchResultHeader: React.FC<SearchResultHeaderProps> = ({
  hitcount,
  q
}) => {
  const t = useText();

  return (
    <h1 className="text-header-h2 mb-16 search-result-title">
      {`${t("showingResultsForText")} “${q}” (${hitcount})`}
    </h1>
  );
};

export default SearchResultHeader;
