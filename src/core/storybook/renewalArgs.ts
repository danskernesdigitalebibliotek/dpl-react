export const argTypes = {
  renewProcessingText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "Processing..." }
    }
  },
  renewButtonText: {
    control: { type: "text" },
    table: { type: { summary: "text" }, defaultValue: { summary: "Renew" } }
  },
  renewMaterialLoanSuccessTitleText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "You have renewed your loan" }
    }
  },
  renewMaterialLoanSuccessStatusText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "1 loan was renewed." }
    }
  },
  renewMaterialLoanNoRenewalsPossibleErrorTitleText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "The loan could not be renewed" }
    }
  },
  renewMaterialLoanNoRenewalsPossibleErrorStatusText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "For some reason, your loan could not be renewed."
      }
    }
  },
  renewMaterialLoanErrorTitleText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "Renewal of your loan failed" }
    }
  },
  renewMaterialLoanErrorStatusText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Something went wrong renewing your loan. Please try again."
      }
    }
  },
  renewMaterialLoanButtonText: {
    control: { type: "text" },
    table: { type: { summary: "text" }, defaultValue: { summary: "Ok" } }
  },
  renewGroupModalLoansSuccessTitleText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "You have renewed your loans" }
    }
  },
  renewGroupModalLoansSuccessStatusText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary:
          '{"type":"plural","text":["1 loan has been renewed.","@count loans have been renewed."]}'
      }
    }
  },
  renewGroupModalLoansErrorTitleText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "Renewing your loans failed" }
    }
  },
  renewGroupModalLoansErrorStatusText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "Something went wrong renewing your loans. Please try again."
      }
    }
  },
  renewGroupModalLoansButtonText: {
    control: { type: "text" },
    table: { type: { summary: "text" }, defaultValue: { summary: "Ok" } }
  },
  renewGroupModalLoansNoRenewalsPossibleErrorTitleText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "No loans could be renewed" }
    }
  },
  renewGroupModalLoansNoRenewalsPossibleErrorStatusText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: {
        summary: "For some reason, no one of your loans could be renewed."
      }
    }
  },
  renewCannotBeRenewedText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "Cannot be renewed" }
    }
  }
};

export default {
  renewProcessingText: "Processing...",
  renewButtonText: "Renew",
  renewMaterialLoanSuccessTitleText: "You have renewed your loan",
  renewMaterialLoanSuccessStatusText: "1 loan was renewed.",
  renewMaterialLoanNoRenewalsPossibleErrorTitleText:
    "The loan could not be renewed",
  renewMaterialLoanNoRenewalsPossibleErrorStatusText:
    "For some reason, your loan could not be renewed.",
  renewMaterialLoanErrorTitleText: "Renewal of your loan failed",
  renewMaterialLoanErrorStatusText:
    "Something went wrong renewing your loan. Please try again.",
  renewMaterialLoanButtonText: "Ok",
  renewGroupModalLoansSuccessTitleText: "You have renewed your loans",
  renewGroupModalLoansSuccessStatusText:
    '{"type":"plural","text":["1 loan has been renewed.","@count loans have been renewed."]}',
  renewGroupModalLoansErrorTitleText: "Renewing your loans failed",
  renewGroupModalLoansErrorStatusText:
    "Something went wrong renewing your loans. Please try again.",
  renewGroupModalLoansButtonText: "Ok",
  renewGroupModalLoansNoRenewalsPossibleErrorTitleText:
    "No loans could be renewed",
  renewGroupModalLoansNoRenewalsPossibleErrorStatusText:
    "For some reason, no one of your loans could be renewed.",
  renewCannotBeRenewedText: "Cannot be renewed"
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
