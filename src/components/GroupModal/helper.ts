import { UseTextFunction } from "../../core/utils/text";

export const getLoansGroupModalButtonLabel = ({
  status,
  materialsCount,
  t
}: {
  status: "idle" | "pending" | "success" | "error";
  materialsCount: number;
  t: UseTextFunction;
}) => {
  if (status === "pending") {
    return t("renewProcessingText");
  }
  return t("groupModalButtonText", {
    count: materialsCount,
    placeholders: { "@count": materialsCount }
  });
};

export default {};
