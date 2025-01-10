import { useState, useEffect } from "react";
import ErrorState from "./Errors/errorState";

interface HiddenInputsResult {
  workIdElement: HTMLInputElement | null;
  materialTypeElement: HTMLInputElement | null;
  errorState: ErrorState;
}

const useGetHiddenInputs = (uniqueIdentifier: string): HiddenInputsResult => {
  const [workIdElement, setWorkIdElement] = useState<HTMLInputElement | null>(
    null
  );
  const [materialTypeElement, setMaterialTypeElement] =
    useState<HTMLInputElement | null>(null);
  const [errorState, setErrorState] = useState<ErrorState>(ErrorState.NoError);

  useEffect(() => {
    const workElement = document.querySelector(
      `[data-field-input-work-id="${uniqueIdentifier}"]`
    ) as HTMLInputElement | null;
    const materialElement = document.querySelector(
      `[data-field-input-material-type-id="${uniqueIdentifier}"]`
    ) as HTMLInputElement | null;

    if (!workElement) {
      // eslint-disable-next-line no-console
      console.debug(
        `Could not find input for work ID with unique identifier: ${uniqueIdentifier}`
      );
      setErrorState(ErrorState.hiddenInputsNotFoundError);
    } else {
      setWorkIdElement(workElement);
    }

    if (!materialElement) {
      // eslint-disable-next-line no-console
      console.debug(
        `Could not find input for material type with unique identifier: ${uniqueIdentifier}`
      );
      setErrorState(ErrorState.hiddenInputsNotFoundError);
    } else {
      setMaterialTypeElement(materialElement);
    }

    if (workElement && materialElement) {
      setErrorState(ErrorState.NoError);
    }
  }, [uniqueIdentifier]);

  return { workIdElement, materialTypeElement, errorState };
};

export default useGetHiddenInputs;
