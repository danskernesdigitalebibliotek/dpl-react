import React from "react";
import { WorkMediumFragment } from "../../core/dbc-gateway/generated/graphql";
import { getNumberedSeries } from "../../core/utils/helpers/general";
import {
  constructMaterialUrl,
  constructSearchUrl
} from "../../core/utils/helpers/url";
import { useText } from "../../core/utils/text";
import { Pid, WorkId } from "../../core/utils/types/ids";
import { useUrls } from "../../core/utils/url";
import HorizontalTermLine from "../horizontal-term-line/HorizontalTermLine";

export interface MaterialDescriptionProps {
  pid: Pid;
  work: WorkMediumFragment;
}

const MaterialDescription: React.FC<MaterialDescriptionProps> = ({ work }) => {
  const t = useText();
  const { searchUrl, materialUrl } = useUrls();
  const { fictionNonfiction, series, subjects, seriesMembers } = work;

  const seriesList = getNumberedSeries(series);

  const seriesMembersList = seriesMembers.map((item) => {
    return {
      url: constructMaterialUrl(materialUrl, item.workId as WorkId),
      term: item.titles.main[0]
    };
  });

  const subjectsList = subjects.all.map((item) => {
    return {
      url: constructSearchUrl(searchUrl, item.display),
      term: item.display
    };
  });

  return (
    <section className="material-description">
      <h2 className="text-header-h4 pb-24">{t("descriptionHeadlineText")}</h2>
      {work.abstract && (
        <p className="text-body-large material-description__content">
          {work.abstract[0]}
        </p>
      )}
      <div className="material-description__links mt-32">
        {seriesList.map((item, i) => (
          <HorizontalTermLine
            title={`${t("numberDescriptionText")} ${
              item.numberInSeries?.number
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
        {seriesMembersList.length > 0 && (
          <HorizontalTermLine
            title={t("inSameSeriesText")}
            linkList={seriesMembersList}
            dataCy="material-description-series-members"
          />
        )}
        {subjectsList && (
          <HorizontalTermLine
            title={t("identifierText")}
            linkList={subjectsList}
            dataCy="material-description-identifier"
          />
        )}
        {fictionNonfiction && (
          <HorizontalTermLine
            title={t("fictionNonfictionText")}
            linkList={[
              {
                url: constructSearchUrl(searchUrl, fictionNonfiction.display),
                term: fictionNonfiction.display
              }
            ]}
            dataCy="material-description-fiction-nonfiction"
          />
        )}
      </div>
    </section>
  );
};

export default MaterialDescription;
