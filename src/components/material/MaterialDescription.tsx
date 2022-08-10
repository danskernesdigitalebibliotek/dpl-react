import React from "react";
import { WorkMediumFragment } from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import { Pid } from "../../core/utils/types/ids";
import HorizontalTermLine from "../horizontal-term-line/HorizontalTermLine";

export interface MaterialDescriptionProps {
  pid: Pid;
  work: WorkMediumFragment;
}

const MaterialDescription: React.FC<MaterialDescriptionProps> = ({ work }) => {
  const t = useText();
  const inSeries = work.series;
  const seriesMembersList = work.seriesMembers.map(
    (item) => item.titles.main[0]
  );
  const subjectsList = work.subjects.all.map((item) => item.display);
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
                linkList={[seriesItem.title]}
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
            linkList={[fictionNonfiction.display]}
          />
        )}
      </div>
    </section>
  );
};

export default MaterialDescription;
