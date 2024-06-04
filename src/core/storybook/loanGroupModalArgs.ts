export default {
  groupModalRenewLoanDeniedMaxRenewalsReachedText: {
    control: {
      type: "text"
    },
    defaultValue: "Can't be renewed further"
  },
  groupModalDueDateWarningLoanOverdueText: {
    control: {
      type: "text"
    },
    defaultValue:
      "The due date of return is exceeded, therefore you will be charged a fee, when the item is returned"
  },
  groupModalRenewLoanDeniedReservedText: {
    control: {
      type: "text"
    },
    defaultValue: "Reserved by another patron"
  },
  groupModalRenewLoanDeniedInterLibraryLoanText: {
    defaultValue: "Lent by another library",
    control: { type: "text" }
  },
  groupModalLoansCloseModalAriaLabelText: {
    control: {
      type: "text"
    },
    defaultValue: "Close modal with grouped loans"
  },
  groupModalLoansAriaDescriptionText: {
    control: {
      type: "text"
    },
    defaultValue: "This modal makes it possible to renew materials"
  },
  groupModalButtonText: {
    control: {
      type: "text"
    },
    defaultValue: "Renewable (@count)"
  }
};

export interface GroupModalLoansProps {
  groupModalButtonText: string;
  groupModalDueDateWarningLoanOverdueText: string;
  groupModalLoansAriaDescriptionText: string;
  groupModalLoansCloseModalAriaLabelText: string;
  groupModalRenewLoanDeniedInterLibraryLoanText: string;
  groupModalRenewLoanDeniedMaxRenewalsReachedText: string;
  groupModalRenewLoanDeniedReservedText: string;
}
