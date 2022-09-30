import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import ReservationList from "./reservation-list.entry";

export default {
  title: "Apps / Reservation list",
  component: ReservationList,
  argTypes: {
    reservationListHeaderText: {
      defaultValue: "Dine reserveringer",
      control: { type: "text" }
    },
    reservationListPhysicalLoansTitleText: {
      defaultValue: "Fysiske reserveringer",
      control: { type: "text" }
    }
  },
  decorators: [withQuery]
} as ComponentMeta<typeof ReservationList>;

const Template: ComponentStory<typeof ReservationList> = (props) => (
  <ReservationList {...props} />
);

export const ReservationListEntry = Template.bind({});
ReservationListEntry.args = {};
