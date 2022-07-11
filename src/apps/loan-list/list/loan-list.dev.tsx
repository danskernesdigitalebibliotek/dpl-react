import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import LoanList, { LoanListEntryProps } from "./loan-list.entry";

export default {
  title: "Apps / Loan list",
  component: LoanList,
  parameters: {},
  argTypes: {
    loanListTitleText: {
      defaultValue: "Dine lånte materialer",
      control: { type: "text" }
    },
    loanListPhysicalLoansTitleText: {
      defaultValue: "Fysiske lån",
      control: { type: "text" }
    },
    loanListListText: {
      defaultValue: "Liste aria text",
      control: { type: "text" }
    },
    loanListStackText: {
      defaultValue: "Stack aria text",
      control: { type: "text" }
    },
    loanListRenewMultipleButtonExplanationText: {
      defaultValue: "Denne knap åbner en modal",
      control: { type: "text" }
    },
    loanListRenewMultipleButtonText: {
      defaultValue: "Forny flere",
      control: { type: "text" }
    },
    loanListMaterialByAuthorText: {
      defaultValue: "Af",
      control: { type: "text" }
    },
    loanListMaterialAndAuthorText: {
      defaultValue: "og",
      control: { type: "text" }
    },
    loanListLateFeeDesktopText: {
      defaultValue: "Du pålægges et gebyr, når materialet afleveres",
      control: { type: "text" }
    },
    loanListLateFeeMobileText: {
      defaultValue: "Du pålægges et gebyr, når materialet afleveres",
      control: { type: "text" }
    },
    loanListDaysText: {
      defaultValue: "dage",
      control: { type: "text" }
    },
    LoanListToBeDeliveredText: {
      defaultValue: "Afleveres",
      control: { type: "text" }
    },
    LoanListMaterialsDesktopText: {
      defaultValue: "andre materialer",
      control: { type: "text" }
    },
    LoanListMaterialsMobileText: {
      defaultValue: "andre materialer",
      control: { type: "text" }
    },
    loanListMaterialsModalDesktopText: {
      defaultValue:
        "Denne knap åbner en modal der dækker hele vinduet og der viser de lån der har den pågældende udlånsdato",
      control: { type: "text" }
    },
    loanListMaterialsModalMobileText: {
      defaultValue:
        "Denne knap åbner en modal der dækker hele vinduet og der viser de lån der har den pågældende udlånsdato",
      control: { type: "text" }
    },
    loanListToBeDeliveredModalText: {
      defaultValue: "Afleveres",
      control: { type: "text" }
    },
    loanListStatusCircleAriaLabelText: {
      defaultValue: "Dette materiale skal afleveres om {number} dage", // todo number?
      control: { type: "text" }
    },
    loanListStatusBadgeDangerText: {
      defaultValue: "Overskredet",
      control: { type: "text" }
    },
    loanListStatusBadgeWarningText: {
      defaultValue: "Udløber snart",
      control: { type: "text" }
    },
    loanListRenewPossibleText: {
      defaultValue: "Forny mulige",
      control: { type: "text" }
    },
    loanListSelectPossibleCheckboxText: {
      defaultValue: "Vælg alle med mulighed for fornyelse",
      control: { type: "text" }
    },
    LoanListDeniedMaxRenewalsReachedText: {
      defaultValue: "Materialet kan ikke fornyes flere gange",
      control: { type: "text" }
    },
    LoanListDeniedOtherReasonText: {
      defaultValue: "Materialet er reserveret af andre",
      control: { type: "text" }
    },
    LoanListDeniedInterLibraryLoanText: {
      defaultValue:
        "Materialet er udlånt fra en anden kommune og fornyelsen er derfor betinget af et andet biblioteks accept",
      control: { type: "text" }
    },
    LoanListToBeDeliveredMaterialText: {
      defaultValue:
        "Afleveres",
      control: { type: "text" }
    }
  },
  decorators: [withQuery]
} as ComponentMeta<typeof LoanList>;

export const LoanListEntry: ComponentStory<typeof LoanList> = (
  args: LoanListEntryProps
) => <LoanList {...args} />;
