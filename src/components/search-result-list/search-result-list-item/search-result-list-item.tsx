import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useText } from "../../../core/utils/text";
import { WorkId } from "../../../core/utils/types/ids";
import Arrow from "../../atoms/icons/arrow/arrow";
import { AvailabiltityLabels } from "../../availability-label/availability-labels";
import ButtonFavourite, {
  ButtonFavouriteId
} from "../../button-favourite/button-favourite";
import { CoverProps } from "../../cover/cover";
import { Link } from "../../atoms/link";
import {
  creatorsToString,
  filterCreators,
  flattenCreators,
  getManifestationPid
} from "../../../core/utils/helpers/general";
import SearchResultListItemCover from "./search-result-list-item-cover";
import HorizontalTermLine from "../../horizontal-term-line/HorizontalTermLine";
import { useUrls } from "../../../core/utils/url";
import {
  constructMaterialUrl,
  constructSearchUrl,
  redirectTo
} from "../../../core/utils/helpers/url";
import { TypedDispatch } from "../../../core/store";
import { guardedRequest } from "../../../core/guardedRequests.slice";
import { Work } from "../../../core/utils/types/entities";
import { useStatistics } from "../../../core/statistics/useStatistics";
import { statistics } from "../../../core/statistics/statistics";
import { useItemHasBeenVisible } from "../../../core/utils/helpers/lazy-load";

export interface SearchResultListItemProps {
  item: Work;
  coverTint: CoverProps["tint"];
  resultNumber: number;
}

const SearchResultListItem: React.FC<SearchResultListItemProps> = ({
  item: {
    titles: { full: fullTitle },
    series,
    creators,
    manifestations: { all: manifestations },
    workId,
    workYear
  },
  coverTint,
  resultNumber
}) => {
  const t = useText();
  const { materialUrl, searchUrl } = useUrls();
  const dispatch = useDispatch<TypedDispatch>();
  const author = creatorsToString(
    flattenCreators(filterCreators(creators, ["Person"])),
    t
  );
  const manifestationPid = getManifestationPid(manifestations);
  const firstInSeries = series?.[0];
  const { title: seriesTitle, numberInSeries } = firstInSeries || {};
  const materialFullUrl = constructMaterialUrl(materialUrl, workId as WorkId);
  const { track } = useStatistics();
  // We use hasBeenVisible to determine if the search result
  // is, or has been, visible in the viewport.
  const { itemRef, hasBeenVisible: showItem } = useItemHasBeenVisible();

  const handleClick = useCallback(() => {
    track("click", {
      id: statistics.searchResultNumberClick.id,
      name: statistics.searchResultNumberClick.name,
      trackedData: resultNumber.toString()
    }).then(() => {
      redirectTo(materialFullUrl);
    });
    // We only want to call this on materialFullUrl change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialFullUrl]);

  const addToListRequest = (id: ButtonFavouriteId) => {
    dispatch(
      guardedRequest({
        type: "addFavorite",
        args: { id },
        app: "search-result"
      })
    );
  };

  return (
    // We know that is not following a11y recommendations to have an onclick
    // handler on a non-interactive element.
    //
    // The reason why this is implemented:
    // We have interactive elements within each search result
    // namely the the favorite button, which must react to clicks while we also want the
    // entire search result to be clickable.
    // You cannot have nested links so onClick handlers and stopping event propagation
    // is necessary.
    //
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <article
      ref={itemRef}
      className="search-result-item arrow arrow__hover--right-small"
      onClick={handleClick}
      onKeyUp={(e) => e.key === "Enter" && handleClick}
    >
      <div className="search-result-item__cover">
        {showItem && (
          <SearchResultListItemCover
            id={manifestationPid}
            description={String(fullTitle)}
            url={materialFullUrl}
            tint={coverTint}
          />
        )}
      </div>
      <div className="search-result-item__text">
        <div className="search-result-item__meta">
          {showItem && (
            <ButtonFavourite id={workId} addToListRequest={addToListRequest} />
          )}
          {numberInSeries && seriesTitle && (
            <HorizontalTermLine
              title={`${t("numberDescriptionText")} ${
                numberInSeries.number?.[0]
              }`}
              subTitle={t("inSeriesText")}
              linkList={[
                {
                  url: constructSearchUrl(searchUrl, seriesTitle),
                  term: seriesTitle
                }
              ]}
            />
          )}
        </div>

        <h2
          className="search-result-item__title text-header-h4"
          data-cy="search-result-item-title"
        >
          <Link href={materialFullUrl}>{fullTitle}</Link>
        </h2>

        {author && (
          <p className="text-small-caption" data-cy="search-result-item-author">
            {`${t("byAuthorText")} ${author}`}
            {workYear && ` (${workYear.year})`}
          </p>
        )}
      </div>
      <div
        className="search-result-item__availability"
        data-cy="search-result-item-availability"
      >
        {showItem && (
          <AvailabiltityLabels
            cursorPointer
            workId={workId}
            manifestations={manifestations}
          />
        )}
      </div>
      <Arrow />
    </article>
  );
};

export default SearchResultListItem;
