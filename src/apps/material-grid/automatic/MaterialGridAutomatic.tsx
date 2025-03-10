import * as React from "react";
import { useComplexSearchWithPaginationQuery } from "../../../core/dbc-gateway/generated/graphql";
import useGetCleanBranches from "../../../core/utils/branches";
import MaterialGrid from "../MaterialGrid";
import MaterialGridSkeleton from "../MaterialGridSkeleton";
import { ValidSelectedIncrements } from "../materiel-grid-util";
import { WorkId } from "../../../core/utils/types/ids";

export type MaterialGridAutomaticProps = {
  cql: string;
  title?: string;
  description?: string;
  selectedAmountOfMaterialsForDisplay: ValidSelectedIncrements;
  buttonText: string;
};

const MaterialGridAutomatic: React.FC<MaterialGridAutomaticProps> = ({
  cql,
  title,
  description,
  selectedAmountOfMaterialsForDisplay
}) => {
  const cleanBranches = useGetCleanBranches();
  const { data, isLoading } = useComplexSearchWithPaginationQuery({
    cql,
    offset: 0,
    limit: selectedAmountOfMaterialsForDisplay,
    filters: {
      branchId: cleanBranches
    }
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
      selectedAmountOfMaterialsForDisplay={selectedAmountOfMaterialsForDisplay}
    />
  );
};
export default MaterialGridAutomatic;
