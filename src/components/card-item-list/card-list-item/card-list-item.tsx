import React, { useCallback, useId } from "react";
import { useDispatch } from "react-redux";
import { useText } from "../../../core/utils/text";
import { WorkId } from "../../../core/utils/types/ids";
import Arrow from "../../atoms/icons/arrow/arrow";
import { AvailabilityLabels } from "../../availability-label/availability-labels";
import ButtonFavourite, {
  ButtonFavouriteId
} from "../../button-favourite/button-favourite";
import { CoverProps } from "../../cover/cover";
import Link from "../../atoms/links/Link";
import {
  creatorsToString,
  flattenCreators,
  getReleaseYearSearchResult,
  materialIsFiction,
  getManifestationsPids
} from "../../../core/utils/helpers/general";
import CardListItemCover from "./card-list-item-cover";
import { useUrls } from "../../../core/utils/url";
import {
  constructMaterialUrl,
  redirectTo
} from "../../../core/utils/helpers/url";
import { TypedDispatch } from "../../../core/store";
import { guardedRequest } from "../../../core/guardedRequests.slice";
import { Work } from "../../../core/utils/types/entities";
import { useEventStatistics } from "../../../core/statistics/useStatistics";
import { statistics } from "../../../core/statistics/statistics";
import { useItemHasBeenVisible } from "../../../core/utils/helpers/lazy-load";
import {
  getFirstBookManifestation,
  getManifestationLanguageIsoCode
} from "../../../apps/material/helper";
import useFilterHandler from "../../../apps/search-result/useFilterHandler";
import { getFirstMaterialTypeFromFilters } from "../../../apps/search-result/helper";
import SubjectNumber from "../../subject-number/SubjectNumber";
import SeriesList from "./series-list";

export interface CardListItemProps {
  item: Work;
  coverTint: CoverProps["tint"];
  resultNumber: number;
  preferredId?: WorkId; // If this item is on the favorites list, there is a single
  // preferred ID - it needs to match the favorite item ID from useGetList("default")
  // call in FavoritesList.tsx component.
  dataCy?: string;
}
const CardListItem: React.FC<CardListItemProps> = ({
  item,
  item: {
    titles: { full: fullTitle },
    series,
    creators,
    manifestations: { all: manifestations, bestRepresentation, mostRelevant },
    workId
  },
  coverTint,
  resultNumber,
  preferredId,
  dataCy = "card-list-item"
}) => {
  const searchTitleId = useId();
  const t = useText();
  const u = useUrls();
  const searchUrl = u("searchUrl");
  const materialUrl = u("materialUrl");

  const { filters } = useFilterHandler();
  const materialTypeFromFilters = getFirstMaterialTypeFromFilters(
    filters,
    manifestations
  );
  const bookManifestation = getFirstBookManifestation(manifestations);

  const dispatch = useDispatch<TypedDispatch>();
  const author = creatorsToString(flattenCreators(creators), t);
  const manifestationPids = getManifestationsPids(manifestations);
  const materialFullUrl = constructMaterialUrl(
    materialUrl,
    workId as WorkId,
    materialTypeFromFilters
  );
  const languageIsoCode = getManifestationLanguageIsoCode(manifestations);
  const materialToShow =
    mostRelevant?.[0] || bestRepresentation || bookManifestation;
  const { shelfmark } = materialToShow;
  const { track } = useEventStatistics();
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

  const isMaterialIsFiction = materialIsFiction(materialToShow);

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
      data-cy={dataCy}
      className="card-list-item arrow__hover--right-small"
      onClick={() => {
        handleClick();
      }}
      onKeyUp={(e) => e.key === "Enter" && handleClick}
    >
      <div className="card-list-item__cover">
        {showItem && (
          <CardListItemCover
            ids={manifestationPids}
            // We'll try to prioritize book covers or else use FBI's recommended manifestation.
            bestRepresentation={materialToShow}
            url={materialFullUrl}
            tint={coverTint}
            linkAriaLabelledBy={searchTitleId}
          />
        )}
      </div>
      <div className="card-list-item__text">
        <div className="card-list-item__meta">
          {showItem && (
            <ButtonFavourite
              title={fullTitle.join(", ")}
              id={preferredId || workId}
              addToListRequest={addToListRequest}
            />
          )}
          <SeriesList
            series={series}
            searchUrl={searchUrl}
            t={t}
            workId={workId}
          />
        </div>
        {!isMaterialIsFiction && shelfmark && (
          <SubjectNumber
            className="text-tags color-secondary-gray mt-8"
            shelfmark={shelfmark}
          />
        )}

        <h2
          className="card-list-item__title text-header-h4 mb-4"
          data-cy="card-list-item-title"
          lang={languageIsoCode}
          id={searchTitleId}
        >
          <Link href={materialFullUrl} stopPropagation>
            {fullTitle.join(", ")}
          </Link>
        </h2>

        {author && item && (
          <p className="text-small-caption" data-cy="card-list-item-author">
            {`${t("byAuthorText")} ${author}`}
            {getReleaseYearSearchResult(item)
              ? ` (${getReleaseYearSearchResult(item)})`
              : ""}
          </p>
        )}
      </div>
      <div
        className="card-list-item__availability"
        data-cy="card-list-item-availability"
      >
        {showItem && (
          <AvailabilityLabels
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

export default CardListItem;
