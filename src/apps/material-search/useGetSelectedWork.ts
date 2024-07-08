import { useEffect, useState } from "react";
import { useGetMaterialQuery } from "../../core/dbc-gateway/generated/graphql";
import { getMaterialTypes } from "../../core/utils/helpers/general";
import { Work } from "../../core/utils/types/entities";
import { WorkId } from "../../core/utils/types/ids";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
import ErrorState from "./Errors/errorState";

interface UseGetSelectedMaterialReturn {
  work: Work | null;
  selectedWorkId: WorkId | string;
  selectedMaterialType: ManifestationMaterialType | null;
  availableMaterialTypes: ManifestationMaterialType[] | null;
  isSelectedWorkLoading: boolean;
  errorState: ErrorState;
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

  const [errorState, setErrorState] = useState<ErrorState>(ErrorState.NoError);

  const {
    data,
    isLoading: isSelectedWorkLoading,
    refetch
  } = useGetMaterialQuery(
    { wid: selectedWorkId },
    {
      enabled: !!selectedWorkId && selectedWorkId.length > 0,
      onSuccess: (responseData) => {
        if (!responseData.work) {
          setErrorState(ErrorState.WorkError);
          return;
        }

        if (selectedMaterialType && responseData.work) {
          const work = responseData.work as Work;

          const availableMaterialTypes = work
            ? getMaterialTypes(work.manifestations.all, false)
            : null;

          if (
            availableMaterialTypes &&
            !availableMaterialTypes.includes(selectedMaterialType)
          ) {
            setErrorState(ErrorState.MaterialTypeError);
            return;
          }
        }
        setErrorState(ErrorState.NoError);
      }
    }
  );

  useEffect(() => {
    if (selectedWorkId) {
      refetch();
    }
  }, [selectedWorkId, selectedMaterialType, refetch]);

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
    selectedMaterialType,
    errorState
  };
};

export default useGetSelectedWork;
