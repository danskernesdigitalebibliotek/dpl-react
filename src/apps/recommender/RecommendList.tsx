import React, { useEffect, FC, useState } from "react";
import {
  useRecommendFromFaustQuery,
  RecommendFromFaustQuery
} from "../../core/dbc-gateway/generated/graphql";
import { LoanType } from "../../core/utils/types/loan-type";
import fetchMaterial, {
  MaterialProps
} from "../loan-list/materials/utils/material-fetch-hoc";
import { useText } from "../../core/utils/text";
import RecommendMaterial from "./RecommendMaterial";
import { ReservationType } from "../../core/utils/types/reservation-type";
import { Work } from "../../core/utils/types/entities";
import fetchDigitalMaterial from "../loan-list/materials/utils/digital-material-fetch-hoc";

export interface RecommendListProps {
  loan?: LoanType;
  reservation?: ReservationType;
}

const RecommendList: FC<RecommendListProps & MaterialProps> = ({
  material,
  reservation,
  loan
}) => {
  const t = useText();
  const id =
    loan?.faust ||
    reservation?.faust ||
    loan?.identifier ||
    reservation?.identifier ||
    "";

  const { data } = useRecommendFromFaustQuery({
    faust: id,
    limit: 4
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
          {loan
            ? t("recommenderTitleLoansText", {
                placeholders: { "@title": material.title }
              })
            : t("recommenderTitleReservationsText", {
                placeholders: { "@title": material.title }
              })}
        </h2>
      )}
      <ul className="recommender__grid">
        {recommendedMaterials &&
          recommendedMaterials.recommend.result.map(({ work }) => (
            <RecommendMaterial work={work as Work} />
          ))}
      </ul>
    </>
  );
};

export default fetchDigitalMaterial(fetchMaterial(RecommendList));
