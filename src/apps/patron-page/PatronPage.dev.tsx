import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import PatronPage from "./PatronPage.entry";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";

export default {
  title: "Apps / Patron page",
  component: PatronPage,
  argTypes: {
    ...serviceUrlArgs,
    // Config
    pauseReservationStartDateConfig: {
      defaultValue: "2022-06-30",
      control: { type: "text" }
    },
    blacklistedPickupBranchesConfig: {
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    },
    branchesConfig: {
      defaultValue:
        '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]',
      control: { type: "text" }
    },
    pincodeLengthMinConfig: {
      defaultValue: "4",
      control: { type: "number" }
    },
    pincodeLengthMaxConfig: {
      defaultValue: "5",
      control: { type: "number" }
    },
    deletePatronUrl: {
      defaultValue:
        "https://images.unsplash.com/photo-1560888126-5c13ad3f9345?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80", // A goat.
      control: { type: "text" }
    },
    pauseReservationInfoUrl: {
      defaultValue:
        "https://images.unsplash.com/photo-1560888126-5c13ad3f9345?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80", // A goat.
      control: { type: "text" }
    },
    textNotificationsEnabledConfig: {
      defaultValue: "true",
      control: { type: "text" }
    },
    alwaysAvailableEreolenUrl: {
      defaultValue:
        "https://images.unsplash.com/photo-1560888126-5c13ad3f9345?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80", // A goat.
      control: { type: "text" }
    },
    // Texts
    patronPageHeaderText: {
      defaultValue: "Patron profile page",
      control: { type: "text" }
    },
    pauseReservationModalHeaderText: {
      defaultValue: "Pause reservations on physical items",
      control: { type: "text" }
    },
    pauseReservationModalBodyText: {
      defaultValue:
        "Pause your reservations early, since reservations that are already being processed, will not be paused.",
      control: { type: "text" }
    },
    pauseReservationModalCloseModalText: {
      defaultValue: "Close pause reservations modal",
      control: { type: "text" }
    },
    dateInputsStartDateLabelText: {
      defaultValue: "Start date",
      control: { type: "text" }
    },
    dateInputsEndDateLabelText: {
      defaultValue: "End date",
      control: { type: "text" }
    },
    pauseReservationModalBelowInputsTextText: {
      defaultValue: "",
      control: { type: "text" }
    },
    pauseReservationModalLinkText: {
      defaultValue:
        "Read more about pausing reservertions and what that means here",
      control: { type: "text" }
    },
    pauseReservationModalSaveButtonLabelText: {
      defaultValue: "Save",
      control: { type: "text" }
    },
    patronPageTextFeeText: {
      defaultValue: "This might cost you money",
      control: { type: "text" }
    },
    patronPageBasicDetailsHeaderText: {
      defaultValue: "Basic details",
      control: { type: "text" }
    },
    patronPageBasicDetailsNameLabelText: {
      defaultValue: "Name",
      control: { type: "text" }
    },
    patronPageBasicDetailsAddressLabelText: {
      defaultValue: "Address",
      control: { type: "text" }
    },
    patronPageContactInfoHeaderText: {
      defaultValue: "Contact information",
      control: { type: "text" }
    },
    patronPageContactInfoBodyText: {
      defaultValue: "",
      control: { type: "text" }
    },
    patronPageContactPhoneLabelText: {
      defaultValue: "Phone number",
      control: { type: "text" }
    },
    patronPageContactPhoneCheckboxText: {
      defaultValue:
        "Receive text messages about your loans, reservations, and so forth",
      control: { type: "text" }
    },
    patronPageContactEmailLabelText: {
      defaultValue: "E-mail",
      control: { type: "text" }
    },
    patronPageContactEmailCheckboxText: {
      defaultValue:
        "Receive emails about your loans, reservations, and so forth",
      control: { type: "text" }
    },
    patronPageStatusSectionHeaderText: {
      defaultValue: "Digital loans (eReolen)",
      control: { type: "text" }
    },
    patronPageStatusSectionBodyText: {
      defaultValue:
        "There is a number of materials without limitation to amounts of loans per month.",
      control: { type: "text" }
    },
    patronPageStatusSectionLinkText: {
      defaultValue: "Click here, to see titles always eligible to be loaned",
      control: { type: "text" }
    },
    patronPageStatusSectionLoanHeaderText: {
      defaultValue: "Loans per month",
      control: { type: "text" }
    },
    patronPageStatusSectionLoansEbooksText: {
      defaultValue: "E-books",
      control: { type: "text" }
    },
    patronPageStatusSectionLoansAudioBooksText: {
      defaultValue: "Audiobooks",
      control: { type: "text" }
    },
    patronPageChangePickupHeaderText: {
      defaultValue: "Reservations",
      control: { type: "text" }
    },
    patronPageChangePickupBodyText: {
      defaultValue: "",
      control: { type: "text" }
    },
    pickupBranchesDropdownLabelText: {
      defaultValue: "Choose pickup branch",
      control: { type: "text" }
    },
    pickupBranchesDropdownNothingSelectedText: {
      defaultValue: "Nothing selected",
      control: { type: "text" }
    },
    patronPagePauseReservationsHeaderText: {
      defaultValue: "Pause physical reservations",
      control: { type: "text" }
    },
    patronPagePauseReservationsBodyText: {
      defaultValue: "",
      control: { type: "text" }
    },
    patronPageOpenPauseReservationsSectionText: {
      defaultValue: "Pause your reservations",
      control: { type: "text" }
    },
    patronPageOpenPauseReservationsSectionAriaText: {
      defaultValue:
        "This checkbox opens a modal where you can put your current reservations on a pause, when the time period picked has ended, the reservations will be resumed",
      control: { type: "text" }
    },
    patronPageChangePincodeHeaderText: {
      defaultValue: "Pincode",
      control: { type: "text" }
    },
    patronPageChangePincodeBodyText: {
      defaultValue: "Change current pin by entering a new pin and saving",
      control: { type: "text" }
    },
    patronPinSavedSuccessText: {
      defaultValue: "Pincode was saved",
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
    blacklistedAvailabilityBranchesConfig: {
      name: "Blacklisted Availability branches",
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    },
    patronPagePincodeTooShortValidationText: {
      defaultValue:
        "The pincode should be minimum @pincodeLengthMin and maximum @pincodeLengthMax characters long",
      control: { type: "text" }
    },
    patronPagePincodesNotTheSameText: {
      defaultValue: "The pincodes are not the same",
      control: { type: "text" }
    },
    patronPageSaveButtonText: {
      defaultValue: "Save",
      control: { type: "text" }
    },
    patronPageDeleteProfileText: {
      defaultValue: "Do you wish to delete your library profile?",
      control: { type: "text" }
    },
    patronPageDeleteProfileLinkText: {
      defaultValue: "Delete your profile",
      control: { type: "text" }
    },
    patronPageStatusSectionReservationsText: {
      defaultValue:
        "You can reserve @countEbooks ebooks and @countAudiobooks audiobooks",
      control: { type: "text" }
    },
    patronPageStatusSectionOutOfText: {
      defaultValue: "@this out of @that",
      control: { type: "text" }
    },
    patronPageStatusSectionOutOfAriaLabelAudioBooksText: {
      defaultValue:
        "You used @this audiobooks out of you quota of @that audiobooks",
      control: { type: "text" }
    },
    patronPageStatusSectionOutOfAriaLabelEbooksText: {
      defaultValue: "You used @this ebooks out of you quota of @that ebooks",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof PatronPage>;

const Template: ComponentStory<typeof PatronPage> = (props) => (
  <PatronPage {...props} />
);

export const PatronPageEntry = Template.bind({});
PatronPageEntry.args = {};
