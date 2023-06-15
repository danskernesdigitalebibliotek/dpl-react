import { withQuery } from "@storybook/addon-queryparams";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../../core/storybook/serviceUrlArgs";
import blockedArgs from "../../../core/storybook/blockedArgs";
import { getModalIds } from "../../../core/utils/helpers/general";
import LoanList from "./loan-list.entry";
import groupModalArgs from "../../../core/storybook/groupModalArgs";
import loanGroupModalArgs from "../../../core/storybook/loanGroupModalArgs";
import materialDetailsModalArgs from "../../../core/storybook/materialDetailsModalArgs";

export default {
  title: "Apps / Loan list",
  component: LoanList,
  argTypes: {
    ...serviceUrlArgs,
    ...groupModalArgs,
    ...loanGroupModalArgs,
    ...materialDetailsModalArgs,
    ...blockedArgs,
    // Config
    materialOverdueUrl: {
      defaultValue: "https://unsplash.com/photos/wd6YQy0PJt8", // open source image of a red panda
      control: { type: "text" }
    },
    pageSizeDesktop: {
      defaultValue: 10,
      control: { type: "number" }
    },
    pageSizeMobile: {
      defaultValue: 5,
      control: { type: "number" }
    },
    // Config
    thresholdConfig: {
      defaultValue:
        '{\n      "colorThresholds":{\n      "danger":"0",\n      "warning":"6"\n   }\n   }',
      control: { type: "text" }
    },
    // Texts
    loanListAriaLabelListButtonText: {
      control: {
        type: "text"
      },
      defaultValue: "This button shows all loans in the list"
    },
    loanListAriaLabelStackButtonText: {
      control: {
        type: "text"
      },
      defaultValue:
        "This button filters the list, so only one the materials that have the same due date is shown"
    },
    loanListDigitalLoansEmptyListText: {
      control: {
        type: "text"
      },
      defaultValue: "You have no digital loans at the moment"
    },
    loanListDigitalLoansTitleText: {
      control: {
        type: "text"
      },
      defaultValue: "Digital loans"
    },
    loanListDigitalPhysicalLoansEmptyListText: {
      control: {
        type: "text"
      },
      defaultValue: "You have 0 loans at the moment"
    },
    loanListDueDateModalAriaLabelText: {
      control: {
        type: "text"
      },
      defaultValue:
        "This button opens a modal that covers the entire page and contains loans with the same due date as the loan currently in focus"
    },
    loanListMaterialLateFeeText: {
      control: {
        type: "text"
      },
      defaultValue: "You will be charged a fee, when the item is returned"
    },
    loanListMaterialDaysText: {
      control: {
        type: "text"
      },
      defaultValue: "days"
    },
    loanListMaterialDayText: {
      control: {
        type: "text"
      },
      defaultValue: "day"
    },
    loanListAdditionalMaterialsText: {
      control: {
        type: "text"
      },
      defaultValue:
        '{"type":"plural","text":["+ 1 other material","+ @count other materials"]}'
    },
    loanListPhysicalLoansEmptyListText: {
      control: {
        type: "text"
      },
      defaultValue: "You have no physical loans at the moment"
    },
    loanListPhysicalLoansTitleText: {
      control: {
        type: "text"
      },
      defaultValue: "Physical loans"
    },
    loanListRenewMultipleButtonExplanationText: {
      control: {
        type: "text"
      },
      defaultValue:
        "This button opens a modal that covers the entire page and contains loans with different due dates, if some of the loans in the modal are renewable you can renew them"
    },
    loanListRenewMultipleButtonText: {
      control: {
        type: "text"
      },
      defaultValue: "Renew several"
    },
    loanListStatusBadgeDangerText: {
      control: {
        type: "text"
      },
      defaultValue: "Expired"
    },
    loanListStatusBadgeWarningText: {
      control: {
        type: "text"
      },
      defaultValue: "Expiring soon"
    },
    loanListStatusCircleAriaLabelText: {
      control: {
        type: "text"
      },
      defaultValue:
        '{"type":"plural","text":["This material is due in one day","This material is due in @count days"]}'
    },
    loanListTitleText: {
      control: {
        type: "text"
      },
      defaultValue: "Your loans"
    },
    loanListToBeDeliveredDigitalMaterialText: {
      control: {
        type: "text"
      },
      defaultValue: "Due date @date"
    },
    loanListToBeDeliveredText: {
      control: {
        type: "text"
      },
      defaultValue: "Due date @date"
    },
    etAlText: {
      control: {
        type: "text"
      },
      defaultValue: "et al."
    },
    materialByAuthorText: {
      control: {
        type: "text"
      },
      defaultValue: "By"
    },
    materialAndAuthorText: {
      control: {
        type: "text"
      },
      defaultValue: "and"
    },
    publizonAudioBookText: {
      control: {
        type: "text"
      },
      defaultValue: "Audiobook"
    },
    publizonEbookText: {
      control: {
        type: "text"
      },
      defaultValue: "E-book"
    },
    publizonPodcastText: {
      control: {
        type: "text"
      },
      defaultValue: "Podcast"
    },
    groupModalHeaderText: {
      control: {
        type: "text"
      },
      defaultValue: "Renew several"
    },
    resultPagerStatusText: {
      defaultValue: "Showing @itemsShown out of @hitcount loans",
      control: { type: "text" }
    },
    groupModalGoToMaterialAriaLabelText: {
      defaultValue: "Go to @label material details",
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
const { dueDateModal, loanDetails, allLoansId } = getModalIds();
export const LoanListDetailsModal = Template.bind({});
LoanListDetailsModal.parameters = {
  query: {
    modal: `${loanDetails}956250508`
  }
};

export const LoanListDueDateModal = Template.bind({});
LoanListDueDateModal.parameters = {
  query: {
    modal: `${dueDateModal}2022-12-15`
  }
};

export const LoanListRenewLoansModal = Template.bind({});
LoanListRenewLoansModal.parameters = {
  query: {
    modal: allLoansId
  }
};
