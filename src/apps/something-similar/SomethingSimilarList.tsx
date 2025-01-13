import React, { useEffect, FC, useState, useCallback } from "react";
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
import SimpleMaterial from "../../components/simple-material/SimpleMaterial";
import { RecommenderView } from "../../core/utils/types/recommender-view";
import { setQueryParametersInUrl } from "../../core/utils/helpers/url";

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

  const [recommendView, setRecommendView] =
    useState<RecommenderView>("similar");
  const { data: somethingSimilarData } = useRecommendFromFaustQuery({
    faust: id,
    limit: somethingSimilarLimit as number
  });

  const setViewHandler = useCallback(
    (inputView: RecommenderView) => {
      setQueryParametersInUrl({
        "recommender-view": inputView
      });
      setRecommendView(inputView);
    },
    [setRecommendView]
  );

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
      <h2 className="recommender__left-title text-header-h1">
        {t("somethingSimilarTitleText")}
      </h2>
      <div className="recommender__buttons">
        <button
          type="button"
          onClick={() => setRecommendView("similar")}
          className={`text-body-medium-regular color-primary-black cursor-pointer button-link--bright ${
            recommendView ? "button-link" : ""
          }`}
        >
          {t("somethingSimilarSomethingSimilarAuthorText")}
        </button>
        <button
          onClick={() => setViewHandler("author")}
          type="button"
          className={`text-body-medium-regular color-primary-black cursor-pointer button-link--bright ${
            !recommendView ? "button-link" : ""
          }`}
        >
          {t("somethingSimilarByTheSameAuthorText")}
        </button>
      </div>
      <ul className="recommender__grid">
        {recommendView &&
          somethingSimilar &&
          somethingSimilar.map((work) => (
            <SimpleMaterial
              key={work.workId}
              app="something-similar"
              bright
              work={work}
            />
          ))}
        {!recommendView &&
          authorMaterials &&
          authorMaterials.map((work) => (
            <SimpleMaterial
              key={work.workId}
              app="something-similar"
              bright
              work={work}
            />
          ))}
      </ul>
    </>
  );
};

export default fetchMaterial(SomethingSimilarList);
