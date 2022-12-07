import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import Menu from "./menu.entry";

export default {
  title: "Apps / Menu",
  component: Menu,
  argTypes: {
    ...serviceUrlArgs,
    menuViewYourProfileText: {
      defaultValue: "My Account",
      control: { type: "text" }
    },
    menuViewYourProfileTextUrl: {
      defaultValue: "/YourProfile",
      control: { type: "text" }
    },
    menuNavigationDataConfig: {
      defaultValue:
        '[{"name": "Loans","link": "","dataId": "1"},{"name": "Reservations","link": "","dataId": "2"},{"name": "My list","link": "","dataId": "3"},{"name": "Fees & Replacement costs","link": "","dataId": "4"},{"name": "My account","link": "","dataId": "5"}]',
      control: { type: "text" }
    },
    menuNotificationLoansExpiredText: {
      defaultValue: "loans expired",
      control: { type: "text" }
    },
    menuNotificationLoansExpiredUrl: {
      defaultValue: "/LoansExpired",
      control: { type: "text" }
    },
    menuNotificationLoansExpiringSoonText: {
      defaultValue: "loans expiring soon",
      control: { type: "text" }
    },
    menuNotificationLoansExpiringSoonUrl: {
      defaultValue: "/LoansExpiringSoon",
      control: { type: "text" }
    },
    menuNotificationReadyForPickupText: {
      defaultValue: "reservations ready for pickup",
      control: { type: "text" }
    },
    menuNotificationReadyForPickupUrl: {
      defaultValue: "/ReservationsReadyForPickup",
      control: { type: "text" }
    },
    menuLogOutText: {
      defaultValue: "Log Out",
      control: { type: "text" }
    },
    menuLogOutUrl: {
      defaultValue: "/Logout",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (props) => <Menu {...props} />;
export const MenuEntry = Template.bind({});
MenuEntry.args = {};
