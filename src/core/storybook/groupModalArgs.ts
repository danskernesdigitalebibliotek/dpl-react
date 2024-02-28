export default {
  groupModalDueDateLinkToPageWithFeesText: {
    control: {
      type: "text"
    },
    defaultValue: "Read more about fees"
  },
  groupModalDueDateMaterialText: {
    control: {
      type: "text"
    },
    defaultValue: "To be returned @date"
  },
  groupModalDueDateDigitalMaterialText: {
    control: {
      type: "text"
    },
    defaultValue: "Expires @date"
  },
  groupModalGoToMaterialText: {
    defaultValue: "Go to material details",
    control: { type: "text" }
  },
  groupModalDueDateHeaderText: {
    control: {
      type: "text"
    },
    defaultValue: "Due date @date"
  },
  resultPagerStatusText: {
    defaultValue: "Showing @itemsShown out of @hitcount elements",
    control: { type: "text" }
  },
  groupModalReturnLibraryText: {
    defaultValue: "Can be returned to all branches of Samsøs libraries",
    control: { type: "text" }
  },
  groupModalCheckboxText: {
    control: {
      type: "text"
    },
    defaultValue: "Choose all"
  },
  groupModalHiddenLabelCheckboxOnMaterialText: {
    control: {
      type: "text"
    },
    defaultValue: "Select @label"
  },
  pageSizeDesktop: {
    defaultValue: 10,
    control: { type: "number" }
  },
  pageSizeMobile: {
    defaultValue: 5,
    control: { type: "number" }
  },
  showMoreText: {
    defaultValue: "show more",
    control: { type: "text" }
  }
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
  groupModalReturnLibraryText: string;
  groupModalCheckboxText: string;
  groupModalHiddenLabelCheckboxOnMaterialText: string;
  resultPagerStatusText: string;
}
