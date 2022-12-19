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
  // regex for finding duedatemodal concatenated with date string from modal query param
  const regexIdentifier = /\d{13}/g;
  const regexFaust = /\d{8}/g;
  let idFound = queryParam.match(regexIdentifier);

  if (!idFound) {
    idFound = queryParam.match(regexFaust);
    if (!idFound) {
      return null;
    }
  }
  return idFound[0];
};

export const getLoanDetailsModalId = (queryParam: string) => {
  const { loanDetails } = getModalIds();
  // regex for finding loan details concatenated with id from modal query param
  const regexIdentifier = new RegExp(`${loanDetails}\\d{13}`, "g");
  const regexFaust = new RegExp(`${loanDetails}\\d{8}`, "g");
  let modalId = queryParam.match(regexIdentifier);
  if (!modalId) {
    modalId = queryParam.match(regexFaust);
    if (!modalId) {
      return null;
    }
  }
  return modalId[0];
};
