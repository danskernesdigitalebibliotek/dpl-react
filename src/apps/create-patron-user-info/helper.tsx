import { UseTextFunction } from "../../core/utils/text";

export const getSubmitButtonText = (
  t: UseTextFunction,
  isLoading: boolean,
  isSubmitError: boolean
) => {
  if (isLoading) {
    return t("createPatronButtonLoadingText");
  }
  if (isSubmitError) {
    return t("createPatronButtonErrorText");
  }
  return t("createPatronConfirmButtonText");
};

export default {};
