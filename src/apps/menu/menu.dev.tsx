import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import Menu from "./menu.entry";
import groupModalArgs from "../../core/storybook/groupModalArgs";
import loanGroupModalArgs from "../../core/storybook/loanGroupModalArgs";
import renewalArgs from "../../core/storybook/renewalArgs";
import reservationGroupModalArgs from "../../core/storybook/reservationGroupModalArgs";
import reservationMaterialDetailsProps from "../../core/storybook/reservationMaterialDetailsArgs";
import materialDetailsModalArgs from "../../core/storybook/materialDetailsModalArgs";
import deleteReservationModalArgs from "../../core/storybook/deleteReservationModalArgs";
import StoryHeader from "../../components/search-bar/story-header.dev.inc";
import globalTextArgs from "../../core/storybook/globalTextArgs";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import { withConfig } from "../../core/utils/config";

const WrappedMenu = withText(withUrls(withConfig(Menu)));
const WrappedStoryHeader = withText(withUrls(withConfig(StoryHeader)));

export default {
  title: "Apps / Header",
  component: WrappedMenu,
  argTypes: {
    ...serviceUrlArgs,
    ...groupModalArgs,
    ...loanGroupModalArgs,
    ...renewalArgs,
    ...reservationMaterialDetailsProps,
    ...reservationGroupModalArgs,
    ...deleteReservationModalArgs,
    ...materialDetailsModalArgs,
    ...globalTextArgs,
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
    menuUserProfileUrlText: {
      defaultValue: "My Account",
      control: { type: "text" }
    },
    userProfileUrl: {
      defaultValue: "/YourProfile",
      control: { type: "text" }
    },
    menuNavigationDataConfig: {
      defaultValue:
        '[{"name":"Dashboard","link":"/user/me/dashboard","dataId":"40"},{"name":"Loans","link":"/user/me/loans","dataId":"1"},{"name":"Reservations","link":"/user/me/reservations","dataId":"2"},{"name":"My list","link":"/user/me/favorites","dataId":"20"},{"name":"Fees & Replacement costs","link":"/user/me/fees","dataId":"4"}]',
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
    reservationDetailsOthersInQueueText: {
      defaultValue: "Others are queueing for this material",
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
    logoutUrl: {
      defaultValue: "/Logout",
      control: { type: "text" }
    },
    physicalLoansUrl: {
      defaultValue: "/user/me/loans",
      control: { type: "text" }
    },
    reservationsUrl: {
      defaultValue: "/user/me/reservations",
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
    ereolenHomepageUrl: {
      defaultValue: "https://ereolen.dk/",
      control: { type: "text" }
    },
    expirationWarningDaysBeforeConfig: {
      defaultValue: "6",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof WrappedMenu>;

export const UserMenu: ComponentStory<typeof WrappedMenu> = (args) => {
  const menu = <WrappedMenu {...args} />;

  return (
    // We use the Header component as context to the search bar.
    // It is the Header that creates the Search bar's design -
    // - without it, the Search bar loses its shape.
    <WrappedStoryHeader userProfile={menu} />
  );
};
