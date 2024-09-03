import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import CreatePatron from "./CreatePatron.entry";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import pincodeArgs from "../../core/storybook/pincodeArgs";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";
import { TOKEN_UNREGISTERED_USER_KEY, setToken } from "../../core/token";

export default {
  title: "Apps / Create patron",
  component: CreatePatron,
  argTypes: {
    ...serviceUrlArgs,
    ...pincodeArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    authUrl: {
      name: "Url where user can authenticate",
      defaultValue: "/login",
      control: { type: "text" }
    },
    logoutUrl: {
      name: "Url where user can logout",
      defaultValue: "/logout",
      control: { type: "text" }
    },
    blacklistedPickupBranchesConfig: {
      defaultValue: "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
      control: { type: "text" }
    },
    minAgeConfig: {
      defaultValue: "18",
      control: { type: "text" }
    },
    branchesConfig: {
      defaultValue:
        '[\n   {\n      "branchId":"DK-775120",\n      "title":"Højbjerg"\n   },\n   {\n      "branchId":"DK-775122",\n      "title":"Beder-Malling"\n   },\n   {\n      "branchId":"DK-775144",\n      "title":"Gellerup"\n   },\n   {\n      "branchId":"DK-775167",\n      "title":"Lystrup"\n   },\n   {\n      "branchId":"DK-775146",\n      "title":"Harlev"\n   },\n   {\n      "branchId":"DK-775168",\n      "title":"Skødstrup"\n   },\n   {\n      "branchId":"FBS-751010",\n      "title":"Arresten"\n   },\n   {\n      "branchId":"DK-775147",\n      "title":"Hasle"\n   },\n   {\n      "branchId":"FBS-751032",\n      "title":"Må ikke benyttes"\n   },\n   {\n      "branchId":"FBS-751031",\n      "title":"Fjernlager 1"\n   },\n   {\n      "branchId":"DK-775126",\n      "title":"Solbjerg"\n   },\n   {\n      "branchId":"FBS-751030",\n      "title":"ITK"\n   },\n   {\n      "branchId":"DK-775149",\n      "title":"Sabro"\n   },\n   {\n      "branchId":"DK-775127",\n      "title":"Tranbjerg"\n   },\n   {\n      "branchId":"DK-775160",\n      "title":"Risskov"\n   },\n   {\n      "branchId":"DK-775162",\n      "title":"Hjortshøj"\n   },\n   {\n      "branchId":"DK-775140",\n      "title":"Åby"\n   },\n   {\n      "branchId":"FBS-751009",\n      "title":"Fjernlager 2"\n   },\n   {\n      "branchId":"FBS-751029",\n      "title":"Stadsarkivet"\n   },\n   {\n      "branchId":"FBS-751027",\n      "title":"Intern"\n   },\n   {\n      "branchId":"FBS-751026",\n      "title":"Fælles undervejs"\n   },\n   {\n      "branchId":"FBS-751025",\n      "title":"Fællessekretariatet"\n   },\n   {\n      "branchId":"DK-775133",\n      "title":"Bavnehøj"\n   },\n   {\n      "branchId":"FBS-751024",\n      "title":"Fjernlånte materialer"\n   },\n   {\n      "branchId":"DK-775100",\n      "title":"Hovedbiblioteket"\n   },\n   {\n      "branchId":"DK-775170",\n      "title":"Trige"\n   },\n   {\n      "branchId":"DK-775150",\n      "title":"Tilst"\n   },\n   {\n      "branchId":"DK-775130",\n      "title":"Viby"\n   },\n   {\n      "branchId":"DK-775164",\n      "title":"Egå"\n   }\n]',
      control: { type: "text" }
    },
    userinfoUrl: {
      defaultValue: "https://login.bib.dk/userinfo",
      control: { type: "text" }
    },
    dashboardUrl: {
      defaultValue: "/user/me/dashboard",
      control: { type: "text" }
    },
    agencyConfig: {
      defaultValue: '{ "id": "999999" }',
      control: { type: "text" }
    },
    textNotificationsEnabledConfig: {
      defaultValue: "1",
      control: { type: "text" }
    },
    // Texts
    pickupBranchesDropdownLabelText: {
      defaultValue: "Choose pickup branch",
      control: { type: "text" }
    },
    patronPageChangePincodeHeaderText: {
      defaultValue: "Pincode",
      control: { type: "text" }
    },
    pickupBranchesDropdownNothingSelectedText: {
      defaultValue: "Nothing selected",
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
    patronContactNameLabelText: {
      defaultValue: "Name",
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
    patronContactPhoneLabelText: {
      defaultValue: "Phone number",
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
    createPatronHeaderText: {
      defaultValue: "Register as patron",
      control: { type: "text" }
    },
    createPatronInvalidSsnHeaderText: {
      defaultValue: "Invalid SSN",
      control: { type: "text" }
    },
    createPatronInvalidSsnBodyText: {
      defaultValue: "This SSN is invalid",
      control: { type: "text" }
    },
    redirectOnUserCreatedUrl: {
      defaultValue: "https://unsplash.com/photos/KRztl5I6xac", // open source image of a dank fox
      control: { type: "text" }
    },
    createPatronConfirmButtonText: {
      defaultValue: "Confirm",
      control: { type: "text" }
    },
    phoneInputMessageText: {
      name: "Phone input validation message",
      defaultValue:
        "The phone number must be 6 to 15 characters in length and should be comprised solely of numbers or begin with a +",
      control: { type: "text" }
    },
    fakeCpr: {
      name: "Storybook context cpr",
      defaultValue: "0101901111",
      control: { type: "text" }
    },
    createPatronCancelButtonText: {
      name: "create patron cancel button text",
      defaultValue: "Cancel",
      control: { type: "text" }
    },
    patronPagePhoneInputMessageText: {
      name: "patron page phone input message text",
      defaultValue: "Phone number",
      control: { type: "text" }
    },
    createPatronButtonLoadingText: {
      name: "create patron button loading text",
      defaultValue: "Loading",
      control: { type: "text" }
    },
    createPatronButtonErrorText: {
      name: "create patron button error text",
      defaultValue: "Error occurred",
      control: { type: "text" }
    },
    createPatronBranchDropdownNoteText: {
      name: "create patron branch dropdown note text",
      defaultValue:
        "Choose preferred library for pickup of your future reservations.",
      control: { type: "text" }
    },
    postRegisterRedirectInfoTopText: {
      name: "Redirect info top text",
      defaultValue:
        "You are now registered as a user and need to log in again to be able to use the application.",
      control: { type: "text" }
    },
    postRegisterRedirectInfoBottomText: {
      name: "Redirect info bottom text",
      defaultValue:
        "You will be sent to the Adgangsplatformen to log in again in @seconds seconds.",
      control: { type: "text" }
    },
    postRegisterRedirectButtonText: {
      name: "Redirect button text",
      defaultValue: "Log in again",
      control: { type: "text" }
    }
  }
} as Meta<typeof CreatePatron>;

const Template: StoryFn<typeof CreatePatron> = (props) => {
  setToken(TOKEN_UNREGISTERED_USER_KEY, "123456");
  return <CreatePatron {...props} />;
};

export const CreatePatronEntry = Template.bind({});
CreatePatronEntry.args = {};
