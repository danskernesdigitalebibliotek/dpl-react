import React from "react";
import { WorkSimpleFragment } from "../../../core/dbc-gateway/generated/graphql";
import Arrow from "../../atoms/icons/arrow/arrow";
import ButtonFavourite from "../../button-favourite/button-favourite";
import { MaterialProps } from "../../material/material";
import {
  creatorsToString,
  flattenCreators,
  getFirstPublishedYear,
  getManifestationPid
} from "../helpers";
import SearchResultListItemCover from "./search-result-list-item-cover";
import SearchResultListItemSeries from "./search-result-list-item-series";

export interface SearchResultListItemProps {
  item: WorkSimpleFragment;
  coverTint: MaterialProps["tint"];
}

// TODO: The material item link should point at something.
const SearchResultListItem: React.FC<SearchResultListItemProps> = ({
  item: { fullTitle, series, creators, manifestations, id: workId },
  coverTint
}) => {
  const creatorsText = creatorsToString(flattenCreators(creators));
  const author = creatorsText || "[Creators are missing]";
  const datePublished = getFirstPublishedYear(manifestations);
  const manifestationPid = getManifestationPid(manifestations);

  return (
    <article className="search-result-item arrow arrow__hover--right-small">
      <div className="search-result-item__cover">
        <SearchResultListItemCover
          materialId={manifestationPid}
          materialDescription={String(fullTitle)}
          materialUrl="/"
          tint={coverTint}
        />
      </div>
      <div className="search-result-item__text">
        <div className="search-result-item__meta">
          <ButtonFavourite materialId={workId} />
          {series && <SearchResultListItemSeries series={series} />}
        </div>
        <h2 className="search-result-item__title text-header-h4">
          {fullTitle}
        </h2>
        {author && (
          <p className="text-small-caption">{`Af ${author} (${datePublished})`}</p>
        )}
      </div>
      <Arrow />
    </article>
  );
};

export default SearchResultListItem;
