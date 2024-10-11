import React, { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CreatePatron from "./CreatePatron.entry";
import pincodeArgs, {
  argTypes as pincodeArgTypes
} from "../../core/storybook/pincodeArgs";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";
import { TOKEN_UNREGISTERED_USER_KEY, setToken } from "../../core/token";

const meta: Meta<typeof CreatePatron> = {
  title: "Apps / Create patron",
  component: CreatePatron
};

export default meta;
type Story = StoryObj<typeof CreatePatron>;

export const Primary: Story = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type pincodeArgTypes, serviceUrlArgTypes and globalTextArgTypes
  argTypes: {
    ...pincodeArgTypes,
    ...serviceUrlArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    patronPageConfirmPincodeLabelText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Confirm new pin" }
      },
      control: { type: "text" }
    },
    patronContactNameLabelText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Name" }
      },
      control: { type: "text" }
    },
    patronPagePincodeTooShortValidationText: {
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary:
            "The pincode should be minimum @pincodeLengthMin and maximum @pincodeLengthMax characters long"
        }
      },
      control: { type: "text" }
    },
    patronPagePincodesNotTheSameText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "The pincodes are not the same" }
      },
      control: { type: "text" }
    },
    patronContactPhoneLabelText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Phone number" }
      },
      control: { type: "text" }
    },
    patronContactPhoneCheckboxText: {
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary:
            "Receive text messages about your loans, reservations, and so forth"
        }
      },
      control: { type: "text" }
    },
    patronContactEmailLabelText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "E-mail" }
      },
      control: { type: "text" }
    },
    patronContactEmailCheckboxText: {
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary: "Receive emails about your loans, reservations, and so forth"
        }
      },
      control: { type: "text" }
    },
    createPatronHeaderText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Register as patron" }
      },
      control: { type: "text" }
    },
    createPatronInvalidSsnHeaderText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Invalid SSN" }
      },
      control: { type: "text" }
    },
    createPatronInvalidSsnBodyText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "This SSN is invalid" }
      },
      control: { type: "text" }
    },
    redirectOnUserCreatedUrl: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "https://unsplash.com/photos/KRztl5I6xac" } // open source image of a dank fox
      },
      control: { type: "text" }
    },
    createPatronConfirmButtonText: {
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Confirm" }
      },
      control: { type: "text" }
    },
    phoneInputMessageText: {
      description: "Phone input validation message",
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary:
            "The phone number must be 6 to 15 characters in length and should be comprised solely of numbers or begin with a +"
        }
      },
      control: { type: "text" }
    },
    fakeCpr: {
      description: "Storybook context cpr",
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "0101901111" }
      },
      control: { type: "text" }
    },
    createPatronCancelButtonText: {
      description: "create patron cancel button text",
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Cancel" }
      },
      control: { type: "text" }
    },
    patronPagePhoneInputMessageText: {
      description: "patron page phone input message text",
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Phone number" }
      },
      control: { type: "text" }
    },
    createPatronButtonLoadingText: {
      description: "create patron button loading text",
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Loading" }
      },
      control: { type: "text" }
    },
    createPatronButtonErrorText: {
      description: "create patron button error text",
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Error occurred" }
      },
      control: { type: "text" }
    },
    createPatronBranchDropdownNoteText: {
      description: "create patron branch dropdown note text",
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary:
            "Choose preferred library for pickup of your future reservations."
        }
      },
      control: { type: "text" }
    },
    postRegisterRedirectInfoTopText: {
      description: "Redirect info top text",
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary:
            "You are now registered as a user and need to log in again to be able to use the application."
        }
      },
      control: { type: "text" }
    },
    postRegisterRedirectInfoBottomText: {
      description: "Redirect info bottom text",
      table: {
        type: { summary: "text" },
        defaultValue: {
          summary:
            "You will be sent to the Adgangsplatformen to log in again in @seconds seconds."
        }
      },
      control: { type: "text" }
    },
    postRegisterRedirectButtonText: {
      description: "Redirect button text",
      table: {
        type: { summary: "text" },
        defaultValue: { summary: "Log in again" }
      },
      control: { type: "text" }
    }
  },
  args: {
    ...serviceUrlArgs,
    ...pincodeArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    authUrl: "/login",
    logoutUrl: "/logout",
    blacklistedPickupBranchesConfig:
      "FBS-751032,FBS-751031,FBS-751009,FBS-751027,FBS-751024",
    minAgeConfig: "18",
    branchesConfig: `[{"branchId":"DK-775120","title":"Højbjerg"},{"branchId":"DK-775122","title":"Beder-Malling"},{"branchId":"DK-775144","title":"Gellerup"},{"branchId":"DK-775167","title":"Lystrup"},{"branchId":"DK-775146","title":"Harlev"},{"branchId":"DK-775168","title":"Skødstrup"},{"branchId":"FBS-751010","title":"Arresten"},{"branchId":"DK-775147","title":"Hasle"},{"branchId":"FBS-751032","title":"Må ikke benyttes"},{"branchId":"FBS-751031","title":"Fjernlager 1"},{"branchId":"DK-775126","title":"Solbjerg"},{"branchId":"FBS-751030","title":"ITK"},{"branchId":"DK-775149","title":"Sabro"},{"branchId":"DK-775127","title":"Tranbjerg"},{"branchId":"DK-775160","title":"Risskov"},{"branchId":"DK-775162","title":"Hjortshøj"},{"branchId":"DK-775140","title":"Åby"},{"branchId":"FBS-751009","title":"Fjernlager 2"},{"branchId":"FBS-751029","title":"Stadsarkivet"},{"branchId":"FBS-751027","title":"Intern"},{"branchId":"FBS-751026","title":"Fælles undervejs"},{"branchId":"FBS-751025","title":"Fællessekretariatet"},{"branchId":"DK-775133","title":"Bavnehøj"},{"branchId":"FBS-751024","title":"Fjernlånte materialer"},{"branchId":"DK-775100","title":"Hovedbiblioteket"},{"branchId":"DK-775170","title":"Trige"},{"branchId":"DK-775150","title":"Tilst"},{"branchId":"DK-775130","title":"Viby"},{"branchId":"DK-775164","title":"Egå"}]`,
    userinfoUrl: "https://login.bib.dk/userinfo",
    dashboardUrl: "/user/me/dashboard",
    agencyConfig: "999999",
    textNotificationsEnabledConfig: "1",
    pickupBranchesDropdownLabelText: "Choose pickup branch",
    patronPageChangePincodeHeaderText: "Pincode",
    pickupBranchesDropdownNothingSelectedText: "Nothing selected",
    patronPagePincodeLabelText: "New pin",
    patronPageConfirmPincodeLabelText: "Confirm new pin",
    patronContactNameLabelText: "Name",
    patronPagePincodeTooShortValidationText:
      "The pincode should be minimum @pincodeLengthMin and maximum @pincodeLengthMax characters long",
    patronPagePincodesNotTheSameText: "The pincodes are not the same",
    patronContactPhoneLabelText: "Phone number",
    patronContactPhoneCheckboxText:
      "Receive text messages about your loans, reservations, and so forth",
    patronContactEmailLabelText: "E-mail",
    patronContactEmailCheckboxText:
      "Receive emails about your loans, reservations, and so forth",
    createPatronHeaderText: "Register as patron",
    createPatronInvalidSsnHeaderText: "Invalid SSN",
    createPatronInvalidSsnBodyText: "This SSN is invalid",
    redirectOnUserCreatedUrl: "https://unsplash.com/photos/KRztl5I6xac", // open source image of a dank fox
    createPatronConfirmButtonText: "Confirm",
    phoneInputMessageText:
      "The phone number must be 6 to 15 characters in length and should be comprised solely of numbers or begin with a +",
    fakeCpr: "0101901111",
    createPatronCancelButtonText: "Cancel",
    patronPagePhoneInputMessageText: "Phone number",
    createPatronButtonLoadingText: "Loading",
    createPatronButtonErrorText: "Error occurred",
    createPatronBranchDropdownNoteText:
      "Choose preferred library for pickup of your future reservations.",
    postRegisterRedirectInfoTopText:
      "You are now registered as a user and need to log in again to be able to use the application.",
    postRegisterRedirectInfoBottomText:
      "You will be sent to the Adgangsplatformen to log in again in @seconds seconds.",
    postRegisterRedirectButtonText: "Log in again"
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        setToken(TOKEN_UNREGISTERED_USER_KEY, "123456");
      }, []);
      return <Story />;
    }
  ]
};
