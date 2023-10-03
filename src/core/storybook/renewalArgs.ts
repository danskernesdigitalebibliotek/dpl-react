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
  renewMaterialLoanSuccessButtonText: {
    control: {
      type: "text"
    },
    defaultValue: "Ok"
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
  renewMaterialLoanErrorButtonText: {
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
  renewGroupModalLoansSuccessButtonText: {
    control: {
      type: "text"
    },
    defaultValue: "Ok"
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
  renewGroupModalLoansErrorButtonText: {
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
  renewProcessingText: string;
  renewMaterialLoanSuccessTitleText: string;
  renewMaterialLoanSuccessStatusText: string;
  renewMaterialLoanSuccessButtonText: string;
  renewMaterialLoanNoRenewalsPossibleErrorTitleText: string;
  renewMaterialLoanNoRenewalsPossibleErrorStatusText: string;
  renewMaterialLoanErrorTitleText: string;
  renewMaterialLoanErrorStatusText: string;
  renewMaterialLoanErrorButtonText: string;
  renewGroupModalLoansSuccessTitleText: string;
  renewGroupModalLoansSuccessStatusText: string;
  renewGroupModalLoansSuccessButtonText: string;
  renewGroupModalLoansErrorTitleText: string;
  renewGroupModalLoansErrorStatusText: string;
  renewGroupModalLoansErrorButtonText: string;
  renewGroupModalLoansNoRenewalsPossibleErrorTitleText: string;
  renewGroupModalLoansNoRenewalsPossibleErrorStatusText: string;
}
