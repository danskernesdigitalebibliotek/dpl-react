import { getModalIds } from "./general";

export const containsDueDateModalString = (modalString: string) => {
  const { dueDateModal } = getModalIds();
  // regex for finding duedatemodal concatenated with date string from modal query param
  const regex = new RegExp(`${dueDateModal}\\d{4}-\\d{2}-\\d{2}`, "g");

  const dateFound = modalString.match(regex);
  if (!dateFound) {
    return null;
  }
  return dateFound[0];
};

export const dateFromDueDateModalString = (modalString: string) => {
  // regex for finding duedatemodal concatenated with date string from modal query param
  const regex = /\d{4}-\d{2}-\d{2}/g;

  const dateFound = modalString.match(regex);

  if (!dateFound) {
    return null;
  }
  return dateFound[0];
};
export const idFromLoanDetailsModalString = (modalString: string) => {
  // regex for finding duedatemodal concatenated with date string from modal query param
  const regexIdentifier = /\d{13}/g;
  const regexFaust = /\d{8}/g;

  let idFound = modalString.match(regexIdentifier);
  if (!idFound) {
    idFound = modalString.match(regexFaust);
    if (!idFound) {
      return null;
    }
  }
  return idFound[0];
};

export const getLoanDetailsModalId = (modalString: string) => {
  const { loanDetails } = getModalIds();
  // regex for finding loan details concatenated with id from modal query param
  const regexIdentifier = new RegExp(`${loanDetails}\\d{13}`, "g");
  const regexFaust = new RegExp(`${loanDetails}\\d{8}`, "g");
  let modalId = modalString.match(regexIdentifier);
  if (!modalId) {
    modalId = modalString.match(regexFaust);
    if (!modalId) {
      return null;
    }
  }
  return modalId[0];
};
