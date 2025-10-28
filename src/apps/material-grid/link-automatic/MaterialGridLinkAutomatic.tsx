import * as React from "react";
import MaterialGrid from "../../../components/material-grid/MaterialGrid";
import MaterialGridSkeleton from "../../../components/material-grid/MaterialGridSkeleton";
import {
  HoldingsStatusEnum,
  useComplexSearchWithPaginationQuery
} from "../../../core/dbc-gateway/generated/graphql";
import useGetCleanBranches from "../../../core/utils/branches";
import { getQueryParams } from "../../../core/utils/helpers/url";
import { useText } from "../../../core/utils/text";
import { WorkId } from "../../../core/utils/types/ids";
import { commaSeparatedStringToArray } from "../../advanced-search/helpers";
import {
  advancedSortMap,
  AdvancedSortMapStrings
} from "../../advanced-search/types";

export type MaterialGridLinkAutomaticProps = {
  link: URL;
  title?: string;
  description?: string;
  requestedAmount: number;
};

const MaterialGridLinkAutomatic: React.FC<MaterialGridLinkAutomaticProps> = ({
  link,
  title,
  description,
  requestedAmount
}) => {
  const t = useText();
  const buttonText = t("buttonText");
  const cleanBranches = useGetCleanBranches();
  const { advancedSearchCql, location, sublocation, onshelf, sort } =
    getQueryParams(link);

  const { data, isLoading } = useComplexSearchWithPaginationQuery(
    {
      cql: advancedSearchCql,
      offset: 0,
      limit: requestedAmount,
      filters: {
        branchId: cleanBranches,
        ...(location
          ? { location: commaSeparatedStringToArray(location) }
          : {}),
        ...(sublocation
          ? { sublocation: commaSeparatedStringToArray(sublocation) }
          : {}),
        ...(onshelf === "true" ? { status: [HoldingsStatusEnum.Onshelf] } : {})
      },
      ...(sort ? { sort: advancedSortMap[sort as AdvancedSortMapStrings] } : {})
    },
    {
      enabled: !!advancedSearchCql
    }
  );

  if (isLoading || !data) {
    return <MaterialGridSkeleton title={title} />;
  }

  const resultWorks = data.complexSearch.works;
  const materials = resultWorks.map((work) => {
    return {
      wid: work.workId as WorkId
    };
  });

  return (
    <>
      <MaterialGrid
        title={title}
        materials={materials}
        description={description}
        buttonText={buttonText}
      />
    </>
  );
};
export default MaterialGridLinkAutomatic;
