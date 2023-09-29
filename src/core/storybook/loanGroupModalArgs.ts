export default {
  groupModalRenewLoanDeniedMaxRenewalsReachedText: {
    control: {
      type: "text"
    },
    defaultValue: "The item cannot be renewed further "
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
    defaultValue: "The item is reserved by another patron"
  },
  groupModalRenewLoanDeniedInterLibraryLoanText: {
    defaultValue:
      "The item has been lent to you by another library and renewal is therefore conditional of the acceptance by that library",
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
  },
  groupModalLoansSuccessTitleText: {
    control: {
      type: "text"
    },
    defaultValue: "You have renewed your loans"
  },
  groupModalLoansSuccessStatusText: {
    control: { type: "text" },
    defaultValue:
      '{"type":"plural","text":["1 loan has been renewed.","@count loans have been renewed."]}'
  },
  groupModalLoansSuccessButtonText: {
    control: {
      type: "text"
    },
    defaultValue: "Ok"
  },
  groupModalLoansErrorTitleText: {
    control: {
      type: "text"
    },
    defaultValue: "Renewing your loans failed"
  },
  groupModalLoansErrorStatusText: {
    control: {
      type: "text"
    },
    defaultValue: "Something went wrong renewing your loans. Please try again."
  },
  groupModalLoansErrorButtonText: {
    control: {
      type: "text"
    },
    defaultValue: "Ok"
  },
  groupModalLoansNoRenewalsPossibleErrorTitleText: {
    control: {
      type: "text"
    },
    defaultValue: "No loans could be renewed"
  },
  groupModalLoansNoRenewalsPossibleErrorStatusText: {
    control: {
      type: "text"
    },
    defaultValue: "For various reasons, no one of your loans could be renewed."
  },
  groupModalButtonProcessingText: {
    control: {
      type: "text"
    },
    defaultValue: "Processing..."
  }
};

export interface GroupModalLoansProps {
  groupModalButtonProcessingText: string;
  groupModalButtonText: string;
  groupModalDueDateWarningLoanOverdueText: string;
  groupModalLoansAriaDescriptionText: string;
  groupModalLoansCloseModalAriaLabelText: string;
  groupModalLoansErrorButtonText: string;
  groupModalLoansErrorStatusText: string;
  groupModalLoansErrorTitleText: string;
  groupModalLoansNoRenewalsPossibleErrorStatusText: string;
  groupModalLoansNoRenewalsPossibleErrorTitleText: string;
  groupModalLoansSuccessButtonText: string;
  groupModalLoansSuccessStatusText: string;
  groupModalLoansSuccessTitleText: string;
  groupModalRenewLoanDeniedInterLibraryLoanText: string;
  groupModalRenewLoanDeniedMaxRenewalsReachedText: string;
  groupModalRenewLoanDeniedReservedText: string;
}
