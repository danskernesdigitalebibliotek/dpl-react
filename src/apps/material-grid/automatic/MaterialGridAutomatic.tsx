import * as React from "react";
import { useComplexSearchWithPaginationQuery } from "../../../core/dbc-gateway/generated/graphql";
import useGetCleanBranches from "../../../core/utils/branches";
import { Work } from "../../../core/utils/types/entities";
import MaterialGrid from "../MaterialGrid";
import MaterialGridAutomaticSkeleton from "../MaterialGridSkeleton";
import { ValidSelectedIncrements } from "../materiel-grid-util";

export type MaterialGridAutomaticProps = {
  cql: string;
  title: string;
  selectedAmountOfMaterialsForDisplay: ValidSelectedIncrements;
  buttonText: string;
};

const MaterialGridAutomatic: React.FC<MaterialGridAutomaticProps> = ({
  cql,
  title,
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
    return <MaterialGridAutomaticSkeleton />;
  }

  const resultWorks: Work[] = data.complexSearch.works as Work[];
  const materialIDs = resultWorks.map((work) => work.workId);

  return (
    <MaterialGrid
      title={title}
      materialIDs={materialIDs}
      selectedAmountOfMaterialsForDisplay={selectedAmountOfMaterialsForDisplay}
    />
  );
};
export default MaterialGridAutomatic;
