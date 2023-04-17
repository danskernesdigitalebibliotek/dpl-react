import React, { useEffect, FC, useState } from "react";
import {
  useSearchWithPaginationQuery,
  SearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";
import { useConfig } from "../../core/utils/config";
import { getRecommenderMaterialLimits } from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";
import { Work } from "../../core/utils/types/entities";
import RecommendMaterial from "./RecommendMaterial";

const InspirationRecommender: FC = () => {
  const t = useText();
  const config = useConfig();

  const defaultSearchFromConfig = config("emptyRecommenderSearchConfig");
  const { inspiration: inspirationLimit } = getRecommenderMaterialLimits();
  const [recommendedMaterials, setRecommendedMaterials] =
    useState<SearchWithPaginationQuery | null>(null);
  const { data } = useSearchWithPaginationQuery({
    limit: inspirationLimit as number,
    q: {
      all: defaultSearchFromConfig
    },
    offset: 0
  });

  useEffect(() => {
    if (data) {
      setRecommendedMaterials(data);
    }
  }, [data]);

  if (recommendedMaterials === null) return null;

  return (
    <>
      <h2 className="recommender__title text-header-h1">
        {t("recommenderTitleInspirationText")}
      </h2>
      <ul className="recommender__grid">
        {recommendedMaterials &&
          recommendedMaterials.search.works.map((work) => (
            <RecommendMaterial work={work as Work} />
          ))}
      </ul>
    </>
  );
};

export default InspirationRecommender;
