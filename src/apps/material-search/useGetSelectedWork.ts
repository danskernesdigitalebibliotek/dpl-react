import { useState } from "react";
import { useGetMaterialQuery } from "../../core/dbc-gateway/generated/graphql";
import { getMaterialTypes } from "../../core/utils/helpers/general";
import { Work } from "../../core/utils/types/entities";
import { WorkId } from "../../core/utils/types/ids";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";

export type WorkErrorType = "work-not-found" | "material-type-not-found" | null;

interface UseGetSelectedMaterialReturn {
  work: Work | null;
  selectedWorkId: WorkId | string;
  selectedMaterialType: ManifestationMaterialType | null;
  availableMaterialTypes: ManifestationMaterialType[] | null;
  isSelectedWorkLoading: boolean;
  workError: WorkErrorType;
  workErrorHasBeenChecked: boolean;
  setSelectedWorkId: (wid: WorkId | string) => void;
  setSelectedMaterialType: (
    materialType: ManifestationMaterialType | null
  ) => void;
}

interface UseGetSelectedMaterialProps {
  previouslySelectedWorkId: WorkId | null;
  previouslySelectedMaterialType: ManifestationMaterialType | null;
}

const useGetSelectedWork = ({
  previouslySelectedWorkId,
  previouslySelectedMaterialType
}: UseGetSelectedMaterialProps): UseGetSelectedMaterialReturn => {
  const [selectedWorkId, setSelectedWorkId] = useState<string>(
    previouslySelectedWorkId ?? ""
  );
  const [selectedMaterialType, setSelectedMaterialType] =
    useState<ManifestationMaterialType | null>(previouslySelectedMaterialType);

  const [workError, setWorkError] = useState<WorkErrorType>(null);
  const [workErrorHasBeenChecked, setErrorHasBeenChecked] = useState(false);

  const { data, isLoading: isSelectedWorkLoading } = useGetMaterialQuery(
    { wid: selectedWorkId },
    {
      enabled: !!selectedWorkId,
      onSuccess: (responseData) => {
        if (!previouslySelectedWorkId) return;

        if (workErrorHasBeenChecked) {
          setWorkError(null);
          return;
        }

        if (!responseData.work) {
          setErrorHasBeenChecked(true);
          setWorkError("work-not-found");
          return;
        }

        if (previouslySelectedMaterialType && responseData.work) {
          const work = responseData.work as Work;

          const availableMaterialTypes = work
            ? getMaterialTypes(work.manifestations.all, false)
            : null;

          if (
            availableMaterialTypes &&
            !availableMaterialTypes.includes(previouslySelectedMaterialType)
          ) {
            setErrorHasBeenChecked(true);
            setWorkError("material-type-not-found");
            return;
          }
        }

        setErrorHasBeenChecked(true);
        setWorkError(null);
      }
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
    workErrorHasBeenChecked,
    setSelectedMaterialType,
    isSelectedWorkLoading,
    setSelectedWorkId,
    selectedMaterialType,
    workError
  };
};

export default useGetSelectedWork;
