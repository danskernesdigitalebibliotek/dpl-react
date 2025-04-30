import * as React from "react";

import {
  useComplexSearchWithPaginationQuery,
  useWorkRecommendationsQuery
} from "../../core/dbc-gateway/generated/graphql";
import { useText } from "../../core/utils/text";
import { Work } from "../../core/utils/types/entities";
import MaterialGrid, {
  MaterialGridItemProps
} from "../material-grid/MaterialGrid";
import MaterialGridSkeleton from "../material-grid/MaterialGridSkeleton";

import { first } from "lodash";
import { flattenCreators, getWorkPid } from "../../core/utils/helpers/general";
import {
  extractAuthorMaterials,
  extractRecommendationMaterials,
  extractSeriesMaterials,
  getPreferredFallback,
  prepareCreatorCql
} from "./helper";
import { MaterialGridRelatedInlineFilters } from "./MaterialGridRelatedInlineFilters";
import { MaterialGridRelatedSelect } from "./MaterialGridRelatedSelect";
import { MaterialGridFilterType } from "./MaterialGridRelated.types";

type MaterialGridRelatedOption = {
  label: string;
  value: MaterialGridFilterType;
  materials: MaterialGridItemProps[];
};

export type MaterialGridRelatedProps = {
  work: Work;
};

const MaterialGridRelated: React.FC<MaterialGridRelatedProps> = ({ work }) => {
  const t = useText();
  const title = t("materialGridRelatedTitleText");

  const pid = getWorkPid(work);

  const { creators } = work.manifestations.bestRepresentation;
  const { series } = work;
  const seriesObject = first(series);
  const flattenedCreators = flattenCreators(creators);
  const creatorCqlString = prepareCreatorCql(flattenedCreators);

  const { data: recommendationData, isLoading: recommendationLoading } =
    useWorkRecommendationsQuery({
      pid,
      limit: 8
    });

  const { data: creatorData, isLoading: creatorLoading } =
    useComplexSearchWithPaginationQuery({
      cql: creatorCqlString,
      limit: 8,
      offset: 0,
      filters: {}
    });

  const { data: seriesData, isLoading: seriesLoading } =
    useComplexSearchWithPaginationQuery({
      cql: `term.series='${seriesObject?.title}'`,
      limit: 8,
      offset: 0,
      filters: {}
    });

  const [filter, setFilter] =
    React.useState<MaterialGridFilterType>("recommendation");

  const allQueriesLoaded =
    !recommendationLoading && !creatorLoading && !seriesLoading;

  const recommendationMaterials =
    extractRecommendationMaterials(recommendationData);
  const seriesMaterials = extractSeriesMaterials(seriesData);
  const authorMaterials = extractAuthorMaterials(creatorData);

  const options = React.useMemo<MaterialGridRelatedOption[]>(() => {
    if (!allQueriesLoaded) return [];

    const opts: MaterialGridRelatedOption[] = [];

    if (recommendationMaterials.length) {
      opts.push({
        label: t("materialGridRelatedRecommendationsDataLabelText"),
        value: "recommendation",
        materials: recommendationMaterials
      });
    }

    if (seriesMaterials.length) {
      opts.push({
        label: t("materialGridRelatedSeriesDataLabelText"),
        value: "series",
        materials: seriesMaterials
      });
    }

    if (authorMaterials.length) {
      opts.push({
        label: t("materialGridRelatedAuthorDataLabelText"),
        value: "author",
        materials: authorMaterials
      });
    }

    return opts;
  }, [
    allQueriesLoaded,
    recommendationMaterials,
    seriesMaterials,
    authorMaterials,
    t
  ]);

  React.useEffect(() => {
    if (
      allQueriesLoaded &&
      !options.some((o) => o.value === filter) &&
      options.length > 0
    ) {
      const fallback = getPreferredFallback(options);
      if (fallback) setFilter(fallback);
    }
  }, [allQueriesLoaded, options, filter]);

  const displayedMaterials =
    options.find((o) => o.value === filter)?.materials ?? [];

  if (!allQueriesLoaded) {
    return <MaterialGridSkeleton title={title} />;
  }

  return (
    <div data-cy="material-grid-related" className="material-grid-related">
      <div className="material-grid-related__header">
        <h2 className="material-grid-related__title">{title}</h2>
        <MaterialGridRelatedSelect
          filter={filter}
          onChange={setFilter}
          options={options.map(({ label, value }) => ({ label, value }))}
        />
        <MaterialGridRelatedInlineFilters
          filter={filter}
          onChange={setFilter}
          options={options.map(({ label, value, materials }) => ({
            label,
            value,
            count: materials.length
          }))}
        />
      </div>
      <MaterialGrid
        materials={displayedMaterials}
        selectedAmountOfMaterialsForDisplay={8}
        initialMaximumDisplay={8}
      />
    </div>
  );
};

export default MaterialGridRelated;
