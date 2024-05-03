import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import blockedArgs from "../../core/storybook/blockedArgs";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import FeeList from "./FeeList.entry";
import { getModalIds } from "../../core/utils/helpers/modal-helpers";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import globalConfigArgs from "../../core/storybook/globalConfigArgs";

export default {
  title: "Apps / Fee list",
  component: FeeList,
  argTypes: {
    ...serviceUrlArgs,
    ...blockedArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    feeListHeadlineText: {
      defaultValue: "Fees & Replacement costs",
      control: { type: "text" }
    },
    feeListBodyText: {
      defaultValue:
        "Overdue fees and replacement costs that were created before 27/10/2020 can still be paid on this page.",
      control: { type: "text" }
    },
    viewFeesAndCompensationRatesText: {
      defaultValue: "See our fees and replacement costs",
      control: { type: "text" }
    },
    etAlText: {
      control: {
        type: "text"
      },
      defaultValue: "et al."
    },
    totalFeeAmountText: {
      defaultValue: "Fee",
      control: { type: "text" }
    },
    otherMaterialsText: {
      defaultValue: "Other materials",
      control: { type: "text" }
    },
    materialByAuthorText: {
      defaultValue: "By",
      control: { type: "text" }
    },
    materialAndAuthorText: {
      defaultValue: "and",
      control: { type: "text" }
    },
    feeListDaysText: {
      defaultValue: "Days",
      control: { type: "text" }
    },
    payText: {
      defaultValue: "Pay",
      control: { type: "text" }
    },
    totalText: {
      defaultValue: "Total @total",
      control: { type: "text" }
    },
    expirationWarningDaysBeforeConfig: {
      defaultValue: "6",
      control: { type: "text" }
    },
    iAcceptText: {
      defaultValue: "I accept the",
      control: { type: "text" }
    },
    termsOfTradeText: {
      defaultValue: "Terms of trade",
      control: { type: "text" }
    },
    unpaidFeesPayableByClientHeadlineText: {
      defaultValue: "Unsettled debt - paid on site",
      control: { type: "text" }
    },
    unpaidFeesNotPayableByClientHeadlineText: {
      defaultValue: "Unsettled debt - paid externally",
      control: { type: "text" }
    },
    alreadyPaidText: {
      defaultValue:
        "Please note that paid fees are not registered up until 72 hours after your payment after which your debt is updated and your user unblocked if it has been blocked.",
      control: { type: "text" }
    },
    feePaymentModalHeaderText: {
      defaultValue: "Unpaid fees post 27/10 2020",
      control: { type: "text" }
    },
    feePaymentModalBodyText: {
      defaultValue: "You will be redirected to Mit Betalingsoverblik.",
      control: { type: "text" }
    },
    feePaymentModalNoticeText: {
      defaultValue: "Paid fees can take up to 24 hours to registrer.",
      control: { type: "text" }
    },
    feePaymentModalGotoText: {
      defaultValue: "Go to Mit Betalingsoverblik",
      control: { type: "text" }
    },
    feePaymentModalCancelText: {
      defaultValue: "Cancel",
      control: { type: "text" }
    },
    feeDetailsModalScreenReaderText: {
      defaultValue: "A modal containing details about a fee",
      control: { type: "text" }
    },
    emptyFeeListText: {
      defaultValue: "You have 0 unpaid fees or replacement costs",
      control: { type: "text" }
    },
    feeDetailsModalCloseModalAriaLabelText: {
      defaultValue: "Close fee details modal",
      control: { type: "text" }
    },
    feeDetailsModalDescriptionText: {
      defaultValue:
        "Modal containing information about this element or group of elements fees",
      control: { type: "text" }
    },
    turnedInText: {
      control: {
        type: "text"
      },
      defaultValue: "Turned in @date"
    },
    plusXOtherMaterialsText: {
      control: {
        type: "text"
      },
      defaultValue: "+ @amount other materials"
    },
    itemFeeAmountText: {
      control: {
        type: "text"
      },
      defaultValue: "Fee @fee"
    },
    feeCreatedText: {
      control: {
        type: "text"
      },
      defaultValue: "Fees charged @date"
    },
    feeListAlreadyPaidInfoText: {
      defaultValue:
        "Already paid? It can take up to 72 hours to register the transaction.",
      control: { type: "text" }
    },
    feeListAlreadyPaidSecondInfoText: {
      defaultValue:
        "Already paid? It can take up to 72 hours to register the transaction. (not payable by user)",
      control: { type: "text" }
    },
    feeListMaterialNumberText: {
      defaultValue: "# @materialNumber",
      control: { type: "text" }
    },
    feeListConfig: {
      defaultValue: '{ "paymentSiteButtonLabel": "Go to payment page" }',
      control: { type: "text" }
    },
    feeListYouHaveOverdueLoansText: {
      defaultValue: `{"type":"plural","text":["You have an overdue loan. You may be charged fees upon handing in or renewing it.","You have overdue loans. You may be charged fees upon handing in or renewing them."]}`,
      control: { type: "text" }
    },
    feeListSeeYourOverdueLoansText: {
      defaultValue: "See your overdue loans",
      control: { type: "text" }
    },
    feeListSeeYourOverdueLoansAriaText: {
      defaultValue: "Go to the loan list page to see your overdue loans",
      control: { type: "text" }
    },
    // Urls
    physicalLoansUrl: {
      defaultValue: "/user/me/loans",
      control: { type: "text" }
    },
    feeListPaymentSiteUrl: {
      defaultValue: "https://google.com",
      control: { type: "text" }
    },
    availablePaymentTypesUrl: {
      defaultValue: "https://unsplash.com/photos/JDzoTGfoogA", // Open source image of an adventurous duck
      control: { type: "text" }
    },
    termsOfTradeUrl: {
      defaultValue: "https://unsplash.com/photos/JDzoTGfoogA", // Open source image of an adventurous duck
      control: { type: "text" }
    },
    viewFeesAndCompensationRatesUrl: {
      defaultValue: "https://unsplash.com/photos/NEJcmvLFcws", // Open source image of a curious giraffe
      control: { type: "text" }
    }
  },
  decorators: [withQuery]
} as ComponentMeta<typeof FeeList>;

const Template: ComponentStory<typeof FeeList> = (props) => (
  <FeeList {...props} />
);

export const FeeListEntry = Template.bind({});

FeeListEntry.args = {};
const { feeDetails } = getModalIds();

export const FeeListFeeDetailsModal = Template.bind({});
FeeListFeeDetailsModal.parameters = {
  query: {
    modal: `${feeDetails}48724566`
  }
};
