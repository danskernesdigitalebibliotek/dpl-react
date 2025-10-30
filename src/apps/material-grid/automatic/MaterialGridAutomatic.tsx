import * as React from "react";
import MaterialGrid from "../../../components/material-grid/MaterialGrid";
import MaterialGridSkeleton from "../../../components/material-grid/MaterialGridSkeleton";
import {
  HoldingsStatusEnum,
  useComplexSearchWithPaginationQuery
} from "../../../core/dbc-gateway/generated/graphql";
import useGetCleanBranches from "../../../core/utils/branches";
import { useText } from "../../../core/utils/text";
import { WorkId } from "../../../core/utils/types/ids";
import { commaSeparatedStringToArray } from "../../advanced-search/helpers";
import {
  advancedSortMap,
  AdvancedSortMapStrings
} from "../../advanced-search/types";
export type MaterialGridAutomaticProps = {
  cql: string;
  title?: string;
  description?: string;
  requestedAmount: number;
  location?: string;
  sublocation?: string;
  branch?: string;
  department?: string;
  onshelf?: boolean;
  sort?: string;
  firstaccessiondateitem?: string;
};

const MaterialGridAutomatic: React.FC<MaterialGridAutomaticProps> = ({
  cql,
  location,
  sublocation,
  branch,
  department,
  onshelf,
  sort,
  title,
  description,
  requestedAmount,
  firstaccessiondateitem
}) => {
  const t = useText();
  const buttonText = t("buttonText");
  const cleanBranches = useGetCleanBranches();

  const { data, isLoading } = useComplexSearchWithPaginationQuery({
    cql,
    offset: 0,
    limit: requestedAmount,
    filters: {
      branchId: cleanBranches,
      ...(location ? { location: commaSeparatedStringToArray(location) } : {}),
      ...(sublocation
        ? { sublocation: commaSeparatedStringToArray(sublocation) }
        : {}),
      ...(branch ? { branch: commaSeparatedStringToArray(branch) } : {}),
      ...(department
        ? { department: commaSeparatedStringToArray(department) }
        : {}),
      ...(onshelf ? { status: [HoldingsStatusEnum.Onshelf] } : {}),
      ...(firstaccessiondateitem
        ? { firstAccessionDate: decodeURIComponent(firstaccessiondateitem) }
        : {})
    },
    ...(sort ? { sort: advancedSortMap[sort as AdvancedSortMapStrings] } : {})
  });

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
    <MaterialGrid
      title={title}
      materials={materials}
      description={description}
      buttonText={buttonText}
    />
  );
};
export default MaterialGridAutomatic;
