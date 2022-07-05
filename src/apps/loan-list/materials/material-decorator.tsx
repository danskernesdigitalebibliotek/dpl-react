import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  useGetMaterialQuery,
  useGetMaterialManifestationQuery
} from "../../../core/dbc-gateway/generated/graphql";
import SelectableMaterial from "./selectable-material";
import StackableMaterial from "./stackable-material";

interface MaterialDecoratorProps {
  materialType: string;
  faust: string;
  dueDate: string;
  loanType: string;
  renewableStatus?: string;
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
  const [material, setMaterial] = useState<{
    description: string;
    fullTitle: string;
    datePublished: string;
    materialType: string;
    creators: {
      __typename?: "Creator" | undefined;
      name: string;
    }[];
  }>();
  const [materialId, setMaterialId] = useState<string>("");

  // Create a string of authors with commas and a conjunction
  function getAuthorName(
    creators: {
      name: string;
    }[]
  ) {
    const names = creators.map(({ name }) => name);

    let returnContentString = "";
    if (names.length === 1) {
      returnContentString = `Af ${names.join(", ")}`;
    } else {
      returnContentString = `Af ${names
        .slice(0, -1)
        .join(", ")} og ${names.slice(-1)}`;
    }
    return returnContentString;
  }

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
      setMaterial(dataManifestation.manifestation);
    }
  }, [isSuccessManifestation, dataManifestation]);

  return (
    <>
      {materialType === "selectableMaterial" && (
        <SelectableMaterial
          renewableStatus={renewableStatus}
          faust={faust}
          dueDate={dueDate}
          loanType={loanType}
          material={material}
          getAuthorName={getAuthorName}
        />
      )}
      {materialType === "stackableMaterial" && (
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
