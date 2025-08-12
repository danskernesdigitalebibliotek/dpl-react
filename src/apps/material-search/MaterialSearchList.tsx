import React, { FC } from "react";
import { WorkId } from "../../core/utils/types/ids";
import { Cover } from "../../components/cover/cover";
import MaterialSearchLoading from "./MaterialSearchLoading";
import { flattenCreators } from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";
import useInfiniteScrollLoading from "./useInfiteScrollLoading";
import { SearchWithPaginationQuery } from "../../core/dbc-gateway/generated/graphql";
import { first } from "lodash";

type MaterialSearchListResultsProps = {
  data: SearchWithPaginationQuery["search"]["works"];
  isLoading: boolean;
  onWorkIdSelect: (workId: WorkId) => void;
  selectedWorkId?: WorkId | string;
  loadMore: () => void;
  hitCount: number;
};

const MaterialSearchListResults: FC<MaterialSearchListResultsProps> = ({
  data,
  isLoading,
  onWorkIdSelect,
  selectedWorkId,
  loadMore,
  hitCount
}) => {
  const t = useText();

  const { containerRef, lastItemRef, handleFocus } = useInfiniteScrollLoading({
    data,
    isLoading,
    loadMore,
    hitCount,
    onWorkIdSelect
  });

  if (isLoading && data.length === 0) {
    return (
      <div className="material-search-list">
        <div className="material-search-list__header" />
        <ul className="material-search-list__results">
          <li className="material-search-list__loading">
            <MaterialSearchLoading
              loadingText={t("materialSearchLoadingText")}
            />
          </li>
        </ul>
      </div>
    );
  }

  if (!data || data.length === 0) return null;
  const works = data;

  return (
    <div className="material-search-list" ref={containerRef}>
      <div className="material-search-list__header">
        {t("materialSearchAmountOfResultsText")}:<span>{hitCount}</span>
      </div>
      <ol className="material-search-list__results">
        {works.map((work, index) => {
          const authors = flattenCreators(work.creators);
          const isLastItem = index === data.length - 1;
          const firstMostRelevantManifestation = first(
            work.manifestations.mostRelevant
          );

          const pids: string[] = [];
          if (firstMostRelevantManifestation?.pid) {
            pids.push(firstMostRelevantManifestation.pid);
          }
          if (work.manifestations.bestRepresentation.pid) {
            pids.push(work.manifestations.bestRepresentation.pid);
          }

          return (
            <li
              className={`material-search-list__item ${
                selectedWorkId === work.workId
                  ? "material-search-list__item--highlighted"
                  : ""
              }`}
              key={work.workId}
              ref={isLastItem ? lastItemRef : null}
            >
              <button
                className="material-search-list__button"
                type="button"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  onWorkIdSelect(work.workId as WorkId);
                }}
                onFocus={(e) => handleFocus(index, e.currentTarget)}
                aria-label={t("materialSearchAriaButtonSelectWorkWithText", {
                  placeholders: { "@title": `${work.titles.full}` }
                })}
              >
                <Cover size="large" displaySize="2xsmall" ids={pids} animate />
                <div>
                  <div className="material-search-list__detail-item">
                    <span className="material-search-list__term">
                      {t("materialSearchPreviewTitleText")}:
                    </span>
                    <span className="material-search-list__detail">
                      {work.titles.full}
                    </span>
                  </div>
                  <div className="material-search-list__detail-item">
                    <span className="material-search-list__term">
                      {t("materialSearchPreviewAuthorText")}:
                    </span>
                    <span className="material-search-list__detail">
                      {authors}
                    </span>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
        {isLoading && (
          <li className="material-search-list__loading">
            <MaterialSearchLoading
              loadingText={t("materialSearchLoadingText")}
            />
          </li>
        )}
      </ol>
    </div>
  );
};

export default MaterialSearchListResults;
