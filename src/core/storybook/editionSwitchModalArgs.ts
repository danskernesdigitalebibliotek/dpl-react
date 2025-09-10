export const argTypes = {
  editionSwitchModalScreenReaderDescriptionText: {
    description: "Screen reader description for edition switch modal",
    control: { type: "text" }
  },
  editionSwitchModalCloseAriaLabelText: {
    description: "Aria label for close button in edition switch modal",
    control: { type: "text" }
  },
  editionSwitchModalTitleText: {
    description: "Title text for edition switch modal",
    control: { type: "text" }
  },
  editionSwitchModalDescriptionText: {
    description: "Description text for edition switch modal",
    control: { type: "text" }
  },
  editionChangeText: {
    description: "Text for change edition button aria label",
    control: { type: "text" }
  },
  editionChooseText: {
    description: "Text for choose button",
    control: { type: "text" }
  }
};

export default {
  editionSwitchModalScreenReaderDescriptionText: "Edition switch modal",
  editionSwitchModalCloseAriaLabelText: "Close edition switch modal",
  editionSwitchModalTitleText: "Choose Edition",
  editionSwitchModalDescriptionText:
    "Select which edition you would like to reserve from the available options below.",
  editionChangeText: "Change edition",
  editionChooseText: "Choose"
};

export interface EditionSwitchModalArgs {
  editionSwitchModalScreenReaderDescriptionText: string;
  editionSwitchModalCloseAriaLabelText: string;
  editionSwitchModalTitleText: string;
  editionSwitchModalDescriptionText: string;
  editionChangeText: string;
  editionChooseText: string;
}
