import React from "react";
import { WorkSimpleFragment } from "../../../core/dbc-gateway/generated/graphql";
import getCreatorTextFromManifestations, {
  creatorsToString,
  flattenCreators,
  getFirstPublishedYear
} from "../helpers";
import SearchResultListItemSeries from "./search-result-list-item-series";

export interface SearchResultListItemProps {
  item: WorkSimpleFragment;
}

// TODO: SVG icons. Why are they not a part of the design system as assets?
// TODO: The material item link should point at something.
const SearchResultListItem: React.FC<SearchResultListItemProps> = ({
  item: { fullTitle, series, creators, manifestations }
}) => {
  const creatorsText = creatorsToString(flattenCreators(creators));
  const author = creatorsText || "[Creators are missing]";
  const datePublished = getFirstPublishedYear(manifestations);

  return (
    <a href="/" className="search-result-item arrow arrow__hover--right-small">
      <div className="search-result-item__cover">
        <div className="material-container">
          <a href="/" className="material material--small bg-identity-tint-120">
            &nbsp;
          </a>
        </div>
      </div>
      <div className="search-result-item__text">
        <div className="search-result-item__meta">
          <button
            type="button"
            aria-label="Tilføj til favoritter"
            className="button-favourite"
          >
            <svg
              className="icon-favourite"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 20L10.2675 18.921C5.89 15.1035 3 12.5858 3 9.49591C3 6.9782 5.057 5 7.675 5C9.154 5 10.5735 5.66213 11.5 6.70845C12.4265 5.66213 13.846 5 15.325 5C17.943 5 20 6.9782 20 9.49591C20 12.5858 17.11 15.1035 12.7325 18.9292L11.5 20Z"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </button>
          {series && <SearchResultListItemSeries series={series} />}
        </div>
        <h2 className="search-result-item__title text-header-h4">
          {fullTitle}
        </h2>
        {author && (
          <p className="text-small-caption">{`Af ${author} (${datePublished})`}</p>
        )}
      </div>
      <svg
        width="61"
        height="9"
        viewBox="0 0 61 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className="arrow__body" d="M60 4.5H0" stroke="black" />
        <path
          className="arrow__head"
          d="M60.3537 4.85355C60.5489 4.65829 60.5489 4.34171 60.3537 4.14645L57.1717 0.96447C56.9764 0.769208 56.6598 0.769208 56.4646 0.96447C56.2693 1.15973 56.2693 1.47631 56.4646 1.67157L59.293 4.5L56.4646 7.32843C56.2693 7.52369 56.2693 7.84027 56.4646 8.03553C56.6598 8.2308 56.9764 8.2308 57.1717 8.03553L60.3537 4.85355ZM60.0001 4H57.0001V5H60.0001V4Z"
          fill="black"
        />
      </svg>
    </a>
  );
};

export default SearchResultListItem;
