import React from "react";
import { SeriesSimpleFragment } from "../../../core/dbc-gateway/generated/graphql";

interface SearchResultListItemSeriesProps {
  series: SeriesSimpleFragment;
}

const SearchResultListItemSeries: React.FC<SearchResultListItemSeriesProps> = ({
  series: { part, title }
}) => {
  return (
    <div className="text-small-caption">
      {part && (
        <span>
          <span className="text-label-semibold">{part}</span> i serien&nbsp;
        </span>
      )}
      {/* TODO: Should be converted to a Link component when the link component is ready */}
      {title && (
        <a href="/" className="link-tag">
          {title}
        </a>
      )}
    </div>
  );
};

export default SearchResultListItemSeries;
