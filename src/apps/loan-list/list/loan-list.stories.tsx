import type { Meta, StoryObj } from "@storybook/react-webpack5";
import LoanList from "./loan-list.entry";
import { getModalIds } from "../../../core/utils/helpers/modal-helpers";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../../core/storybook/serviceUrlArgs";
import groupModalArgs, {
  argTypes as groupModalArgTypes
} from "../../../core/storybook/groupModalArgs";
import loanGroupModalArgs, {
  argTypes as loanGroupModalArgTypes
} from "../../../core/storybook/loanGroupModalArgs";
import renewalArgs, {
  argTypes as renewalArgTypes
} from "../../../core/storybook/renewalArgs";
import materialDetailsModalArgs, {
  argTypes as materialDetailsModalArgTypes
} from "../../../core/storybook/materialDetailsModalArgs";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../../core/storybook/globalConfigArgs";
import blockedArgs, {
  argTypes as blockedArgTypes
} from "../../../core/storybook/blockedArgs";

const meta: Meta<typeof LoanList> = {
  title: "Apps / Loan list",
  component: LoanList,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type this
  argTypes: {
    ...serviceUrlArgTypes,
    ...groupModalArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    ...loanGroupModalArgTypes,
    ...renewalArgTypes,
    ...materialDetailsModalArgTypes,
    ...blockedArgTypes,
    // Config
    pageSizeDesktop: {
      control: { type: "number" }
    },
    pageSizeMobile: {
      control: { type: "number" }
    },
    // Config
    expirationWarningDaysBeforeConfig: {
      control: { type: "text" }
    },
    // Texts
    loanListAriaLabelListButtonText: {
      control: { type: "text" }
    },
    loanListAriaLabelStackButtonText: {
      control: { type: "text" }
    },
    loanListDigitalLoansEmptyListText: {
      control: { type: "text" }
    },
    loanListDigitalLoansTitleText: {
      control: { type: "text" }
    },
    loanListDigitalPhysicalLoansEmptyListText: {
      control: { type: "text" }
    },
    loanListDueDateModalAriaLabelText: {
      control: { type: "text" }
    },
    loanListMaterialLateFeeText: {
      control: { type: "text" }
    },
    loanListMaterialDaysText: {
      control: { type: "text" }
    },
    loanListMaterialDayText: {
      control: { type: "text" }
    },
    loanListAdditionalMaterialsText: {
      control: { type: "text" }
    },
    loanListPhysicalLoansEmptyListText: {
      control: { type: "text" }
    },
    loanListPhysicalLoansTitleText: {
      control: { type: "text" }
    },
    loanListRenewMultipleButtonExplanationText: {
      control: { type: "text" }
    },
    loanListRenewMultipleButtonText: {
      control: { type: "text" }
    },
    loanListNoItemsCanBeRenewedText: {
      control: { type: "text" }
    },
    loanListStatusBadgeDangerText: {
      control: { type: "text" }
    },
    loanListStatusBadgeWarningText: {
      control: { type: "text" }
    },
    loanListStatusCircleAriaLabelText: {
      control: { type: "text" }
    },
    loanListTitleText: {
      control: { type: "text" }
    },
    loanListToBeDeliveredDigitalMaterialText: {
      control: { type: "text" }
    },
    loanListToBeDeliveredText: {
      control: { type: "text" }
    },
    etAlText: {
      control: { type: "text" }
    },
    materialByAuthorText: {
      control: { type: "text" }
    },
    materialAndAuthorText: {
      control: { type: "text" }
    },
    publizonAudioBookText: {
      control: { type: "text" }
    },
    publizonEbookText: {
      control: { type: "text" }
    },
    publizonPodcastText: {
      control: { type: "text" }
    },
    groupModalHeaderText: {
      control: { type: "text" }
    },
    resultPagerStatusText: {
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof LoanList>;

export const Primary: Story = {
  args: {
    ...serviceUrlArgs,
    ...groupModalArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    ...loanGroupModalArgs,
    ...renewalArgs,
    ...materialDetailsModalArgs,
    ...blockedArgs,
    pageSizeDesktop: 10,
    pageSizeMobile: 5,
    // Config
    expirationWarningDaysBeforeConfig: "6",
    // Texts
    loanListAriaLabelListButtonText: "This button shows all loans in the list",
    loanListAriaLabelStackButtonText:
      "This button filters the list, so only one the materials that have the same due date is shown",
    loanListDigitalLoansEmptyListText:
      "You have no digital loans at the moment",
    loanListDigitalLoansTitleText: "Digital loans",
    loanListDigitalPhysicalLoansEmptyListText: "You have 0 loans at the moment",
    loanListDueDateModalAriaLabelText:
      "This button opens a modal that covers the entire page and contains loans with the same due date as the loan currently in focus",
    loanListMaterialLateFeeText:
      "You will be charged a fee, when the item is returned",
    loanListMaterialDaysText: "days",
    loanListMaterialDayText: "day",
    loanListAdditionalMaterialsText:
      '{"type":"plural","text":["+ 1 other material","+ @count other materials"]}',
    loanListPhysicalLoansEmptyListText:
      "You have no physical loans at the moment",
    loanListPhysicalLoansTitleText: "Physical loans",
    loanListRenewMultipleButtonExplanationText:
      "This button opens a modal that covers the entire page and contains loans with different due dates, if some of the loans in the modal are renewable you can renew them",
    loanListRenewMultipleButtonText: "Renew several",
    loanListNoItemsCanBeRenewedText: "No materials can be renewed",
    loanListStatusBadgeDangerText: "Expired",
    loanListStatusBadgeWarningText: "Expiring soon",
    loanListStatusCircleAriaLabelText:
      '{"type":"plural","text":["This material is due in one day","This material is due in @count days"]}',
    loanListTitleText: "Your loans",
    loanListToBeDeliveredDigitalMaterialText: "Due date @date",
    loanListToBeDeliveredText: "Due date @date",
    etAlText: "et al.",
    materialByAuthorText: "By",
    materialAndAuthorText: "and",
    publizonAudioBookText: "Audiobook",
    publizonEbookText: "E-book",
    publizonPodcastText: "Podcast",
    groupModalHeaderText: "Renew several",
    resultPagerStatusText: "Showing @itemsShown out of @hitcount loans"
  }
};

const { dueDateModal, loanDetails, allLoansId } = getModalIds();

export const LoanListDetailsModal: Story = {
  parameters: {
    query: {
      modal: `${loanDetails}9562505082`
    }
  },
  args: {
    ...Primary.args
  }
};

export const LoanListDueDateModal: Story = {
  parameters: {
    query: {
      modal: `${dueDateModal}2022-12-15`
    }
  },
  args: {
    ...Primary.args
  }
};

export const LoanListRenewLoansModal: Story = {
  parameters: {
    query: {
      modal: allLoansId
    }
  },
  args: {
    ...Primary.args
  }
};
