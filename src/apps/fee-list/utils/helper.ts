import dayjs from "dayjs";
import { FeeV2 } from "../../../core/fbs/model";

export const getFeeObjectByFaustId = (feeObj: FeeV2[], faustId: string) => {
  return feeObj.filter((item) => {
    return item.materials[0].recordId === faustId;
  });
};

export const isDateBeforePaymentChangeDate = (date: string) => {
  const thisDate = dayjs(date);
  const paymentMethodChangeDate = dayjs("2020-10-27"); // The Date fee-payment-method changed
  if (thisDate < paymentMethodChangeDate) {
    return true;
  }
  return false;
};
