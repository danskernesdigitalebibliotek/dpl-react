import { FeeV2 } from "../../../core/fbs/model";

export const getFeesPrePaymentChangeDate = (feeObj: FeeV2[]) => {
  const paymentMethodChangeDate = new Date("2020-10-27"); // The Date fee-payment-method changed
  return feeObj.filter((fee) => {
    if (fee.dueDate) {
      const feeDate = new Date(fee.dueDate);
      if (feeDate < paymentMethodChangeDate) {
        return fee;
      }
    }
    return false;
  });
};

export const getFeesPostPaymentChangeDate = (feeObj: FeeV2[]) => {
  const paymentMethodChangeDate = new Date("2020-10-27"); // The Date fee-payment-method changed
  return feeObj.filter((fee) => {
    if (fee.dueDate) {
      const feeDate = new Date(fee.dueDate);
      if (feeDate > paymentMethodChangeDate) {
        return fee;
      }
    }
    return false;
  });
};

export const getFeeObjectByFaustId = (feeObj: FeeV2[], faustId: string) => {
  return feeObj.filter((item: { materials: { recordId: string }[] }) => {
    return item.materials[0].recordId === faustId;
  });
};

export const isDateBeforePaymentChangeDate = (date: Date) => {
  const paymentMethodChangeDate = new Date("2020-10-27"); // The Date fee-payment-method changed
  if (date < paymentMethodChangeDate) {
    return true;
  }
  return false;
};
