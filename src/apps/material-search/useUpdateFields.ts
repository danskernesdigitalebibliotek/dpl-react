import { useCallback, useRef, useEffect } from "react";
import { WorkId } from "../../core/utils/types/ids";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";

interface UseUpdateFieldsReturn {
  handleUpdateWorkId: (wid: WorkId) => void;
  handleUpdateMaterialType: (newValue: ManifestationMaterialType) => void;
}

interface UseUpdateFieldsProps {
  updateSelectedWorkId: (wid: WorkId) => void;
  updateSelectedMaterialType: (
    newValue: ManifestationMaterialType | null
  ) => void;
  uniqueIdentifier: string;
}

const useUpdateFields = ({
  updateSelectedWorkId,
  updateSelectedMaterialType,
  uniqueIdentifier
}: UseUpdateFieldsProps): UseUpdateFieldsReturn => {
  const workIdRef = useRef<HTMLInputElement | null>(null);
  const materialTypeRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    workIdRef.current = document.querySelector(
      `[data-field-input-work-id="${uniqueIdentifier}"]`
    ) as HTMLInputElement;
    materialTypeRef.current = document.querySelector(
      `[data-field-input-material-type-id="${uniqueIdentifier}"]`
    ) as HTMLInputElement;
  }, [uniqueIdentifier]);

  const updateInputValue = useCallback(
    (inputElement: HTMLInputElement | null, newValue: string): boolean => {
      if (inputElement) {
        const element = inputElement;
        element.value = newValue;
        return true;
      }

      // Leaving a debug message hif the input element is not found.
      console.debug(
        `Could not find input element to update with ID: ${uniqueIdentifier}`
      );
      return false;
    },
    [uniqueIdentifier]
  );

  const handleUpdateWorkId = useCallback(
    (wid: WorkId) => {
      const workIdUpdateSuccess = updateInputValue(workIdRef.current, `${wid}`);
      const materialTypeUpdateSuccess = updateInputValue(
        materialTypeRef.current,
        ""
      );

      if (workIdUpdateSuccess && materialTypeUpdateSuccess) {
        updateSelectedWorkId(wid);
        updateSelectedMaterialType(null);
      }
    },
    [updateInputValue, updateSelectedWorkId, updateSelectedMaterialType]
  );

  const handleUpdateMaterialType = useCallback(
    (newValue: ManifestationMaterialType) => {
      if (updateInputValue(materialTypeRef.current, newValue)) {
        updateSelectedMaterialType(newValue);
      }
    },
    [updateInputValue, updateSelectedMaterialType]
  );

  return {
    handleUpdateWorkId,
    handleUpdateMaterialType
  };
};

export default useUpdateFields;
