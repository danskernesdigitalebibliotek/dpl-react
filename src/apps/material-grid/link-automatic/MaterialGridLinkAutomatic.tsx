import * as React from "react";
import { useComplexSearchWithPaginationQuery } from "../../../core/dbc-gateway/generated/graphql";
import useGetCleanBranches from "../../../core/utils/branches";
import MaterialGrid from "../MaterialGrid";
import MaterialGridSkeleton from "../MaterialGridSkeleton";
import { ValidSelectedIncrements } from "../materiel-grid-util";
import { getQueryParams } from "../../../core/utils/helpers/url";
import { commaSeparatedStringToArray } from "../../advanced-search/helpers";
import { WorkId } from "../../../core/utils/types/ids";

export type MaterialGridLinkAutomaticProps = {
  link: URL;
  title?: string;
  description?: string;
  selectedAmountOfMaterialsForDisplay: ValidSelectedIncrements;
  buttonText: string;
};

const MaterialGridLinkAutomatic: React.FC<MaterialGridLinkAutomaticProps> = ({
  link,
  title,
  description,
  selectedAmountOfMaterialsForDisplay
}) => {
  const cleanBranches = useGetCleanBranches();
  const { advancedSearchCql, location, sublocation } = getQueryParams(link);

  const { data, isLoading } = useComplexSearchWithPaginationQuery(
    {
      cql: advancedSearchCql,
      offset: 0,
      limit: selectedAmountOfMaterialsForDisplay,
      filters: {
        branchId: cleanBranches,
        ...(location
          ? { location: commaSeparatedStringToArray(location) }
          : {}),
        ...(sublocation
          ? { sublocation: commaSeparatedStringToArray(sublocation) }
          : {})
      }
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
        selectedAmountOfMaterialsForDisplay={
          selectedAmountOfMaterialsForDisplay
        }
      />
    </>
  );
};
export default MaterialGridLinkAutomatic;
