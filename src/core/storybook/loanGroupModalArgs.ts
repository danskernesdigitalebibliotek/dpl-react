export const argTypes = {
  groupModalRenewLoanDeniedMaxRenewalsReachedText: {
    control: { type: "text" },
    table: {
      defaultValue: { summary: "Can't be renewed further" },
      type: { summary: "text" }
    }
  },
  groupModalDueDateWarningLoanOverdueText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue:
        "The due date of return is exceeded, therefore you will be charged a fee, when the item is returned"
    }
  },
  groupModalRenewLoanDeniedReservedText: {
    control: { type: "text" },
    table: {
      defaultValue: { summary: "Reserved by another patron" },
      type: { summary: "text" }
    }
  },
  groupModalRenewLoanDeniedInterLibraryLoanText: {
    control: { type: "text" },
    table: {
      defaultValue: { summary: "Lent by another library" },
      type: { summary: "text" }
    }
  },
  groupModalLoansCloseModalAriaLabelText: {
    control: { type: "text" },
    table: {
      defaultValue: { summary: "Close modal with grouped loans" },
      type: { summary: "text" }
    }
  },
  groupModalLoansAriaDescriptionText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "This modal makes it possible to renew materials"
      }
    }
  },
  groupModalButtonText: {
    control: { type: "text" },
    table: {
      defaultValue: { summary: "Renewable (@count)" },
      type: { summary: "text" }
    }
  }
};

export default {
  groupModalRenewLoanDeniedMaxRenewalsReachedText: "Can't be renewed further",
  groupModalDueDateWarningLoanOverdueText:
    "The due date of return is exceeded, therefore you will be charged a fee, when the item is returned",
  groupModalRenewLoanDeniedReservedText: "Reserved by another patron",
  groupModalRenewLoanDeniedInterLibraryLoanText: "Lent by another library",
  groupModalLoansCloseModalAriaLabelText: "Close modal with grouped loans",
  groupModalLoansAriaDescriptionText:
    "This modal makes it possible to renew materials",
  groupModalButtonText: "Renewable (@count)"
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
