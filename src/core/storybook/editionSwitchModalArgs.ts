export const argTypes = {
  editionSwitchButtonChangeText: {
    description: "Text for change edition button",
    control: { type: "text" }
  },
  editionSwitchButtonChooseText: {
    description: "Text for choose button",
    control: { type: "text" }
  },
  editionSwitchButtonFictionText: {
    description:
      "Text for edition switch button for fiction materials (first available)",
    control: { type: "text" }
  },
  editionSwitchButtonNonFictionText: {
    description:
      "Text for edition switch button for non-fiction materials (latest edition)",
    control: { type: "text" }
  },
  editionSwitchModalCloseAriaLabelText: {
    description: "Aria label for close button in edition switch modal",
    control: { type: "text" }
  },
  editionSwitchModalDescriptionText: {
    description: "Description text for edition switch modal",
    control: { type: "text" }
  },
  editionSwitchModalScreenReaderDescriptionText: {
    description: "Screen reader description for edition switch modal",
    control: { type: "text" }
  },
  editionSwitchModalTitleText: {
    description: "Title text for edition switch modal",
    control: { type: "text" }
  }
};

export default {
  editionSwitchButtonChangeText: "Change edition",
  editionSwitchButtonChooseText: "Choose",
  editionSwitchButtonFictionText: "First available edition",
  editionSwitchButtonNonFictionText: "Latest edition",
  editionSwitchModalCloseAriaLabelText: "Close edition switch modal",
  editionSwitchModalDescriptionText:
    "Select which edition you would like to reserve from the available options below.",
  editionSwitchModalScreenReaderDescriptionText: "Edition switch modal",
  editionSwitchModalTitleText: "Choose Edition"
};

export interface EditionSwitchModalArgs {
  editionSwitchButtonChangeText: string;
  editionSwitchButtonChooseText: string;
  editionSwitchButtonFictionText: string;
  editionSwitchButtonNonFictionText: string;
  editionSwitchModalCloseAriaLabelText: string;
  editionSwitchModalDescriptionText: string;
  editionSwitchModalScreenReaderDescriptionText: string;
  editionSwitchModalTitleText: string;
}
