import React, { useEffect, FC, useState } from "react";
import {
  useRecommendFromPidQuery,
  RecommendFromPidQuery
} from "../../core/dbc-gateway/generated/graphql";
import { LoanType } from "../../core/utils/types/loan-type";
import fetchMaterial, {
  MaterialProps
} from "../loan-list/materials/utils/material-fetch-hoc";
import { useText } from "../../core/utils/text";
import RecommendMaterial from "./RecommendMaterial";

export interface RecommendListProps {
  loan: LoanType;
}

const RecommendList: FC<RecommendListProps & MaterialProps> = ({
  material,
  loan
}) => {
  const t = useText();
  const { data } = useRecommendFromPidQuery({
    pid: `870970-basis:${loan.faust}`,
    limit: 4
  });
  const [recommendedMaterials, setRecommendedMaterials] =
    useState<RecommendFromPidQuery | null>(null);

  useEffect(() => {
    if (data) {
      setRecommendedMaterials(data);
    }
  }, [data]);

  return (
    <>
      {material && <h1 className="text-header-h1">{material?.title}</h1>}
      <div className="recommender-grid">
        {recommendedMaterials &&
          recommendedMaterials.recommend.result.map(({ work }) => (
            <RecommendMaterial work={work} id={work.workId} />
          ))}
      </div>
    </>
  );
};

export default fetchMaterial(RecommendList);
