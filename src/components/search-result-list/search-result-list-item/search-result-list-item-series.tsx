import React from "react";
import { SeriesSimpleFragment } from "../../../core/dbc-gateway/generated/graphql";

interface SearchResultListItemSeriesProps {
  series: SeriesSimpleFragment[];
}

const SearchResultListItemSeries: React.FC<SearchResultListItemSeriesProps> = ({
  series
}) => {
  // We do not know why there are multiple series and which one we should pick.
  // For now we go for the first entry.
  const numberInSeries = series?.[0]?.numberInSeries?.display;
  const title = series?.[0]?.title;
  return (
    <div className="text-small-caption">
      {numberInSeries && (
        <span>
          <span className="text-label-semibold">{numberInSeries}</span> i
          serien&nbsp;
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
