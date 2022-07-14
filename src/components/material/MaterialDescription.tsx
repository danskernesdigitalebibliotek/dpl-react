import React from "react";
import { WorkMediumFragment } from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import SeriesLine from "./MaterialSeriesLine";

interface MaterialDescriptionProps {
  work: WorkMediumFragment;
  description?: string;
}

const MaterialDescription: React.FC<MaterialDescriptionProps> = ({
  work,
  description
}) => {
  const t = useText();

  const seriesMembersList = work.seriesMembers.map(
    (item) => item.titles.main[0]
  );
  const subjectsList = work.subjects.all.map((item) => item.display);

  return (
    <section
      className="material-description"
      // TODO: Width has to be change in dpl-design-system so it matches the width from figma
      style={{ maxWidth: "100%" }}
    >
      <h2 className="text-header-h4 pb-24">Beskrivelse</h2>
      <p className="text-body-large ">{description}</p>
      <div className="material-description__links mt-32">
        {work.series.map((item) => (
          <SeriesLine
            title={`Nr. ${item?.numberInSeries?.number?.[0]}`}
            subTitle={t("numberInSeriesText")}
            linkList={[String(item?.numberInSeries?.display)]}
          />
        ))}
        <SeriesLine
          title={t("inTheSameSeriesText")}
          linkList={seriesMembersList}
        />
        <SeriesLine title={t("subjectsText")} linkList={subjectsList} />
      </div>
    </section>
  );
};

export default MaterialDescription;
