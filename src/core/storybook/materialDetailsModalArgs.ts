export const argTypes = {
  materialDetailsWarningLoanOverdueText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue:
        "The due date of return is exceeded, therefore you will be charged a fee, when the item is returned"
    }
  },
  materialDetailsPhysicalDueDateLabelText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "Afleveres" }
    }
  },
  materialDetailsLoanDateLabelText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "Loan date" }
    }
  },
  materialDetailsMaterialNumberLabelText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "Material Item Number" }
    }
  },
  materialDetailsLinkToPageWithFeesText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "Read more about fees" }
    }
  },
  materialDetailsOverdueText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "Expired" }
    }
  },
  materialDetailsGoToEreolenText: {
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "Go to eReolen" }
    },
    control: { type: "text" }
  },
  materialDetailsDigitalDueDateLabelText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "Expires" }
    }
  },
  materialDetailsRenewLoanButtonText: {
    control: { type: "text" },
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "Renew your loan" }
    }
  },
  feesPageUrl: {
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "/user/me/fees" }
    },
    control: { type: "text" }
  },
  viewFeesAndCompensationRatesUrl: {
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "https://unsplash.com/photos/wd6YQy0PJt8" } // open source image of a red panda
    },
    control: { type: "text" }
  },
  ereolenMyPageUrl: {
    table: {
      type: { summary: "text" },
      defaultValue: { summary: "https://unsplash.com/photos/wd6YQy0PJt8" } // open source image of a red panda
    },
    control: { type: "text" }
  }
};

export default {
  materialDetailsWarningLoanOverdueText:
    "The due date of return is exceeded, therefore you will be charged a fee, when the item is returned",
  materialDetailsPhysicalDueDateLabelText: "Afleveres",
  materialDetailsLoanDateLabelText: "Loan date",
  materialDetailsMaterialNumberLabelText: "Material Item Number",
  materialDetailsLinkToPageWithFeesText: "Read more about fees",
  materialDetailsOverdueText: "Expired",
  materialDetailsGoToEreolenText: "Go to eReolen",
  materialDetailsDigitalDueDateLabelText: "Expires",
  materialDetailsRenewLoanButtonText: "Renew your loan",
  feesPageUrl: "/user/me/fees",
  viewFeesAndCompensationRatesUrl: "https://unsplash.com/photos/wd6YQy0PJt8", // open source image of a red panda
  ereolenMyPageUrl: "https://unsplash.com/photos/wd6YQy0PJt8" // open source image of a red panda
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
