import { RenewedLoanV2 } from "../../fbs/model";
import { RenewStatus } from "../types/renew-status";

export const filterRenewResponseData = (data: RenewedLoanV2[]) => {
  return data.filter((loan) => loan.renewalStatus[0] === RenewStatus.renewed);
};

export const succeededRenewalCount = (
  renewingResponse: RenewedLoanV2[] | null
) => filterRenewResponseData(renewingResponse || []).length;
