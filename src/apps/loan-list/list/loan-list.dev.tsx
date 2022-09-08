import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import LoanList from "./loan-list.entry";
import modalIdsConf from "../../../core/configuration/modal-ids.json";

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
    loanListToBeDeliveredText: {
      defaultValue: "Afleveres",
      control: { type: "text" }
    },
    loanListMaterialsDesktopText: {
      defaultValue: "andre materialer",
      control: { type: "text" }
    },
    loanListMaterialsMobileText: {
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
    loanListDeniedMaxRenewalsReachedText: {
      defaultValue: "Materialet kan ikke fornyes flere gange",
      control: { type: "text" }
    },
    loanListDeniedOtherReasonText: {
      defaultValue: "Materialet er reserveret af andre",
      control: { type: "text" }
    },
    loanListDeniedInterLibraryLoanText: {
      defaultValue:
        "Materialet er udlånt fra en anden kommune og fornyelsen er derfor betinget af et andet biblioteks accept",
      control: { type: "text" }
    },
    loanListToBeDeliveredMaterialText: {
      defaultValue: "Afleveres",
      control: { type: "text" }
    },
    loanListLabelCheckboxMaterialModalText: {
      defaultValue: "Vælg element til fornyelse",
      control: { type: "text" }
    },

    loanListMaterialByAuthorText: {
      defaultValue: "Af",
      control: { type: "text" }
    },
    loanModalMaterialByAuthorText: {
      defaultValue: "Af",
      control: { type: "text" }
    },
    materialDetailsByAuthorText: {
      defaultValue: "Af",
      control: { type: "text" }
    },
    loanListMaterialAndAuthorText: {
      defaultValue: "og",
      control: { type: "text" }
    },
    loanModalMaterialAndAuthorText: {
      defaultValue: "og",
      control: { type: "text" }
    },
    materialDetailsAndAuthorText: {
      defaultValue: "og",
      control: { type: "text" }
    },
    dueDateRenewLoanModalHeaderText: {
      defaultValue: "Afleveres",
      control: { type: "text" }
    },
    renewLoanModalHeaderText: {
      defaultValue: "Forny flere",
      control: { type: "text" }
    },
    renewLoanModalCloseModalText: {
      defaultValue: "Luk forny lån modal",
      control: { type: "text" }
    },
    dueDateRenewLoanCloseModalText: {
      defaultValue: "Luk forny lån modal",
      control: { type: "text" }
    },
    materialDetailsCloseModalText: {
      defaultValue: "Luk materialedetalje modal",
      control: { type: "text" }
    },
    renewLoanModalDescriptionText: {
      defaultValue: "Denne modal gør det muligt at forny lån",
      control: { type: "text" }
    },
    dueDateRenewLoanModalDescriptionText: {
      defaultValue:
        "Denne modal grupperer lån efter afleveringsdato og gør det muligt at forny lån",
      control: { type: "text" }
    },
    materialDetailsModalDescriptionText: {
      defaultValue:
        "Denne modal viser et materiales detaljer og gør det muligt at forny materialet, hvis det kan fornyes",
      control: { type: "text" }
    },
    materialDetailsOverdueText: {
      defaultValue: "Overskredet",
      control: { type: "text" }
    },
    materialDetailsRenewLoanButtonText: {
      defaultValue: "forny dit lån",
      control: { type: "text" }
    },
    materialDetailsWarningLoanOverdueText: {
      defaultValue:
        "Afleveringsdatoen for lånet er overskredet, derfor pålægges du et gebyr, når materialet afleveres",
      control: { type: "text" }
    },
    materialDetailsLinkToPageWithFeesText: {
      defaultValue: "Læs mere",
      control: { type: "text" }
    },
    dueDateWarningLoanOverdueText: {
      defaultValue:
        "Afleveringsdatoen for lånet er overskredet, derfor pålægges du et gebyr, når materialet afleveres",
      control: { type: "text" }
    },
    dueDateLinkToPageWithFeesText: {
      defaultValue: "Læs mere",
      control: { type: "text" }
    },
    materialDetailsHandInLabelText: {
      defaultValue: "Afleveres",
      control: { type: "text" }
    },
    materialDetailsLoanDateLabelText: {
      defaultValue: "Udlånsdato",
      control: { type: "text" }
    },
    materialDetailsMaterialNumberLabelText: {
      defaultValue: "Materialenummer",
      control: { type: "text" }
    },
    loanListEmptyPhysicalLoansText: {
      defaultValue: "Du har i øjeblikket ingen fysiske lån",
      control: { type: "text" }
    },
    renewLoanModalCheckboxText: {
      defaultValue: "Vælg alle med mulighed for fornyelse",
      control: { type: "text" }
    },
    dueDateRenewLoanModalCheckboxText: {
      defaultValue: "Vælg alle med mulighed for fornyelse",
      control: { type: "text" }
    },
    bottomRenewLoanModalCheckboxText: {
      defaultValue: "Vælg alle med mulighed for fornyelse",
      control: { type: "text" }
    },
    bottomDueDateRenewLoanModalCheckboxText: {
      defaultValue: "Vælg alle med mulighed for fornyelse",
      control: { type: "text" }
    },
    renewLoanModalButtonText: {
      defaultValue: "Forny mulige",
      control: { type: "text" }
    },
    dueDateRenewLoanModalButtonText: {
      defaultValue: "Forny mulige",
      control: { type: "text" }
    },
    bottomRenewLoanModalButtonText: {
      defaultValue: "Forny mulige",
      control: { type: "text" }
    },
    bottomDueDateRenewLoanModalButtonText: {
      defaultValue: "Forny mulige",
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

export const LoanListRenewLoansModal = Template.bind({});
LoanListRenewLoansModal.parameters = {
  query: {
    modal: modalIdsConf.allLoansId
  }
};
