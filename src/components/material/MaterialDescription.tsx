import React from "react";
import {
  getNumberedSeries,
  getUniqueMovies,
  getDbcVerifiedSubjectsFirst
} from "../../apps/material/helper";
import { useItemHasBeenVisible } from "../../core/utils/helpers/lazy-load";
import {
  constructMaterialUrl,
  constructSearchUrl
} from "../../core/utils/helpers/url";
import { useText } from "../../core/utils/text";
import { Work } from "../../core/utils/types/entities";
import { Pid, WorkId } from "../../core/utils/types/ids";
import { useUrls } from "../../core/utils/url";
import HorizontalTermLine from "../horizontal-term-line/HorizontalTermLine";
import { materialIsFiction } from "../../core/utils/helpers/general";

export interface MaterialDescriptionProps {
  pid: Pid;
  work: Work;
}

const MaterialDescription: React.FC<MaterialDescriptionProps> = ({ work }) => {
  const { itemRef, hasBeenVisible: showItem } = useItemHasBeenVisible();
  const t = useText();
  const u = useUrls();
  const searchUrl = u("searchUrl");
  const materialUrl = u("materialUrl");
  const { fictionNonfiction, series, subjects, relations, dk5MainEntry } = work;

  const isFiction = materialIsFiction(work);
  const seriesList = getNumberedSeries(series);

  const seriesMembersList = series.map((seriesItem) => {
    // TODO: Since the series has changed it structure and can have multiple members
    // we need to double check if we can only look at the first member entry.
    return {
      url: constructMaterialUrl(
        materialUrl,
        seriesItem.members[0].work.workId as WorkId
      ),
      term: seriesItem.members[0].work.titles.main[0]
    };
  });

  const subjectsList = getDbcVerifiedSubjectsFirst(subjects).map((item) => ({
    url: constructSearchUrl(searchUrl, item),
    term: item
  }));

  const filmAdaptationsList = getUniqueMovies(relations).map((item) => {
    return {
      url: constructMaterialUrl(materialUrl, item.ownerWork.workId as WorkId),
      term: item.ownerWork.titles.main[0]
    };
  });

  const fictionNonfictionList = fictionNonfiction
    ? [
        {
          url: constructSearchUrl(searchUrl, fictionNonfiction.display),
          term: fictionNonfiction.display
        }
      ]
    : [];

  return (
    <section
      ref={itemRef}
      className="material-description"
      data-cy="material-description"
    >
      {showItem && (
        <>
          <h2 className="text-header-h4 pb-24">
            {t("descriptionHeadlineText")}
          </h2>
          {work.abstract && (
            <p className="text-body-large material-description__content">
              {work.abstract[0]}
            </p>
          )}
          <div className="material-description__links mt-32">
            {!isFiction && dk5MainEntry && (
              <HorizontalTermLine
                title={t("subjectNumberText")}
                linkList={[
                  {
                    url: constructSearchUrl(searchUrl, dk5MainEntry.display),
                    term: dk5MainEntry.display
                  }
                ]}
              />
            )}
            {seriesList.map((item, i) => (
              // TODO: Since the series has changed it structure and can have multiple members
              // we need to double check if we can only look at the first member entry.
              <HorizontalTermLine
                title={`${t("numberDescriptionText")} ${
                  item.members[0].numberInSeries
                }`}
                subTitle={t("inSeriesText")}
                linkList={[
                  {
                    url: constructSearchUrl(searchUrl, item.title),
                    term: item.title
                  }
                ]}
                dataCy={`material-description-series-${i}`}
              />
            ))}
            <HorizontalTermLine
              title={t("inSameSeriesText")}
              linkList={seriesMembersList}
              dataCy="material-description-series-members"
            />
            <HorizontalTermLine
              title={t("identifierText")}
              linkList={subjectsList}
              dataCy="material-description-identifier"
            />
            <HorizontalTermLine
              title={t("fictionNonfictionText")}
              linkList={fictionNonfictionList}
              dataCy="material-description-fiction-nonfiction"
            />
            <HorizontalTermLine
              title={t("filmAdaptationsText")}
              linkList={filmAdaptationsList}
              dataCy="material-description-film-adaptations"
            />
          </div>
        </>
      )}
    </section>
  );
};

export default MaterialDescription;
