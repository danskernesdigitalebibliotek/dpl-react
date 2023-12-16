export default {
  materialDetailsWarningLoanOverdueText: {
    control: {
      type: "text"
    },
    defaultValue:
      "The due date of return is exceeded, therefore you will be charged a fee, when the item is returned"
  },
  materialDetailsPhysicalDueDateLabelText: {
    control: {
      type: "text"
    },
    defaultValue: "Afleveres"
  },
  materialDetailsLoanDateLabelText: {
    control: {
      type: "text"
    },
    defaultValue: "Loan date"
  },
  materialDetailsMaterialNumberLabelText: {
    control: {
      type: "text"
    },
    defaultValue: "Material Item Number"
  },
  materialDetailsLinkToPageWithFeesText: {
    control: {
      type: "text"
    },
    defaultValue: "Read more about fees"
  },
  materialDetailsOverdueText: {
    control: {
      type: "text"
    },
    defaultValue: "Expired"
  },
  materialDetailsGoToEreolenText: {
    defaultValue: "Go to eReolen",
    control: { type: "text" }
  },
  materialDetailsDigitalDueDateLabelText: {
    control: {
      type: "text"
    },
    defaultValue: "Expires"
  },
  materialDetailsRenewLoanButtonText: {
    control: {
      type: "text"
    },
    defaultValue: "Renew your loan"
  },
  feesPageUrl: {
    defaultValue: "/user/me/fees",
    control: { type: "text" }
  },
  viewFeesAndCompensationRatesUrl: {
    defaultValue: "https://unsplash.com/photos/wd6YQy0PJt8", // open source image of a red panda
    control: { type: "text" }
  },
  ereolenMyPageUrl: {
    defaultValue: "https://unsplash.com/photos/wd6YQy0PJt8", // open source image of a red panda
    control: { type: "text" }
  }
};

export interface MaterialDetailsModalProps {
  materialDetailsWarningLoanOverdueText: string;
  materialDetailsPhysicalDueDateLabelText: string;
  materialDetailsLoanDateLabelText: string;
  materialDetailsMaterialNumberLabelText: string;
  materialDetailsLinkToPageWithFeesText: string;
  materialDetailsOverdueText: string;
  feesPageUrl: string;
  ereolenMyPageUrl: string;
  materialDetailsGoToEreolenText: string;
  materialDetailsDigitalDueDateLabelText: string;
  materialDetailsRenewLoanButtonText: string;
}
