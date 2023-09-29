import { RenewedLoanV2 } from "../../core/fbs/model";
import { UseTextFunction } from "../../core/utils/text";
import { RenewStatus } from "../../core/utils/types/renew-status";

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
    return t("groupModalButtonProcessingText");
  }
  return t("groupModalButtonText", {
    count: materialsCount,
    placeholders: { "@count": materialsCount }
  });
};

export const filterRenewResponseData = (data: RenewedLoanV2[]) => {
  return data.filter((loan) => loan.renewalStatus[0] === RenewStatus.renewed);
};

export default {};
