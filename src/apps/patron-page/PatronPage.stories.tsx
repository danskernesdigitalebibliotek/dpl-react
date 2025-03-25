import type { Meta, StoryObj } from "@storybook/react";
import PatronPage from "./PatronPage.entry";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import pincodeArgs, {
  argTypes as pincodeArgTypes
} from "../../core/storybook/pincodeArgs";
import blockedArgs, {
  argTypes as blockedArgTypes
} from "../../core/storybook/blockedArgs";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";

const meta: Meta<typeof PatronPage> = {
  title: "Apps / Patron page",
  component: PatronPage,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type globalConfigArgTypes, serviceUrlArgTypes and globalTextArgTypes
  argTypes: {
    ...serviceUrlArgTypes,
    ...pincodeArgTypes,
    ...blockedArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    // Config
    pauseReservationStartDateConfig: {
      control: { type: "text" }
    },
    blacklistedPickupBranchesConfig: {
      control: { type: "text" }
    },
    branchesConfig: {
      control: { type: "text" }
    },
    deletePatronUrl: {
      control: { type: "text" }
    },
    pauseReservationInfoUrl: {
      control: { type: "text" }
    },
    textNotificationsEnabledConfig: {
      control: { type: "text" }
    },
    // Texts
    patronPageHeaderText: {
      control: { type: "text" }
    },
    pauseReservationModalHeaderText: {
      control: { type: "text" }
    },
    pauseReservationModalBodyText: {
      control: { type: "text" }
    },
    pauseReservationModalCloseModalText: {
      control: { type: "text" }
    },
    pauseReservationModalDateRangeLabelText: {
      control: { type: "text" }
    },
    pauseReservationModalDateRangePlaceholderText: {
      control: { type: "text" }
    },
    pauseReservationModalLinkText: {
      control: { type: "text" }
    },
    pauseReservationModalSaveButtonLabelText: {
      control: { type: "text" }
    },
    pauseReservationModalCancelButtonLabelText: {
      control: { type: "text" }
    },
    patronPageBasicDetailsHeaderText: {
      control: { type: "text" }
    },
    patronPageBasicDetailsNameLabelText: {
      control: { type: "text" }
    },
    patronPageBasicDetailsAddressLabelText: {
      control: { type: "text" }
    },
    patronContactInfoHeaderText: {
      control: { type: "text" }
    },
    patronContactPhoneLabelText: {
      control: { type: "text" }
    },
    patronContactPhoneCheckboxText: {
      control: { type: "text" }
    },
    patronContactEmailLabelText: {
      control: { type: "text" }
    },
    patronContactEmailCheckboxText: {
      control: { type: "text" }
    },
    patronPageStatusSectionHeaderText: {
      control: { type: "text" }
    },
    patronPageStatusSectionBodyText: {
      control: { type: "text" }
    },
    patronPageStatusSectionLoanHeaderText: {
      control: { type: "text" }
    },
    patronPageStatusSectionLoansEbooksText: {
      control: { type: "text" }
    },
    patronPageStatusSectionLoansAudioBooksText: {
      control: { type: "text" }
    },
    patronPageChangePickupHeaderText: {
      control: { type: "text" }
    },
    patronPageChangePickupBodyText: {
      control: { type: "text" }
    },
    pickupBranchesDropdownLabelText: {
      control: { type: "text" }
    },
    pickupBranchesDropdownNothingSelectedText: {
      control: { type: "text" }
    },
    patronPagePauseReservationsHeaderText: {
      control: { type: "text" }
    },
    patronPagePauseReservationsBodyText: {
      control: { type: "text" }
    },
    patronPageOpenPauseReservationsSectionText: {
      control: { type: "text" }
    },
    patronPageOpenPauseReservationsSectionAriaText: {
      control: { type: "text" }
    },
    patronPageChangePincodeHeaderText: {
      control: { type: "text" }
    },
    patronPageChangePincodeBodyText: {
      control: { type: "text" }
    },
    patronPinSavedSuccessText: {
      control: { type: "text" }
    },
    patronPagePincodeLabelText: {
      control: { type: "text" }
    },
    patronPageConfirmPincodeLabelText: {
      control: { type: "text" }
    },
    patronPagePincodeTooShortValidationText: {
      control: { type: "text" }
    },
    patronPagePincodesNotTheSameText: {
      control: { type: "text" }
    },
    patronPageSaveButtonText: {
      control: { type: "text" }
    },
    patronPageDeleteProfileText: {
      control: { type: "text" }
    },
    patronPageDeleteProfileLinkText: {
      control: { type: "text" }
    },
    patronPageStatusSectionReservationsText: {
      control: { type: "text" }
    },
    patronPageStatusSectionOutOfText: {
      control: { type: "text" }
    },
    patronPageStatusSectionOutOfAriaLabelAudioBooksText: {
      control: { type: "text" }
    },
    patronPageStatusSectionOutOfAriaLabelEbooksText: {
      control: { type: "text" }
    },
    patronPagePhoneInputMessageText: {
      description: "Phone input validation message",
      control: { type: "text" }
    },
    patronPageHandleResponseInformationText: {
      control: { type: "text" }
    },
    patronPageLoadingText: {
      description: "Loading",
      control: { type: "text" }
    }
  },
  args: {
    ...serviceUrlArgs,
    ...pincodeArgs,
    ...blockedArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    // Config
    pauseReservationStartDateConfig: "2022-06-30",
    blacklistedPickupBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    branchesConfig:
      '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]',
    deletePatronUrl:
      "https://images.unsplash.com/photo-1560888126-5c13ad3f9345?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80", // A goat.
    pauseReservationInfoUrl:
      "https://images.unsplash.com/photo-1560888126-5c13ad3f9345?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80", // A goat.
    textNotificationsEnabledConfig: "1",
    // Texts
    patronPageHeaderText: "Patron profile page",
    pauseReservationModalHeaderText: "Pause reservations on physical items",
    pauseReservationModalBodyText:
      "Pause your reservations early, since reservations that are already being processed, will not be paused.",
    pauseReservationModalCloseModalText: "Close pause reservations modal",
    pauseReservationModalDateRangeLabelText: "Pause period",
    pauseReservationModalDateRangePlaceholderText: "Choose pause period",
    pauseReservationModalLinkText:
      "Read more about pausing reservertions and what that means here",
    pauseReservationModalSaveButtonLabelText: "Save",
    pauseReservationModalCancelButtonLabelText: "Cancel pause",
    patronPageBasicDetailsHeaderText: "Basic details",
    patronPageBasicDetailsNameLabelText: "Name",
    patronPageBasicDetailsAddressLabelText: "Address",
    patronContactInfoHeaderText: "Contact information",
    patronContactPhoneLabelText: "Phone number",
    patronContactPhoneCheckboxText:
      "Receive text messages about your loans, reservations, and so forth. This may cost money.",
    patronContactEmailLabelText: "E-mail",
    patronContactEmailCheckboxText:
      "Receive emails about your loans, reservations, and so forth",
    patronPageStatusSectionHeaderText: "Digital loans",
    patronPageStatusSectionBodyText:
      "There is a number of materials without limitation to amounts of loans per month.",
    patronPageStatusSectionLoanHeaderText: "Loans per month",
    patronPageStatusSectionLoansEbooksText: "E-books",
    patronPageStatusSectionLoansAudioBooksText: "Audiobooks",
    patronPageChangePickupHeaderText: "Reservations",
    patronPageChangePickupBodyText: "Change pickup body text",
    pickupBranchesDropdownLabelText: "Choose pickup branch",
    pickupBranchesDropdownNothingSelectedText: "Nothing selected",
    patronPagePauseReservationsHeaderText: "Pause physical reservations",
    patronPagePauseReservationsBodyText:
      "Patron page pause reservations body text",
    patronPageOpenPauseReservationsSectionText: "Pause your reservations",
    patronPageOpenPauseReservationsSectionAriaText:
      "This checkbox opens a modal where you can put your current reservations on a pause, when the time period picked has ended, the reservations will be resumed",
    patronPageChangePincodeHeaderText: "Pincode",
    patronPageChangePincodeBodyText:
      "Change current pin by entering a new pin and saving",
    patronPinSavedSuccessText: "Pincode was saved",
    patronPagePincodeLabelText: "New pin",
    patronPageConfirmPincodeLabelText: "Confirm new pin",
    patronPagePincodeTooShortValidationText:
      "The pincode should be minimum @pincodeLengthMin and maximum @pincodeLengthMax characters long",
    patronPagePincodesNotTheSameText: "The pincodes are not the same",
    patronPageSaveButtonText: "Save",
    patronPageDeleteProfileText: "Do you wish to delete your library profile?",
    patronPageDeleteProfileLinkText: "Delete your profile",
    patronPageStatusSectionReservationsText:
      "You can reserve @countEbooks ebooks and @countAudiobooks audiobooks",
    patronPageStatusSectionOutOfText: "@this out of @that",
    patronPageStatusSectionOutOfAriaLabelAudioBooksText:
      "You used @this audiobooks out of you quota of @that audiobooks",
    patronPageStatusSectionOutOfAriaLabelEbooksText:
      "You used @this ebooks out of you quota of @that ebooks",
    patronPagePhoneInputMessageText:
      "The phone number must be 6 to 15 characters in length and should be comprised solely of numbers or begin with a +",
    patronPageHandleResponseInformationText: "Your changes are saved.",
    patronPageLoadingText: "Loading.."
  }
};

export default meta;

type Story = StoryObj<typeof PatronPage>;

export const PatronPageEntry: Story = {};
