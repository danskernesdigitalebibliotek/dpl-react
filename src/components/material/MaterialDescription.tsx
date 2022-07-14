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

  const { series } = work;
  const list = series.map((item) => item.title);

  return (
    <section className="material-description">
      <h2 className="text-header-h4 pb-24">Beskrivelse</h2>
      <p className="text-body-large ">{description}</p>
      <div className="material-description__links mt-32">
        <SeriesLine title={t("inTheSameSeriesText")} linkList={list} />
      </div>
    </section>
  );
};

export default MaterialDescription;
