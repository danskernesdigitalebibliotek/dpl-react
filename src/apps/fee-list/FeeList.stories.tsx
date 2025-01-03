import type { Meta, StoryObj } from "@storybook/react";
import blockedArgs, {
  argTypes as blockedArgTypes
} from "../../core/storybook/blockedArgs";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import FeeList from "./FeeList.entry";
import { getModalIds } from "../../core/utils/helpers/modal-helpers";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";
import groupModalArgs, {
  argTypes as groupModalArgTypes
} from "../../core/storybook/groupModalArgs";
import groupModalLoansArgs, {
  argTypes as groupModalLoansArgTypes
} from "../../core/storybook/loanGroupModalArgs";
import materialDetailsModalArgs, {
  argTypes as materialDetailsModalArgTypes
} from "../../core/storybook/materialDetailsModalArgs";
import renewalArgs, {
  argTypes as renewalArgTypes
} from "../../core/storybook/renewalArgs";

const meta: Meta<typeof FeeList> = {
  title: "Apps / Fee list",
  component: FeeList,

  // @ts-ignore: can't figure out how to type this
  argTypes: {
    ...serviceUrlArgTypes,
    ...blockedArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    ...groupModalArgTypes,
    ...groupModalLoansArgTypes,
    ...materialDetailsModalArgTypes,
    ...renewalArgTypes,
    feeListHeadlineText: {
      control: { type: "text" }
    },
    feeListBodyText: {
      control: { type: "text" }
    },
    viewFeesAndCompensationRatesText: {
      control: { type: "text" }
    },
    etAlText: {
      control: { type: "text" }
    },
    totalFeeAmountText: {
      control: { type: "text" }
    },
    otherMaterialsText: {
      control: { type: "text" }
    },
    materialByAuthorText: {
      control: { type: "text" }
    },
    materialAndAuthorText: {
      control: { type: "text" }
    },
    feeListDaysText: {
      control: { type: "text" }
    },
    payText: {
      control: { type: "text" }
    },
    totalText: {
      control: { type: "text" }
    },
    expirationWarningDaysBeforeConfig: {
      control: { type: "text" }
    },
    iAcceptText: {
      control: { type: "text" }
    },
    termsOfTradeText: {
      control: { type: "text" }
    },
    unpaidFeesPayableByClientHeadlineText: {
      control: { type: "text" }
    },
    unpaidFeesNotPayableByClientHeadlineText: {
      control: { type: "text" }
    },
    alreadyPaidText: {
      control: { type: "text" }
    },
    feePaymentModalHeaderText: {
      control: { type: "text" }
    },
    feePaymentModalBodyText: {
      control: { type: "text" }
    },
    feePaymentModalNoticeText: {
      control: { type: "text" }
    },
    feePaymentModalGotoText: {
      control: { type: "text" }
    },
    feePaymentModalCancelText: {
      control: { type: "text" }
    },
    feeDetailsModalScreenReaderText: {
      control: { type: "text" }
    },
    emptyFeeListText: {
      control: { type: "text" }
    },
    feeDetailsModalCloseModalAriaLabelText: {
      control: { type: "text" }
    },
    feeDetailsModalDescriptionText: {
      control: { type: "text" }
    },
    turnedInText: {
      control: { type: "text" }
    },
    plusXOtherMaterialsText: {
      control: { type: "text" }
    },
    itemFeeAmountText: {
      control: { type: "text" }
    },
    feeCreatedText: {
      control: { type: "text" }
    },
    feeListAlreadyPaidInfoText: {
      control: { type: "text" }
    },
    feeListAlreadyPaidSecondInfoText: {
      control: { type: "text" }
    },
    feeListMaterialNumberText: {
      control: { type: "text" }
    },
    feeListConfig: {
      control: { type: "text" }
    },
    feeListYouHaveOverdueLoansText: {
      control: { type: "text" }
    },
    feeListSeeYourOverdueLoansText: {
      control: { type: "text" }
    },
    feeListSeeYourOverdueLoansAriaText: {
      control: { type: "text" }
    },
    loansOverdueText: {
      control: { type: "text" }
    },
    // Urls
    physicalLoansUrl: {
      control: { type: "text" }
    },
    feeListPaymentSiteUrl: {
      control: { type: "text" }
    },
    availablePaymentTypesUrl: {
      control: { type: "text" }
    },
    termsOfTradeUrl: {
      control: { type: "text" }
    },
    viewFeesAndCompensationRatesUrl: {
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof FeeList>;

export const Primary: Story = {
  args: {
    ...serviceUrlArgs,
    ...blockedArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    ...groupModalArgs,
    ...groupModalLoansArgs,
    ...materialDetailsModalArgs,
    ...renewalArgs,
    feeListHeadlineText: "Fees & Replacement costs",
    feeListBodyText:
      "Overdue fees and replacement costs that were created before 27/10/2020 can still be paid on this page.",
    viewFeesAndCompensationRatesText: "See our fees and replacement costs",
    etAlText: "et al.",
    totalFeeAmountText: "Fee",
    otherMaterialsText: "Other materials",
    materialByAuthorText: "By",
    materialAndAuthorText: "and",
    feeListDaysText: "Days",
    payText: "Pay",
    totalText: "Total @total",
    expirationWarningDaysBeforeConfig: "6",
    iAcceptText: "I accept the",
    termsOfTradeText: "Terms of trade",
    unpaidFeesPayableByClientHeadlineText: "Unsettled debt - paid on site",
    unpaidFeesNotPayableByClientHeadlineText:
      "Unsettled debt - paid externally",
    alreadyPaidText:
      "Please note that paid fees are not registered up until 72 hours after your payment after which your debt is updated and your user unblocked if it has been blocked.",
    feePaymentModalHeaderText: "Unpaid fees post 27/10 2020",
    feePaymentModalBodyText: "You will be redirected to Mit Betalingsoverblik.",
    feePaymentModalNoticeText:
      "Paid fees can take up to 24 hours to registrer.",
    feePaymentModalGotoText: "Go to Mit Betalingsoverblik",
    feePaymentModalCancelText: "Cancel",
    feeDetailsModalScreenReaderText: "A modal containing details about a fee",
    emptyFeeListText: "You have 0 unpaid fees or replacement costs",
    feeDetailsModalCloseModalAriaLabelText: "Close fee details modal",
    feeDetailsModalDescriptionText:
      "Modal containing information about this element or group of elements fees",
    turnedInText: "Turned in @date",
    plusXOtherMaterialsText: "+ @amount other materials",
    itemFeeAmountText: "Fee @fee",
    feeCreatedText: "Fees charged @date",
    feeListAlreadyPaidInfoText:
      "Already paid? It can take up to 72 hours to register the transaction.",
    feeListAlreadyPaidSecondInfoText:
      "Already paid? It can take up to 72 hours to register the transaction. (not payable by user)",
    feeListMaterialNumberText: "# @materialNumber",
    feeListConfig: '{ "paymentSiteButtonLabel": "Go to payment page" }',
    feeListYouHaveOverdueLoansText:
      '{"type":"plural","text":["You have an overdue loan. You may be charged fees upon handing in or renewing it.","You have overdue loans. You may be charged fees upon handing in or renewing them."]}',
    feeListSeeYourOverdueLoansText: "See your overdue loans",
    feeListSeeYourOverdueLoansAriaText:
      "Go to the loan list page to see your overdue loans",
    loansOverdueText: "Returned too late",
    // Urls
    physicalLoansUrl: "/user/me/loans",
    feeListPaymentSiteUrl: "https://google.com",
    availablePaymentTypesUrl: "https://unsplash.com/photos/JDzoTGfoogA",
    termsOfTradeUrl: "https://unsplash.com/photos/JDzoTGfoogA",
    viewFeesAndCompensationRatesUrl: "https://unsplash.com/photos/NEJcmvLFcws"
  }
};

const { feeDetails } = getModalIds();

export const FeeListFeeDetailsModal: Story = {
  parameters: {
    query: {
      modal: `${feeDetails}48724566`
    }
  },
  args: {
    ...Primary.args
  }
};
