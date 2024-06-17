import { useState } from "react";
import { useGetMaterialQuery } from "../../core/dbc-gateway/generated/graphql";
import { getMaterialTypes } from "../../core/utils/helpers/general";
import { Work } from "../../core/utils/types/entities";
import { WorkId } from "../../core/utils/types/ids";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";

interface UseGetSelectedMaterialReturn {
  work: Work | null;
  selectedWorkId: WorkId | string;
  selectedMaterialType: ManifestationMaterialType | null;
  availableMaterialTypes: ManifestationMaterialType[] | null;
  isSelectedWorkLoading: boolean;
  setSelectedWorkId: (wid: WorkId | string) => void;
  setSelectedMaterialType: (
    materialType: ManifestationMaterialType | null
  ) => void;
}

const useGetSelectedWork = (): UseGetSelectedMaterialReturn => {
  const [selectedWorkId, setSelectedWorkId] = useState<WorkId | string>("");
  const [selectedMaterialType, setSelectedMaterialType] =
    useState<ManifestationMaterialType | null>(null);

  const { data, isLoading: isSelectedWorkLoading } = useGetMaterialQuery(
    { wid: selectedWorkId },
    {
      enabled: !!selectedWorkId
    }
  );

  const work = (data?.work as Work) ?? null;

  const availableMaterialTypes = work
    ? getMaterialTypes(work.manifestations.all, false)
    : null;

  return {
    work,
    availableMaterialTypes,
    selectedWorkId,
    setSelectedMaterialType,
    isSelectedWorkLoading,
    setSelectedWorkId,
    selectedMaterialType
  };
};

export default useGetSelectedWork;
