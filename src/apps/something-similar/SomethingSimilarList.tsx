import React, { useEffect, FC, useState } from "react";
import {
  useRecommendFromFaustQuery,
  useSearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";
import { getRecommenderMaterialLimits } from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";
import { Work } from "../../core/utils/types/entities";
import fetchMaterial, {
  MaterialProps
} from "../loan-list/materials/utils/material-fetch-hoc";
import RecommendMaterial from "../recommender/RecommendMaterial";

export interface SomethingSimilarListProps {
  id: string;
}

const SomethingSimilarList: FC<SomethingSimilarListProps & MaterialProps> = ({
  id,
  material
}) => {
  const t = useText();
  const {
    somethingSimilarAuthor: somethingSimilarAuthorLimit,
    somethingSimilar: somethingSimilarLimit
  } = getRecommenderMaterialLimits();
  const [somethingSimilar, setSomethingSimilar] = useState<Work[] | null>(null);

  const [authorMaterials, setAuthorMaterials] = useState<Work[] | null>(null);

  const [recommendView, setRecommendView] = useState<boolean>(true);
  const { data: somethingSimilarData } = useRecommendFromFaustQuery({
    faust: id,
    limit: somethingSimilarLimit as number
  });

  const { data: byAuthorData } = useSearchWithPaginationQuery({
    limit: somethingSimilarAuthorLimit as number,
    q: {
      all: material?.firstAuthor
    },
    offset: 0
  });

  useEffect(() => {
    if (somethingSimilarData) {
      setSomethingSimilar(
        somethingSimilarData.recommend.result.map(({ work }) => work) as Work[]
      );
    }
  }, [somethingSimilarData]);

  useEffect(() => {
    if (byAuthorData) {
      setAuthorMaterials(byAuthorData.search.works as Work[]);
    }
  }, [byAuthorData]);

  return (
    <>
      <h2 className="recommender__title text-header-h1 recommender__title--left">
        {t("somethingSimilarTitleText")}
      </h2>
      <div className="recommender__buttons">
        <button
          type="button"
          onClick={() => setRecommendView(true)}
          className={`button-link button-link--bright ${
            recommendView ? "button-link--selected" : ""
          }`}
        >
          {t("somethingSimilarSomethingSimilarAuthorText")}
        </button>
        <button
          onClick={() => setRecommendView(false)}
          type="button"
          className={`button-link button-link--bright ${
            !recommendView ? "button-link--selected" : ""
          }`}
        >
          {t("somethingSimilarByTheSameAuthorText")}
        </button>
      </div>
      <ul className="recommender__grid">
        {recommendView &&
          somethingSimilar &&
          somethingSimilar.map((work) => (
            <RecommendMaterial bright work={work} />
          ))}
        {!recommendView &&
          authorMaterials &&
          authorMaterials.map((work) => (
            <RecommendMaterial bright work={work} />
          ))}
      </ul>
    </>
  );
};

export default fetchMaterial(SomethingSimilarList);
