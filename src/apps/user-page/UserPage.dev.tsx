import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { configTypes } from "../../core/utils/helpers/fetcher";
import UserPage from "./UserPage.entry";

export default {
  title: "Apps / User page",
  component: UserPage,
  argTypes: {
    // Config
    [configTypes.fbs]: {
      defaultValue: "",
      control: { type: "text" }
    },
    [configTypes.publizon]: {
      defaultValue: "",
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
    pincodeLengthConfig: {
      defaultValue: 4,
      control: { type: "number" }
    },
    deletePatronLinkConfig: {
      defaultValue: 
        "https://images.unsplash.com/photo-1560888126-5c13ad3f9345?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80", // A goat.
      control: { type: "text" }
    },
    // Texts
    userPageHeaderText: {
      defaultValue: "User profile page",
      control: { type: "text" }
    },
    userPageBasicDetailsHeaderText: {
      defaultValue: "Basic details",
      control: { type: "text" }
    },
    userPageBasicDetailsNameLabelText: {
      defaultValue: "Name",
      control: { type: "text" }
    },
    userPageBasicDetailsAddressLabelText: {
      defaultValue: "Address",
      control: { type: "text" }
    },
    userPageContactInfoHeaderText: {
      defaultValue: "Contact information",
      control: { type: "text" }
    },
    userPageContactInfoBreadText: {
      defaultValue: "",
      control: { type: "text" }
    },
    userPageContactPhoneLabelText: {
      defaultValue: "Phone number",
      control: { type: "text" }
    },
    userPageContactPhoneCheckboxText: {
      defaultValue:
        "Receive text messages about your loans, reservations, and so forth",
      control: { type: "text" }
    },
    userPageContactEmailLabelText: {
      defaultValue: "E-mail",
      control: { type: "text" }
    },
    userPageContactEmailCheckboxText: {
      defaultValue:
        "Receive emails about your loans, reservations, and so forth",
      control: { type: "text" }
    },
    userPageStatusBarHeaderText: {
      defaultValue: "Digital loans (eReolen)",
      control: { type: "text" }
    },
    userPageStatusBarBreadText: {
      defaultValue:
        "There is a number of materials without limitation to amounts of loans per month.",
      control: { type: "text" }
    },
    userPageStatusBarLinkText: {
      defaultValue: "Click here, to see titles always eligible to be loaned",
      control: { type: "text" }
    },
    userPageStatusBarLoanHeaderText: {
      defaultValue: "Loans per month",
      control: { type: "text" }
    },
    userPageStatusBarReservationsHeaderText: {
      defaultValue: "Reservations per month",
      control: { type: "text" }
    },
    userPageStatusBarLoansEbooksText: {
      defaultValue: "E-books",
      control: { type: "text" }
    },
    userPageStatusBarLoansAudioBooksText: {
      defaultValue: "Audiobooks",
      control: { type: "text" }
    },
    userPageStatusBarReservationsEbooksText: {
      defaultValue: "E-books",
      control: { type: "text" }
    },
    userPageStatusBarReservationsAudioBooksText: {
      defaultValue: "Audiobooks",
      control: { type: "text" }
    },
    userPageChangePickupHeaderText: {
      defaultValue: "Reservations",
      control: { type: "text" }
    },
    userPageChangePickupBreadText: {
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
    userPagePauseReservationsHeaderText: {
      defaultValue: "Pause physical reservations",
      control: { type: "text" }
    },
    userPagePauseReservationsBreadText: {
      defaultValue: "",
      control: { type: "text" }
    },
    userPageOpenPauseReservationsSectionText: {
      defaultValue: "Open pause reservation section",
      control: { type: "text" }
    },
    userPageOpenPauseReservationsSectionAriaText: {
      defaultValue:
        "This checkbox opens a section where you can put your current reservations on a pause, when the time period picked has ended, the reservations will be resumed",
      control: { type: "text" }
    },
    pauseReservationStartDateLabelText: {
      defaultValue: "From",
      control: { type: "text" }
    },
    pauseReservationEndDateLabelText: {
      defaultValue: "To",
      control: { type: "text" }
    },
    userPageChangePincodeHeaderText: {
      defaultValue: "Pincode",
      control: { type: "text" }
    },
    userPageChangePincodeBreadText: {
      defaultValue: "Change current pin by entering a new pin and saving",
      control: { type: "text" }
    },
    userPagePincodeLabelText: {
      defaultValue: "New pin",
      control: { type: "text" }
    },
    userPageConfirmPincodeLabelText: {
      defaultValue: "Confirm new pin",
      control: { type: "text" }
    },
    userPagePincodeTooShortValidationText: {
      defaultValue: "The pincode is too short, it should be {number} long",
      control: { type: "text" }
    },
    userPagePincodesNotTheSameText: {
      defaultValue: "The pincodes are not the same",
      control: { type: "text" }
    },
    userPageSaveButtonText: {
      defaultValue: "Save",
      control: { type: "text" }
    },
    userPageDeleteProfileText: {
      defaultValue: "Do you wish to delete your library profile?",
      control: { type: "text" }
    },
    userPageDeleteProfileLinkText: {
      defaultValue: "Delete your profile",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof UserPage>;

const Template: ComponentStory<typeof UserPage> = (props) => (
  <UserPage {...props} />
);

export const UserPageEntry = Template.bind({});
UserPageEntry.args = {};
