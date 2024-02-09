export default {
  renewProcessingText: {
    control: {
      type: "text"
    },
    defaultValue: "Processing..."
  },
  renewButtonText: {
    control: {
      type: "text"
    },
    defaultValue: "Renew"
  },
  renewMaterialLoanSuccessTitleText: {
    control: {
      type: "text"
    },
    defaultValue: "You have renewed your loan"
  },
  renewMaterialLoanSuccessStatusText: {
    control: { type: "text" },
    defaultValue: "1 loan was renewed."
  },
  renewMaterialLoanNoRenewalsPossibleErrorTitleText: {
    control: {
      type: "text"
    },
    defaultValue: "The loan could not be renewed"
  },
  renewMaterialLoanNoRenewalsPossibleErrorStatusText: {
    control: {
      type: "text"
    },
    defaultValue: "For some reason, your loan could not be renewed."
  },
  renewMaterialLoanErrorTitleText: {
    control: {
      type: "text"
    },
    defaultValue: "Renewal of your loan failed"
  },
  renewMaterialLoanErrorStatusText: {
    control: {
      type: "text"
    },
    defaultValue: "Something went wrong renewing your loan. Please try again."
  },
  renewMaterialLoanButtonText: {
    control: {
      type: "text"
    },
    defaultValue: "Ok"
  },
  renewGroupModalLoansSuccessTitleText: {
    control: {
      type: "text"
    },
    defaultValue: "You have renewed your loans"
  },
  renewGroupModalLoansSuccessStatusText: {
    control: { type: "text" },
    defaultValue:
      '{"type":"plural","text":["1 loan has been renewed.","@count loans have been renewed."]}'
  },
  renewGroupModalLoansErrorTitleText: {
    control: {
      type: "text"
    },
    defaultValue: "Renewing your loans failed"
  },
  renewGroupModalLoansErrorStatusText: {
    control: {
      type: "text"
    },
    defaultValue: "Something went wrong renewing your loans. Please try again."
  },
  renewGroupModalLoansButtonText: {
    control: {
      type: "text"
    },
    defaultValue: "Ok"
  },
  renewGroupModalLoansNoRenewalsPossibleErrorTitleText: {
    control: {
      type: "text"
    },
    defaultValue: "No loans could be renewed"
  },
  renewGroupModalLoansNoRenewalsPossibleErrorStatusText: {
    control: {
      type: "text"
    },
    defaultValue: "For some reason, no one of your loans could be renewed."
  },
  renewCannotBeRenewedText: {
    control: {
      type: "text"
    },
    defaultValue: "Cannot be renewed"
  }
};

export interface RenewalArgs {
  renewGroupModalLoansButtonText: string;
  renewGroupModalLoansErrorStatusText: string;
  renewGroupModalLoansErrorTitleText: string;
  renewGroupModalLoansNoRenewalsPossibleErrorStatusText: string;
  renewGroupModalLoansNoRenewalsPossibleErrorTitleText: string;
  renewGroupModalLoansSuccessStatusText: string;
  renewGroupModalLoansSuccessTitleText: string;
  renewMaterialLoanButtonText: string;
  renewMaterialLoanErrorStatusText: string;
  renewMaterialLoanErrorTitleText: string;
  renewMaterialLoanNoRenewalsPossibleErrorStatusText: string;
  renewMaterialLoanNoRenewalsPossibleErrorTitleText: string;
  renewMaterialLoanSuccessStatusText: string;
  renewMaterialLoanSuccessTitleText: string;
  renewProcessingText: string;
  renewCannotBeRenewedText: string;
}
