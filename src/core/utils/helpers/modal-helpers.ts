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
  const regex = /\d{8}/g;

  const idFound = modalString.match(regex);

  if (!idFound) {
    return null;
  }
  return idFound[0];
};

export const getLoanDetailsModalId = (modalString: string) => {
  const { loanDetails } = getModalIds();
  // regex for finding loan details concatenated with id from modal query param
  const regex = new RegExp(`${loanDetails}\\d*`, "g");

  const modalId = modalString.match(regex);
  if (!modalId) {
    return null;
  }
  return modalId[0];
};
