import { FeeV2 } from "../../../core/fbs/model";

export const getFeeObjectByFaustId = (feeObj: FeeV2[], faustId: string) => {
  return feeObj.filter((item) => {
    return item.materials[0].recordId === faustId;
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
