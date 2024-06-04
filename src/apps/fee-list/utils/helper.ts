import { FeeV2 } from "../../../core/fbs/model";

export const getFeeObjectByFeeId = (feeObj: FeeV2[], feeId: number) => {
  return feeObj.filter((item) => {
    return item.feeId === feeId;
  });
};

export const getFeesBasedOnPayableByClient = (
  fees: FeeV2[],
  payableByClient: boolean
) => {
  return fees.filter((fee) => {
    return fee.payableByClient === payableByClient;
  });
};

export const calculateFeeAmount =
  (fees: FeeV2[], payableByClient: boolean) => () => {
    return getFeesBasedOnPayableByClient(fees, payableByClient).reduce(
      (accumulator, { amount }) => accumulator + amount,
      0
    );
  };
