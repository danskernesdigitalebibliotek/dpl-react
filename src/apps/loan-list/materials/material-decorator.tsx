import React, { useEffect, useState } from "react";
import {
  GetMaterialManifestationQuery,
  useGetMaterialManifestationQuery
} from "../../../core/dbc-gateway/generated/graphql";
import SelectableMaterial from "./selectable-material";
import StackableMaterial from "./stackable-material";
import { useText } from "../../../core/utils/text";
import { FaustId } from "../../../core/utils/types/ids";

interface MaterialDecoratorProps {
  materialType: string;
  faust: FaustId;
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
  faust,
  dueDate,
  loanType,
  renewableStatus,
  amountOfMaterialsWithDueDate,
  selectDueDate,
  loanDate
}) => {
  const t = useText();
  const [material, setMaterial] = useState<GetMaterialManifestationQuery>();

  const { isSuccess: isSuccessManifestation, data: dataManifestation } =
    useGetMaterialManifestationQuery({
      faust
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
          faust={faust}
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
