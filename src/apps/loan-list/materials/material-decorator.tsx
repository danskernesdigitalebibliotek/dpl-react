import React, { useEffect, useState } from "react";
import {
  useGetMaterialQuery,
  useGetMaterialManifestationQuery,
  WorkManifestation
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
  selectDueDate?: Function;
  loanDate?: string;
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
  const [material, setMaterial] = useState<WorkManifestation>();
  const [materialId, setMaterialId] = useState<string>("");

  // Create a string of authors with commas and a conjunction
  const getAuthorName = (
    creators: {
      name: string;
    }[]
  ) => {
    const names = creators.map(({ name }) => name);
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

  const { isSuccess, data } = useGetMaterialQuery({
    faust
  });

  const { isSuccess: isSuccessManifestation, data: dataManifestation } =
    useGetMaterialManifestationQuery({
      pid: materialId
    });

  useEffect(() => {
    if (isSuccess && data) {
      if (data?.work?.id) {
        setMaterialId(data.work.id.replace("work-of:", ""));
      }
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (dataManifestation && isSuccessManifestation) {
      let { manifestation } = dataManifestation;
      setMaterial(manifestation);
    }
  }, [isSuccessManifestation, dataManifestation]);

  return (
    <>
      {materialType === "selectableMaterial" && material && (
        <SelectableMaterial
          renewableStatus={renewableStatus}
          faust={faust}
          dueDate={dueDate}
          loanType={loanType}
          material={material}
          getAuthorName={getAuthorName}
        />
      )}
      {materialType === "stackableMaterial" && material && (
        <StackableMaterial
          dueDate={dueDate}
          loanDate={loanDate}
          amountOfMaterialsWithDueDate={amountOfMaterialsWithDueDate}
          selectDueDate={selectDueDate}
          materialId={materialId}
          material={material}
          getAuthorName={getAuthorName}
        />
      )}
    </>
  );
};

export default MaterialDecorator;
