import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import IntermedateList from "./intermediate-list.entry";

export default {
  title: "Apps / Intermediate-list",
  component: IntermedateList,
  argTypes: {
    intermediateListHeadlineText: {
      defaultValue: "Fees and compensations",
      control: { type: "text" }
    },
    intermediateListBodyText: {
      defaultValue:
        'Fees and compensations that you have recieved as per 27/10 2020 transitions to a new system, where transactions are carried out through the solution "Mit Betalingsoverblik". Fees before this date, can still be payed via. this page.',
      control: { type: "text" }
    },
    viewFeesAndCompensationRatesText: {
      defaultValue: "View fees and compensation rates",
      control: { type: "text" }
    },
    viewFeesAndCompensationRatesUrl: {
      defaultValue: "https://unsplash.com/photos/NEJcmvLFcws", // Open source image of a curious giraffe
      control: { type: "text" }
    },
    totalFeeAmountText: {
      defaultValue: "Fee",
      control: { type: "text" }
    },
    feeCreatedText: {
      defaultValue: "Fee created",
      control: { type: "text" }
    },
    otherMaterialsText: {
      defaultValue: "Other materials",
      control: { type: "text" }
    },
    materialByAuthorText: {
      defaultValue: "Af",
      control: { type: "text" }
    },
    loanListDaysText: {
      defaultValue: "Days",
      control: { type: "text" }
    },
    turnedInText: {
      defaultValue: "Turned in",
      control: { type: "text" }
    },
    payText: {
      defaultValue: "Pay",
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
    unpaidFeesText: {
      defaultValue: "Unpaid fees",
      control: { type: "text" }
    },
    prePaymentTypeChangeDateText: {
      defaultValue: "PRE 27/10 2020",
      control: { type: "text" }
    },
    postPaymentTypeChangeDateText: {
      defaultValue: "POST 27/10 2020",
      control: { type: "text" }
    },
    alreadyPaidText: {
      defaultValue:
        "Already paid? Paid fees can take up to 24 hours to registrer.",
      control: { type: "text" }
    },
    intermediatePaymentModalHeaderText: {
      defaultValue: "Unpaid fees post 27/10 2020",
      control: { type: "text" }
    },
    intermediatePaymentModalBodyText: {
      defaultValue: "You will be redirected to Mit Betalingsoverblik.",
      control: { type: "text" }
    },
    intermediatePaymentModalNoticeText: {
      defaultValue: "Paid fees can take up to 24 hours to registrer.",
      control: { type: "text" }
    },
    intermediatePaymentModalGotoText: {
      defaultValue: "Go to Mit Betalingsoverblik",
      control: { type: "text" }
    },
    intermediatePaymentModalCancelText: {
      defaultValue: "Cancel",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof IntermedateList>;

const Template: ComponentStory<typeof IntermedateList> = (props) => (
  <IntermedateList {...props} />
);

export const IntermediateListEntry = Template.bind({});

IntermediateListEntry.args = {};
