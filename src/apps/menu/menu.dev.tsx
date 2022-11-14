import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Menu from "./menu.entry";

export default {
  title: "Apps / Menu",
  component: Menu,
  argTypes: {
    menuViewYourProfileText: {
      defaultValue: "My Account",
      control: { type: "text" }
    },
    menuNavigationDataConfig: {
      defaultValue:
        '[{"name": "Loans","link": "","dataId": "1"},{"name": "Reservations","link": "","dataId": "2"},{"name": "My list","link": "","dataId": "3"},{"name": "Fees & Replacement costs","link": "","dataId": "4"},{"name": "My account","link": "","dataId": "5"}]',
      control: { type: "text" }
    },
    menuNotificationDataConfig: {
      defaultValue:
        '[{"severity": "1","text": "Nye resultater på søgning du følger","notificationDataId": "1"},{"severity": "2","text": "Reservering klar","notificationDataId": "2"},{"severity": "3","text": "Lån udløber snart","notificationDataId": "3"},{"severity": "4","text": "Lån overskredet","notificationDataId": "4"}]',
      control: { type: "text" }
    },
    menuNotificationLoansExpiredText: {
      defaultValue: "loans expired",
      control: { type: "text" }
    },
    menuNotificationLoansExpiringSoonText: {
      defaultValue: "loans expiring soon",
      control: { type: "text" }
    },
    menuNotificationReadyForPickupText: {
      defaultValue: "reservations ready for pickup",
      control: { type: "text" }
    },
    menuLogOutText: {
      defaultValue: "Log Out",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (props) => <Menu {...props} />;
export const MenuEntry = Template.bind({});
MenuEntry.args = {};
