import React, { useEffect, useState } from "react";
import {
  GetMaterialManifestationQuery,
  useGetMaterialManifestationQuery
} from "../../../core/dbc-gateway/generated/graphql";
import SelectableMaterial from "./selectable-material";
import StackableMaterial from "./stackable-material";

interface MaterialDecoratorProps {
  materialType: string;
  recordId: string;
  dueDate: string;
  loanType?: string;
  renewableStatus?: string[];
  amountOfMaterialsWithDueDate?: number;
  selectDueDate?: () => void;
  loanDate?: string;
}

export interface WorkManifestationType {
  __typename?: "WorkManifestation" | undefined;
  title?: string | null | undefined;
  description: string;
  fullTitle: string;
  datePublished: unknown;
  materialType: string;
  creators: { __typename?: "Creator" | undefined; name: string }[];
}

const MaterialDecorator: React.FC<MaterialDecoratorProps> = ({
  materialType,
  recordId,
  dueDate,
  loanType,
  renewableStatus,
  amountOfMaterialsWithDueDate,
  selectDueDate,
  loanDate
}) => {
  const [material, setMaterial] = useState<GetMaterialManifestationQuery>();

  const { isSuccess: isSuccessManifestation, data: dataManifestation } =
    useGetMaterialManifestationQuery({
      faust: recordId
    });
  useEffect(() => {
    if (dataManifestation && isSuccessManifestation) {
      setMaterial(dataManifestation);
    }
  }, [isSuccessManifestation, dataManifestation]);

  return (
    <>
      {materialType === "selectableMaterial" && material?.manifestation && (
        <SelectableMaterial
          renewableStatus={renewableStatus}
          recordId={recordId}
          dueDate={dueDate}
          loanType={loanType}
          material={material}
        />
      )}
      {materialType === "stackableMaterial" && material?.manifestation && (
        <StackableMaterial
          dueDate={dueDate}
          loanDate={loanDate}
          amountOfMaterialsWithDueDate={amountOfMaterialsWithDueDate}
          selectDueDate={selectDueDate}
          material={material}
        />
      )}
    </>
  );
};

export default MaterialDecorator;
