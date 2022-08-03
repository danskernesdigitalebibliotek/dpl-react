import React from "react";
import { WorkMediumFragment } from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";
import HorizontalTermLine from "../horizontal-term-line/HorizontalTermLine";

export interface MaterialDescriptionProps {
  pid: Pid;
  searchUrl: string;
  work: WorkMediumFragment;
}

const MaterialDescription: React.FC<MaterialDescriptionProps> = ({
  searchUrl,
  work
}) => {
  const t = useText();
  const inSeries = work.series;
  const seriesMembersList = work.seriesMembers.map(
    (item) => item.titles.main[0]
  );
  const subjectsList = work.subjects.all.map((item) => item.display);

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
                linkList={[seriesItem.title]}
              />
            );
          })}
        {seriesMembersList && (
          <HorizontalTermLine
            title={t("inSameSeriesText")}
            linkList={seriesMembersList}
            searchUrl={searchUrl}
          />
        )}
        {subjectsList && (
          <HorizontalTermLine
            title={t("identifierText")}
            linkList={subjectsList}
            searchUrl={searchUrl}
          />
        )}
      </div>
    </section>
  );
};

export default MaterialDescription;
