import React, { useCallback } from "react";
import { WorkSmallFragment } from "../../../core/dbc-gateway/generated/graphql";
import { useText } from "../../../core/utils/text";
import { Pid } from "../../../core/utils/types/ids";
import Arrow from "../../atoms/icons/arrow/arrow";
import { AvailabiltityLabels } from "../../availability-label/availability-labels";
import ButtonFavourite from "../../button-favourite/button-favourite";
import { CoverProps } from "../../cover/cover";
import { Link } from "../../atoms/link";
import {
  creatorsToString,
  filterCreators,
  flattenCreators,
  getFirstPublishedYear,
  getManifestationPid
} from "../../../core/utils/helpers";
import SearchResultListItemCover from "./search-result-list-item-cover";
import HorizontalTermLine from "../../horizontal-term-line/HorizontalTermLine";

export interface SearchResultListItemProps {
  item: WorkSmallFragment;
  coverTint: CoverProps["tint"];
}

// TODO: The material item link should point at something.
const SearchResultListItem: React.FC<SearchResultListItemProps> = ({
  item: {
    titles: { full: fullTitle },
    series,
    creators,
    manifestations,
    workId
  },
  coverTint
}) => {
  const t = useText();
  const creatorsText = creatorsToString(
    flattenCreators(filterCreators(creators, ["Person"])),
    t
  );
  const author = creatorsText || "[Creators are missing]";
  const datePublished = getFirstPublishedYear(manifestations);
  const manifestationPid = getManifestationPid(manifestations);

  const handleClick = useCallback(() => {
    // TODO: Redirect to material page.
  }, []);

  return (
    // We know that is not following a11y recommendations to have an onclick handler
    // on a noninteractive element.
    // The reason why this is implemented:
    // We have interactive elements within each search result: the favourite button,
    // which must react to clicks
    // while we also want the entire search result to be clickable.
    // You cannot have nested links so onClick handlers
    // and stopping event propagation is necessary.
    //
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <article
      className="search-result-item arrow arrow__hover--right-small"
      onClick={handleClick}
      onKeyUp={handleClick}
    >
      <div className="search-result-item__cover">
        <SearchResultListItemCover
          pid={manifestationPid as Pid}
          description={String(fullTitle)}
          url="/"
          tint={coverTint}
        />
      </div>
      <div className="search-result-item__text">
        <div className="search-result-item__meta">
          <ButtonFavourite materialId={workId} />
          {series && (
            <HorizontalTermLine
              title={`${t("numberDescriptionText")} ${
                series?.[0]?.numberInSeries?.number?.[0]
              }`}
              subTitle={t("inSeriesText")}
              linkList={[series?.[0].title]}
            />
          )}
        </div>

        <h2 className="search-result-item__title text-header-h4">
          {/* TODO: Point link at material page url when ready */}
          <Link href="/">{fullTitle}</Link>
        </h2>

        {author && (
          <p className="text-small-caption">{`${t(
            "byAuthorText"
          )} ${author} (${datePublished})`}</p>
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
