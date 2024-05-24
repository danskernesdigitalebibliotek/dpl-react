import configuration, { getConf } from "../../configuration";

export const constructModalId = (prefix: string, fragments: string[]) =>
  [prefix, ...fragments].join("-");

export const getModalIds = () => {
  return getConf("modalIds", configuration);
};

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

export const getDetailsModalId = (queryParam: string, prefix: string) => {
  // regex for finding loan details concatenated with id from modal query param
  const regexIdentifier = new RegExp(
    `(?<=${prefix})((\\d{13})|((\\d{10}))||((\\d{9}))|(\\d{8}))`,
    "g"
  );
  const modalId = queryParam.match(regexIdentifier);
  if (modalId) {
    const [returnId] = modalId;
    return returnId;
  }
  return "";
};

export const createLoanModalId = (
  dueDate: string | null | undefined,
  dueDateModal: string | number | Record<string, unknown>,
  allLoansId: string | number | Record<string, unknown>
) => (dueDate ? `${dueDateModal}-${dueDate}` : String(allLoansId));
