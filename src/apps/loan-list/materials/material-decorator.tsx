import React, { useEffect, useState } from "react";
import {
  GetMaterialManifestationQuery,
  useGetMaterialManifestationQuery
} from "../../../core/dbc-gateway/generated/graphql";
import SelectableMaterial from "./selectable-material";
import StackableMaterial from "./stackable-material";
import { useText } from "../../../core/utils/text";

interface MaterialDecoratorProps {
  materialType: string;
  faust: string;
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

  // Create a string of authors with commas and a conjunction
  const getAuthorName = (
    creators: {
      display: string;
    }[]
  ) => {
    const names = creators.map(({ display }) => display);
    let returnContentString = "";
    if (names.length === 1) {
      returnContentString = `${t("loanListMaterialByAuthorText")} ${names.join(
        ", "
      )}`;
    } else {
      returnContentString = `${t("loanListMaterialByAuthorText")} ${names
        .slice(0, -1)
        .join(", ")} ${t("loanListMaterialAndAuthorText")} ${names.slice(-1)}`;
    }
    return returnContentString;
  };

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
          authorString={getAuthorName(material.manifestation?.creators)}
        />
      )}
      {materialType === "stackableMaterial" && material?.manifestation && (
        <StackableMaterial
          dueDate={dueDate}
          loanDate={loanDate}
          amountOfMaterialsWithDueDate={amountOfMaterialsWithDueDate}
          selectDueDate={selectDueDate}
          material={material}
          authorString={getAuthorName(material.manifestation?.creators)}
        />
      )}
    </>
  );
};

export default MaterialDecorator;
