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
  materialDetailsCloseModalAriaLabelText: {
    control: {
      type: "text"
    },
    defaultValue: "Close material details modal"
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
  materialDetailsModalAriaDescriptionText: {
    control: {
      type: "text"
    },
    defaultValue:
      "This modal shows material details, and makes it possible to renew a material, of that material is renewable"
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
    defaultValue: "/user/me/fees", // open source image of a red panda
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
  materialDetailsCloseModalAriaLabelText: string;
  materialDetailsLinkToPageWithFeesText: string;
  materialDetailsOverdueText: string;
  feesPageUrl: string;
  ereolenMyPageUrl: string;
  materialDetailsModalAriaDescriptionText: string;
  materialDetailsGoToEreolenText: string;
  materialDetailsDigitalDueDateLabelText: string;
  materialDetailsRenewLoanButtonText: string;
}
