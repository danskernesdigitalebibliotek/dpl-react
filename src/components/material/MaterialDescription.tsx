import React from "react";
import { WorkMediumFragment } from "../../core/dbc-gateway/generated/graphql";
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
  const inSeries = work.series;
  const seriesMembersList = work.seriesMembers.map((item) => {
    return {
      url: constructMaterialUrl(materialUrl, item.workId as WorkId),
      term: item.titles.main[0]
    };
  });
  const subjectsList = work.subjects.all.map((item) => {
    return {
      url: constructSearchUrl(searchUrl, item.display),
      term: item.display
    };
  });
  const { fictionNonfiction } = work;

  return (
    <section className="material-description">
      <h2 className="text-header-h4 pb-24">{t("descriptionHeadlineText")}</h2>
      {work.abstract && (
        <p className="text-body-large material-description__content">
          {work.abstract[0]}
        </p>
      )}
      <div className="material-description__links mt-32">
        {inSeries &&
          inSeries.map((seriesItem) => {
            return (
              <HorizontalTermLine
                title={`${t("numberDescriptionText")} ${
                  seriesItem.numberInSeries?.number
                }`}
                subTitle={t("inSeriesText")}
                linkList={[
                  {
                    url: constructSearchUrl(searchUrl, seriesItem.title),
                    term: seriesItem.title
                  }
                ]}
              />
            );
          })}
        {seriesMembersList && (
          <HorizontalTermLine
            title={t("inSameSeriesText")}
            linkList={seriesMembersList}
          />
        )}
        {subjectsList && (
          <HorizontalTermLine
            title={t("identifierText")}
            linkList={subjectsList}
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
          />
        )}
      </div>
    </section>
  );
};

export default MaterialDescription;
