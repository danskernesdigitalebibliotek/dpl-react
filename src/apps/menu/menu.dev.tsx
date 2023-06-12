import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import Menu from "./menu.entry";
import groupModalArgs from "../../core/storybook/groupModalArgs";
import loanGroupModalArgs from "../../core/storybook/loanGroupModalArgs";
import reservationGroupModalArgs from "../../core/storybook/reservationGroupModalArgs";
import reservationMaterialDetailsProps from "../../core/storybook/reservationMaterialDetailsArgs";
import materialDetailsModalArgs from "../../core/storybook/materialDetailsModalArgs";
import deleteReservationModalArgs from "../../core/storybook/deleteReservationModalArgs";

export default {
  title: "Apps / Menu",
  component: Menu,
  argTypes: {
    ...serviceUrlArgs,
    ...groupModalArgs,
    ...loanGroupModalArgs,
    ...reservationMaterialDetailsProps,
    ...reservationGroupModalArgs,
    ...deleteReservationModalArgs,
    ...materialDetailsModalArgs,
    materialAndAuthorText: {
      control: {
        type: "text"
      },
      defaultValue: "and"
    },
    materialByAuthorText: {
      defaultValue: "By",
      control: { type: "text" }
    },
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
    menuUserIconAriaLabelText: {
      defaultValue: "Open user menu",
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
    menuNotAuthenticatedCloseButtonText: {
      defaultValue: "Close user menu",
      control: { type: "text" }
    },
    menuAuthenticatedCloseButtonText: {
      defaultValue: "Close user menu",
      control: { type: "text" }
    },
    menuAuthenticatedModalDescriptionText: {
      defaultValue: "The user modal",
      control: { type: "text" }
    },
    menuNotAuthenticatedModalDescriptionText: {
      defaultValue: "The user modal, log in or create a user",
      control: { type: "text" }
    },
    menuNotificationReadyForPickupUrl: {
      defaultValue: "/ReservationsReadyForPickup",
      control: { type: "text" }
    },
    menuLogOutText: {
      defaultValue: "Log out",
      control: { type: "text" }
    },
    reservationsReadyText: {
      defaultValue: "Ready for you",
      control: { type: "text" }
    },
    readyForLoanText: {
      defaultValue: "Ready for pickup",
      control: { type: "text" }
    },
    loansSoonOverdueText: {
      defaultValue: "To be returned soon",
      control: { type: "text" }
    },
    statusBadgeWarningText: {
      control: {
        type: "text"
      },
      defaultValue: "Expires soon"
    },
    loansOverdueText: {
      defaultValue: "Returned too late",
      control: { type: "text" }
    },
    menuProfileLinksAriaLabelText: {
      defaultValue: "Profile links",
      control: { type: "text" }
    },
    menuLogOutUrl: {
      defaultValue: "/Logout",
      control: { type: "text" }
    },
    menuLoginText: {
      defaultValue: "Log in",
      control: { type: "text" }
    },
    menuLoginUrl: {
      defaultValue: "/Login",
      control: { type: "text" }
    },
    menuSignUpText: {
      defaultValue: "Sign up",
      control: { type: "text" }
    },
    menuSignUpUrl: {
      defaultValue: "/Signup",
      control: { type: "text" }
    },
    thresholdConfig: {
      defaultValue:
        '{\n      "colorThresholds":{\n      "danger":"0",\n      "warning":"6"\n   }\n   }',
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (props) => <Menu {...props} />;
export const MenuEntry = Template.bind({});
MenuEntry.args = {};
