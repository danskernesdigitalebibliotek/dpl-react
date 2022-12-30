import React, { useEffect, FC, useState } from "react";
import {
  useSearchWithPaginationQuery,
  SearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import { Work } from "../../core/utils/types/entities";
import RecommendMaterial from "./RecommendMaterial";

const InspirationRecommender: FC = () => {
  const t = useText();

  const [recommendedMaterials, setRecommendedMaterials] =
    useState<SearchWithPaginationQuery | null>(null);
  const { data } = useSearchWithPaginationQuery({
    limit: 4,
    q: {
      // todo obviously figure out what this must say
      all: "harry"
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
      <h1 className="text-header-h1">{t("recommenderTitleInspirationText")}</h1>
      <div className="recommender-grid">
        {recommendedMaterials &&
          recommendedMaterials.search.works.map((work) => (
            <RecommendMaterial work={work as Work} />
          ))}
      </div>
    </>
  );
};

export default InspirationRecommender;
