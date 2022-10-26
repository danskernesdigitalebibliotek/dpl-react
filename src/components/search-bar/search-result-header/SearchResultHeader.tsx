import * as React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../core/modal.slice";
import { useText } from "../../../core/utils/text";
import { FacetBrowserModalId } from "../../facet-browser/FacetBrowserModal";
import Tag from "../../tag/Tag";

export interface SearchResultHeaderProps {
  hitcount: string;
  q: string;
}

const SearchResultHeader: React.FC<SearchResultHeaderProps> = ({
  hitcount,
  q
}) => {
  const t = useText();
  const dispatch = useDispatch();

  return (
    <>
      <h1 className="text-header-h2 mb-16 search-result-title">
        {`${t("showingResultsForText")} “${q}” (${hitcount})`}
      </h1>
      <Tag
        onClick={() => dispatch(openModal({ modalId: FacetBrowserModalId }))}
      >
        {t("addMoreFiltersText")}
      </Tag>
    </>
  );
};

export default SearchResultHeader;
