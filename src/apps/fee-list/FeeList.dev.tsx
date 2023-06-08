import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import blockedArgs from "../../core/storybook/blockedArgs";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import { getModalIds } from "../../core/utils/helpers/general";
import FeeList from "./FeeList.entry";

export default {
  title: "Apps / Fee list",
  component: FeeList,
  argTypes: {
    ...serviceUrlArgs,
    ...blockedArgs,
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
    viewFeesAndCompensationRatesUrl: {
      defaultValue: "https://unsplash.com/photos/NEJcmvLFcws", // Open source image of a curious giraffe
      control: { type: "text" }
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
      defaultValue: "Total",
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
    termsOfTradeUrl: {
      defaultValue: "https://unsplash.com/photos/JDzoTGfoogA", // Open source image of an adventurous duck
      control: { type: "text" }
    },
    unpaidFeesText: {
      defaultValue: "Unsettled debt",
      control: { type: "text" }
    },
    prePaymentTypeChangeDateText: {
      defaultValue: "BEFORE 27/10 2020",
      control: { type: "text" }
    },
    postPaymentTypeChangeDateText: {
      defaultValue: "AFTER 27/10 2020",
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
    FeeDetailsModalCloseModalAriaLabelText: {
      defaultValue: "Close fee details modal",
      control: { type: "text" }
    },
    FeeDetailsModalDescriptionText: {
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
      defaultValue: "Fee @fee,-"
    },
    feeCreatedText: {
      control: {
        type: "text"
      },
      defaultValue: "Fees charged @date"
    },
    availablePaymentTypesUrl: {
      defaultValue: "https://unsplash.com/photos/JDzoTGfoogA", // Open source image of an adventurous duck
      control: { type: "text" }
    },
    paymentOverviewUrl: {
      defaultValue: "https://unsplash.com/photos/yjI3ozta2Zk", // Open source image of a fluffy floofer
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
