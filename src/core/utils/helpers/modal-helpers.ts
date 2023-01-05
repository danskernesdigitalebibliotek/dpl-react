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

export const getLoanDetailsModalId = (queryParam: string) => {
  // regex for finding loan details concatenated with id from modal query param
  const regexIdentifier = /(?<=work-of:)(\d{6}-.*:\d{8})/g;
  const modalId = queryParam.match(regexIdentifier);
  if (modalId) {
    const [returnId] = modalId;
    return returnId;
  }
  return "";
};
