import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { withQuery } from "@storybook/addon-queryparams";
import ReservationList from "./reservation-list.entry";
import { configTypes } from "../../../core/utils/helpers/fetcher";

export default {
  title: "Apps / Reservation list",
  component: ReservationList,
  argTypes: {
    [configTypes.fbs]: {
      defaultValue: "",
      control: { type: "text" }
    },
    [configTypes.publizon]: {
      defaultValue: "",
      control: { type: "text" }
    },
    headerText: {
      defaultValue: "Dine reserveringer",
      control: { type: "text" }
    },
    reservationListPhysicalReservationsHeaderText: {
      defaultValue: "Fysiske",
      control: { type: "text" }
    },
    reservationListDigitalReservationsHeaderText: {
      defaultValue: "Digitale",
      control: { type: "text" }
    },
    reservationListReadyForPickupTitleText: {
      defaultValue: "Klar til lån",
      control: { type: "text" }
    },
    readyText: {
      defaultValue: "Klar",
      control: { type: "text" }
    },
    materialByAuthorText: {
      defaultValue: "Af",
      control: { type: "text" }
    },
    materialAndAuthorText: {
      defaultValue: "og",
      control: { type: "text" }
    },
    youAreNumberInLineText: {
      defaultValue: "Du er nummer {tal her} i køen",
      control: { type: "text" }
    },
    expiresSoonText: {
      defaultValue: "Udløber snart",
      control: { type: "text" }
    },
    inLineText: {
      defaultValue: "I køen",
      control: { type: "text" }
    },
    reservationPickUpLatestText: {
      defaultValue: "Hent senest",
      control: { type: "text" }
    },
    publizonEbookText: {
      defaultValue: "E-bog",
      control: { type: "text" }
    },
    publizonAudioBookText: {
      defaultValue: "Lydbog",
      control: { type: "text" }
    },
    publizonPodcastText: {
      defaultValue: "Podcast",
      control: { type: "text" }
    },
    loanBeforeText: {
      defaultValue: "Lånes inden",
      control: { type: "text" }
    },
    daysText: {
      defaultValue: "Dage",
      control: { type: "text" }
    },
    canBeLoanedInText: {
      defaultValue: "Kan lånes om dage",
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
