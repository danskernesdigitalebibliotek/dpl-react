import React, { useEffect, FC, useState } from "react";
import {
  useRecommendFromFaustQuery,
  RecommendFromFaustQuery
} from "../../core/dbc-gateway/generated/graphql";
import fetchMaterial, {
  MaterialProps
} from "../loan-list/materials/utils/material-fetch-hoc";
import { useText } from "../../core/utils/text";
import RecommendMaterial from "./RecommendMaterial";
import { Work } from "../../core/utils/types/entities";
import fetchDigitalMaterial from "../loan-list/materials/utils/digital-material-fetch-hoc";
import { FaustId } from "../../core/utils/types/ids";
import { getRecommenderMaterialLimits } from "../../core/utils/helpers/general";

export interface RecommendListProps {
  loanOrReservationFaust: FaustId;
  titleKey: "recommenderTitleReservationsText" | "recommenderTitleLoansText";
}

const RecommendList: FC<RecommendListProps & MaterialProps> = ({
  material,
  loanOrReservationFaust,
  titleKey
}) => {
  const t = useText();
  const { recommender: recommenderLimit } = getRecommenderMaterialLimits();
  const { data } = useRecommendFromFaustQuery({
    faust: loanOrReservationFaust,
    limit: recommenderLimit as number
  });

  const [recommendedMaterials, setRecommendedMaterials] =
    useState<RecommendFromFaustQuery | null>(null);

  useEffect(() => {
    if (data) {
      setRecommendedMaterials(data);
    }
  }, [data]);

  return (
    <>
      {material && material.title && (
        <h2 className="recommender__title text-header-h1">
          {t(titleKey, {
            placeholders: { "@title": material.title }
          })}
        </h2>
      )}
      <ul className="recommender__triple-grid">
        {recommendedMaterials &&
          recommendedMaterials.recommend.result.map(({ work }) => (
            <RecommendMaterial work={work as Work} />
          ))}
      </ul>
    </>
  );
};

export default fetchDigitalMaterial(fetchMaterial(RecommendList));
