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
import { ListType } from "../../core/utils/types/list-type";

export interface RecommendListProps {
  loanOrReservation: ListType;
}

const RecommendList: FC<RecommendListProps & MaterialProps> = ({
  material,
  loanOrReservation
}) => {
  const t = useText();

  const { data } = useRecommendFromFaustQuery({
    faust: loanOrReservation.faust || "",
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
