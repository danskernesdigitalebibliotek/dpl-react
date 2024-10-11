export const argTypes = {
  groupModalDueDateLinkToPageWithFeesText: {
    control: { type: "text" },
    table: {
      defaultValue: { summary: "Read more about fees" },
      type: { summary: "text" }
    }
  },
  groupModalDueDateMaterialText: {
    control: { type: "text" },
    table: {
      defaultValue: { summary: "To be returned @date" },
      type: { summary: "text" }
    }
  },
  groupModalDueDateDigitalMaterialText: {
    control: { type: "text" },
    table: {
      defaultValue: { summary: "Expires @date" },
      type: { summary: "text" }
    }
  },
  groupModalGoToMaterialText: {
    control: { type: "text" },
    table: {
      defaultValue: { summary: "Go to material details" },
      type: { summary: "text" }
    }
  },
  groupModalDueDateHeaderText: {
    control: { type: "text" },
    table: {
      defaultValue: { summary: "Due date @date" },
      type: { summary: "text" }
    }
  },
  resultPagerStatusText: {
    control: { type: "text" },
    table: {
      defaultValue: {
        summary: "Showing @itemsShown out of @hitcount elements"
      },
      type: { summary: "text" }
    }
  },
  groupModalCheckboxText: {
    control: { type: "text" },
    table: {
      defaultValue: { summary: "Choose all" },
      type: { summary: "text" }
    }
  },
  groupModalHiddenLabelCheckboxOnMaterialText: {
    control: { type: "text" },
    table: {
      defaultValue: { summary: "Select @label" },
      type: { summary: "text" }
    }
  },
  pageSizeDesktop: {
    control: { type: "number" },
    table: {
      defaultValue: { summary: 10 },
      type: { summary: "number" }
    }
  },
  pageSizeMobile: {
    control: { type: "number" },
    table: {
      defaultValue: { summary: 5 },
      type: { summary: "number" }
    }
  },
  showMoreText: {
    control: { type: "text" },
    table: {
      defaultValue: { summary: "show more" },
      type: { summary: "text" }
    }
  }
};

export default {
  groupModalDueDateLinkToPageWithFeesText: "Read more about fees",
  groupModalDueDateMaterialText: "To be returned @date",
  groupModalDueDateDigitalMaterialText: "Expires @date",
  groupModalGoToMaterialText: "Go to material details",
  groupModalDueDateHeaderText: "Due date @date",
  resultPagerStatusText: "Showing @itemsShown out of @hitcount elements",
  groupModalCheckboxText: "Choose all",
  groupModalHiddenLabelCheckboxOnMaterialText: "Select @label",
  pageSizeDesktop: 10,
  pageSizeMobile: 5,
  showMoreText: "show more"
};

export interface GroupModalProps {
  pageSizeMobile: number;
  pageSizeDesktop: number;
  groupModalDueDateLinkToPageWithFeesText: string;
  showMoreText: string;
  groupModalDueDateMaterialText: string;
  groupModalDueDateDigitalMaterialText: string;
  groupModalGoToMaterialText: string;
  groupModalDueDateHeaderText: string;
  groupModalCheckboxText: string;
  groupModalHiddenLabelCheckboxOnMaterialText: string;
  resultPagerStatusText: string;
}
