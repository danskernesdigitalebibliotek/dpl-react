import dayjs from "dayjs";
import { FeeV2 } from "../../../core/fbs/model";
import configuration, { getConf } from "../../../core/configuration";

const paymentConf = getConf("payment", configuration);
const {
  paymentChangeDate
}: // paymentChangeDate should never be undefined, but the config system requires
// us to handle that case
{ paymentChangeDate?: `${number}-${number}-${number}` } = paymentConf;

export const getFeesInRelationToPaymentChangeDate = (
  feeObj: FeeV2[],
  beforePaymentChangeDate: boolean
) => {
  const paymentMethodChangeDate = dayjs(paymentChangeDate); // The Date fee-payment-method changed
  return feeObj.filter((fee) => {
    const { dueDate } = fee;
    if (dueDate) {
      const feeDate = dayjs(dueDate);
      if (beforePaymentChangeDate) {
        if (feeDate < paymentMethodChangeDate) {
          return fee;
        }
      } else if (feeDate > paymentMethodChangeDate) {
        return fee;
      }
    }
    return false;
  });
};

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