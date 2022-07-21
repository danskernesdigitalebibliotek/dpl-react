import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import LoanList from "./loan-list.entry";


export default {
  title: "Apps / Loan list",
  component: LoanList,
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
      defaultValue: "Afleveres",
      control: { type: "text" }
    },
    LoanListLabelCheckboxMaterialModalText: {
      defaultValue: "Vælg element til fornyelse",
      control: { type: "text" }
    },
    LoanListCloseModalText: {
      defaultValue: "Luk forny lån modal",
      control: { type: "text" }
    },
    LoanListModalDescriptionText: {
      defaultValue:
        "Denne modal grupperer lån efter afleveringsdato og gør det muligt at forny lån",
      control: { type: "text" }
    },
    MaterialDetailsModalOverdueText: {
      defaultValue: "Overskredet",
      control: { type: "text" }
    },
    MaterialDetailsModalByAuthorText: {
      defaultValue: "Af",
      control: { type: "text" }
    },
    MaterialDetailsModalAndAuthorText: {
      defaultValue: "og",
      control: { type: "text" }
    },
    LoanListEmptyPhysicalLoansText: {
      defaultValue: "Du har i øjeblikket ingen fysiske lån",
      control: { type: "text" }
    }
  },
  decorators: [withQuery]
} as ComponentMeta<typeof LoanList>;

const Template: ComponentStory<typeof LoanList> = (props) => (
  <LoanList {...props} />
);

export const LoanListEntry = Template.bind({});
LoanListEntry.args = {};

export const LoanListDetailsModal = Template.bind({});
LoanListDetailsModal.parameters = {
  query: {
    modal: "28847238"
  }
};

export const LoanListDueDateModal = Template.bind({});
LoanListDueDateModal.parameters = {
  query: {
    modal: "2022-07-14"
  }
};
