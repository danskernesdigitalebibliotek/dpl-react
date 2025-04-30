import * as React from "react";
import MaterialGrid from "../../../components/material-grid/MaterialGrid";
import MaterialGridSkeleton from "../../../components/material-grid/MaterialGridSkeleton";
import { ValidSelectedIncrements } from "../../../components/material-grid/materiel-grid-util";
import { useComplexSearchWithPaginationQuery } from "../../../core/dbc-gateway/generated/graphql";
import useGetCleanBranches from "../../../core/utils/branches";
import { useText } from "../../../core/utils/text";
import { WorkId } from "../../../core/utils/types/ids";
export type MaterialGridAutomaticProps = {
  cql: string;
  title?: string;
  description?: string;
  selectedAmountOfMaterialsForDisplay: ValidSelectedIncrements;
};

const MaterialGridAutomatic: React.FC<MaterialGridAutomaticProps> = ({
  cql,
  title,
  description,
  selectedAmountOfMaterialsForDisplay
}) => {
  const t = useText();
  const buttonText = t("buttonText");
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
      buttonText={buttonText}
    />
  );
};
export default MaterialGridAutomatic;
