import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import CreatePatron from "./CreatePatron.entry";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";

export default {
  title: "Apps / Create patron",
  component: CreatePatron,
  argTypes: {
    ...serviceUrlArgs,
    pincodeLengthConfig: {
      defaultValue: "4",
      control: { type: "number" }
    },
    blacklistedPickupBranchesConfig: {
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    },
    thresholdUserAgeConfig: {
      defaultValue: "3",
      control: { type: "text" }
    },
    createPatronSelectUserTypeHeaderText: {
      defaultValue: "Register as patron",
      control: { type: "text" }
    },
    createPatronSelectUserTypeSecondHeaderText: {
      defaultValue: "Register user (above @years years)",
      control: { type: "text" }
    },
    createPatronSelectUserTypeSecondSubHeaderText: {
      defaultValue:
        "Are you registering on behalf of a child (below @years years), company or institution?",
      control: { type: "text" }
    },
    createPatronSelectUserTypeAdultOptionText: {
      defaultValue: "User above @years",
      control: { type: "text" }
    },
    createPatronSelectUserTypeInstitutionOptionText: {
      defaultValue: "Institution",
      control: { type: "text" }
    },
    createPatronSelectUserTypeChildOptionText: {
      defaultValue: "Child/youth below @years",
      control: { type: "text" }
    },
    createPatronSelectUserTypeSubHeaderText: {
      defaultValue:
        "You must register as a library patron in order to borrow, reserve and use our digital ressources",
      control: { type: "text" }
    },
    createPatronSelectUserTypeAcceptedTermsText: {
      defaultValue:
        "In order to register as a library patron, you must be at least 18 years of age. You must also confirm, that you have read and accepted our general terms, rules and rates and that you have been informed as to how we handle your personal information.",
      control: { type: "text" }
    },
    createPatronSelectUserTypePrivacyPolicyLinkText: {
      defaultValue: "Privacy policy",
      control: { type: "text" }
    },
    createPatronSelectUserTypeRegulationsLinkText: {
      defaultValue: "Regulations",
      control: { type: "text" }
    },
    createPatronSelectUserTypeFeesLinkText: {
      defaultValue: "Fees",
      control: { type: "text" }
    },
    createPatronSelectUserTypeConfirmButtonText: {
      defaultValue: "Confirm",
      control: { type: "text" }
    },
    branchesConfig: {
      defaultValue:
        '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]',
      control: { type: "text" }
    },
    pickupBranchesDropdownLabelText: {
      defaultValue: "Choose pickup branch",
      control: { type: "text" }
    },
    // Texts
    patronPageChangePincodeHeaderText: {
      defaultValue: "Pincode",
      control: { type: "text" }
    },
    pickupBranchesDropdownNothingSelectedText: {
      defaultValue: "Nothing selected",
      control: { type: "text" }
    },
    patronPageChangePincodeBodyText: {
      defaultValue: "Change current pin by entering a new pin and saving",
      control: { type: "text" }
    },
    patronPagePincodeLabelText: {
      defaultValue: "New pin",
      control: { type: "text" }
    },
    patronPageConfirmPincodeLabelText: {
      defaultValue: "Confirm new pin",
      control: { type: "text" }
    },
    patronPagePincodeTooShortValidationText: {
      defaultValue:
        "The pincode is too short, it should be @pincodeLength characters long",
      control: { type: "text" }
    },
    patronPagePincodesNotTheSameText: {
      defaultValue: "The pincodes are not the same",
      control: { type: "text" }
    },
    patronContactPhoneLabelText: {
      defaultValue: "Phone number",
      control: { type: "text" }
    },
    patronContactInfoBodyText: {
      defaultValue: "",
      control: { type: "text" }
    },
    patronContactInfoHeaderText: {
      defaultValue: "",
      control: { type: "text" }
    },
    patronContactPhoneCheckboxText: {
      defaultValue:
        "Receive text messages about your loans, reservations, and so forth",
      control: { type: "text" }
    },
    patronContactEmailLabelText: {
      defaultValue: "E-mail",
      control: { type: "text" }
    },
    patronContactEmailCheckboxText: {
      defaultValue:
        "Receive emails about your loans, reservations, and so forth",
      control: { type: "text" }
    },
    createPatronChangePickupHeaderText: {
      defaultValue: "",
      control: { type: "text" }
    },
    createPatronChangePickupBodyText: {
      defaultValue: "",
      control: { type: "text" }
    },
    createPatronHeaderText: {
      defaultValue: "Register as patron",
      control: { type: "text" }
    },
    createPatronConfirmButtonText: {
      defaultValue: "Confirm",
      control: { type: "text" }
    },
    createPatronCancelButtonText: {
      defaultValue: "Cancel",
      control: { type: "text" }
    },
    privacyPolicyUrl: {
      defaultValue:
        "https://pixabay.com/photos/bird-penguin-humboldt-penguin-6781956/", // open source image of an itchy penguin
      control: { type: "text" }
    },
    regulationsUrl: {
      defaultValue:
        "https://pixabay.com/photos/bird-penguin-humboldt-penguin-6781956/", // open source image of an itchy penguin
      control: { type: "text" }
    },
    feesUrl: {
      defaultValue:
        "https://pixabay.com/photos/bird-penguin-humboldt-penguin-6781956/", // open source image of an itchy penguin
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof CreatePatron>;

const Template: ComponentStory<typeof CreatePatron> = (props) => (
  <CreatePatron {...props} />
);

export const CreatePatronEntry = Template.bind({});
CreatePatronEntry.args = {};
