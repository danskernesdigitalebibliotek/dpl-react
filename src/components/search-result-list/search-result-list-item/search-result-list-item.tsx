import React, { useCallback } from "react";
import { WorkSimpleFragment } from "../../../core/dbc-gateway/generated/graphql";
import Arrow from "../../atoms/icons/arrow/arrow";
import AvailabilityLabels, {
  AvailabiltityLabels
} from "../../availability-label/availability-labels";
import ButtonFavourite from "../../button-favourite/button-favourite";
import { CoverProps } from "../../cover/cover";
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
  coverTint: CoverProps["tint"];
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

  // TODO: Redirect to material page.
  const handleClick = useCallback(() => {
    console.log("Going to material page!");
  }, []);

  return (
    // We know that is not following a11y recommendations to have an onclick handler
    // on a noninteractive element.
    // But since we have a link in the title we should be alright.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <article
      className="search-result-item arrow arrow__hover--right-small"
      onClick={handleClick}
      onKeyUp={handleClick}
    >
      <div className="search-result-item__cover">
        <SearchResultListItemCover
          materialId={manifestationPid}
          description={String(fullTitle)}
          url="/"
          tint={coverTint}
        />
      </div>
      <div className="search-result-item__text">
        <div className="search-result-item__meta">
          <ButtonFavourite materialId={workId} />
          {series && <SearchResultListItemSeries series={series} />}
        </div>

        <h2 className="search-result-item__title text-header-h4">
          {/* TODO: Remove this little inline style and make a class for it in dpl-design-system. */}
          <a style={{ textDecoration: "none" }} href="/">
            {fullTitle}
          </a>
        </h2>

        {author && (
          <p className="text-small-caption">{`Af ${author} (${datePublished})`}</p>
        )}
      </div>
      <div className="search-result-item__availability">
        <AvailabiltityLabels manifestations={manifestations} />
      </div>
      <Arrow />
    </article>
  );
};

export default SearchResultListItem;
