import { getModalIds } from "./general";

export const containsDueDateModalQueryParam = (queryParam: string) => {
  const { dueDateModal } = getModalIds();
  // regex for finding duedatemodal concatenated with date string from modal query param
  const regex = new RegExp(`${dueDateModal}\\d{4}-\\d{2}-\\d{2}`, "g");

  const dateFound = queryParam.match(regex);
  if (!dateFound) {
    return null;
  }
  return dateFound[0];
};

export const dateFromDueDateModalQueryParam = (queryParam: string) => {
  // regex for finding duedatemodal concatenated with date string from modal query param
  const regex = /\d{4}-\d{2}-\d{2}/g;

  const dateFound = queryParam.match(regex);

  if (!dateFound) {
    return null;
  }
  return dateFound[0];
};
export const idFromLoanDetailsModalQueryParam = (queryParam: string) => {
  // regex for finding material details concatenated with id string from modal query param
  const result = queryParam.match(/^[^0-9]+(\d{8}$)|^[^0-9]+(\d{13}$)/);
  let returnValue = "";
  if (result) {
    const [, faust, identifier] = result;
    returnValue = faust || identifier;
  }
  return returnValue;
};

export const getLoanDetailsModalId = (queryParam: string) => {
  const { loanDetails } = getModalIds() || { loanDetails: "" };

  // regex for finding loan details concatenated with id from modal query param
  const regexIdentifier = new RegExp(`${loanDetails}(\\d{13})|(\\d{8})`, "g");
  const modalId = queryParam.match(regexIdentifier);
  if (modalId) {
    return [modalId];
  }
  return "";
};
