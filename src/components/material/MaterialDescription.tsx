import React from "react";
import {
  getUniqueMovies,
  getDbcVerifiedSubjectsFirst,
  materialContainsDanish
} from "../../apps/material/helper";
import { useItemHasBeenVisible } from "../../core/utils/helpers/lazy-load";
import {
  constructDK5SearchUrl,
  constructMaterialUrl,
  constructSearchUrl,
  constructSubjectSearchUrl
} from "../../core/utils/helpers/url";
import { useText } from "../../core/utils/text";
import { Work } from "../../core/utils/types/entities";
import { Pid, WorkId } from "../../core/utils/types/ids";
import { useUrls } from "../../core/utils/url";
import HorizontalTermLine from "../horizontal-term-line/HorizontalTermLine";
import { materialIsFiction } from "../../core/utils/helpers/general";
import SeriesList from "../card-item-list/card-list-item/series-list";
import ButtonShare from "../button-share/button-share";

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

  // Show DK5 for all non-fiction works OR fiction works in non-Danish languages
  const shouldShowDk5 =
    !isFiction || (isFiction && !materialContainsDanish(work));

  const seriesMembersList =
    (series &&
      series[0]?.members.map((member) => {
        // TODO: Since the series has changed it structure and can have multiple members
        // we need to double check if we can only look at the first member entry.
        return {
          url: constructMaterialUrl(materialUrl, member.work.workId as WorkId),
          term: member.work.titles.main[0]
        };
      })) ??
    [];

  const subjectsList = getDbcVerifiedSubjectsFirst(subjects).map((item) => ({
    url: constructSubjectSearchUrl(searchUrl, item),
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
            {shouldShowDk5 && dk5MainEntry && (
              <HorizontalTermLine
                title={t("subjectNumberText")}
                linkList={[
                  {
                    url: constructDK5SearchUrl(searchUrl, dk5MainEntry.code),
                    term: dk5MainEntry.display
                  }
                ]}
              />
            )}
            <SeriesList
              series={series}
              searchUrl={searchUrl}
              t={t}
              workId={work.workId}
              dataCy="material-description-series"
            />
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
          <ButtonShare className="mt-64" />
        </>
      )}
    </section>
  );
};

export default MaterialDescription;
