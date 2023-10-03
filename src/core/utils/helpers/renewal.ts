import { RenewedLoanV2 } from "../../fbs/model";
import { UseTextFunction } from "../text";
import { RenewStatus } from "../types/renew-status";
import { RequestStatus } from "../types/request";

export const filterRenewResponseData = (data: RenewedLoanV2[]) => {
  return data.filter((loan) => loan.renewalStatus[0] === RenewStatus.renewed);
};

export const succeededRenewalCount = (
  renewingResponse: RenewedLoanV2[] | null
) => filterRenewResponseData(renewingResponse || []).length;

export const getRenewButtonLabel = ({
  isRenewable,
  renewingStatus,
  t,
  defaultText
}: {
  isRenewable: boolean;
  renewingStatus: RequestStatus;
  t: UseTextFunction;
  defaultText?: string;
}) => {
  if (!isRenewable) {
    return t("renewCannotBeRenewedText");
  }
  if (renewingStatus === "pending") {
    return t("renewProcessingText");
  }

  return defaultText ?? t("renewButtonText");
};
