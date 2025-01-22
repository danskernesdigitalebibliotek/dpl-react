import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import serviceUrlArgs, {
  argTypes as serviceUrlArgTypes
} from "../../core/storybook/serviceUrlArgs";
import Menu from "./menu.entry";
import groupModalArgs, {
  argTypes as groupModalArgTypes
} from "../../core/storybook/groupModalArgs";
import loanGroupModalArgs, {
  argTypes as loanGroupModalArgTypes
} from "../../core/storybook/loanGroupModalArgs";
import renewalArgs, {
  argTypes as renewalArgTypes
} from "../../core/storybook/renewalArgs";
import reservationGroupModalArgs, {
  argTypes as reservationGroupModalArgTypes
} from "../../core/storybook/reservationGroupModalArgs";
import reservationMaterialDetailsProps, {
  argTypes as reservationMaterialDetailsPropTypes
} from "../../core/storybook/reservationMaterialDetailsArgs";
import materialDetailsModalArgs, {
  argTypes as materialDetailsModalArgTypes
} from "../../core/storybook/materialDetailsModalArgs";
import deleteReservationModalArgs, {
  argTypes as deleteReservationModalArgTypes
} from "../../core/storybook/deleteReservationModalArgs";
import StoryHeader from "../../components/search-bar/story-header.dev.inc";
import globalTextArgs, {
  argTypes as globalTextArgTypes
} from "../../core/storybook/globalTextArgs";
import globalConfigArgs, {
  argTypes as globalConfigArgTypes
} from "../../core/storybook/globalConfigArgs";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import { withConfig } from "../../core/utils/config";

const WrappedMenu = withText(withUrls(withConfig(Menu)));
const WrappedStoryHeader = withText(withUrls(withConfig(StoryHeader)));

const meta: Meta<typeof WrappedMenu> = {
  title: "Apps / Header",
  component: WrappedMenu,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: can't figure out how to type this
  argTypes: {
    ...serviceUrlArgTypes,
    ...groupModalArgTypes,
    ...loanGroupModalArgTypes,
    ...renewalArgTypes,
    ...reservationMaterialDetailsPropTypes,
    ...reservationGroupModalArgTypes,
    ...deleteReservationModalArgTypes,
    ...materialDetailsModalArgTypes,
    ...globalTextArgTypes,
    ...globalConfigArgTypes,
    materialAndAuthorText: {
      control: { type: "text" }
    },
    materialByAuthorText: {
      control: { type: "text" }
    },
    menuUserProfileUrlText: {
      control: { type: "text" }
    },
    userProfileUrl: {
      control: { type: "text" }
    },
    menuNavigationDataConfig: {
      control: { type: "text" }
    },
    menuNotificationLoansExpiredText: {
      control: { type: "text" }
    },
    menuUserIconAriaLabelText: {
      control: { type: "text" }
    },
    menuUserIconAriaLabelLoggedOutText: {
      control: { type: "text" }
    },
    menuNotificationLoansExpiredUrl: {
      control: { type: "text" }
    },
    menuNotificationLoansExpiringSoonText: {
      control: { type: "text" }
    },
    menuNotificationLoansExpiringSoonUrl: {
      control: { type: "text" }
    },
    menuNotificationReadyForPickupText: {
      control: { type: "text" }
    },
    menuNotAuthenticatedCloseButtonText: {
      control: { type: "text" }
    },
    menuAuthenticatedCloseButtonText: {
      control: { type: "text" }
    },
    menuAuthenticatedModalDescriptionText: {
      control: { type: "text" }
    },
    menuNotAuthenticatedModalDescriptionText: {
      control: { type: "text" }
    },
    menuNotificationReadyForPickupUrl: {
      control: { type: "text" }
    },
    menuLogOutText: {
      control: { type: "text" }
    },
    reservationsReadyText: {
      control: { type: "text" }
    },
    readyForLoanText: {
      control: { type: "text" }
    },
    loansSoonOverdueText: {
      control: { type: "text" }
    },
    statusBadgeWarningText: {
      control: { type: "text" }
    },
    loansOverdueText: {
      control: { type: "text" }
    },
    menuProfileLinksAriaLabelText: {
      control: { type: "text" }
    },
    logoutUrl: {
      control: { type: "text" }
    },
    physicalLoansUrl: {
      control: { type: "text" }
    },
    reservationsUrl: {
      control: { type: "text" }
    },
    menuLoginText: {
      control: { type: "text" }
    },
    menuLoginUrl: {
      control: { type: "text" }
    },
    menuSignUpText: {
      control: { type: "text" }
    },
    menuSignUpUrl: {
      control: { type: "text" }
    },
    ereolenHomepageUrl: {
      control: { type: "text" }
    },
    expirationWarningDaysBeforeConfig: {
      control: { type: "text" }
    },
    searchHeaderLoginText: {
      control: { type: "text" }
    },
    searchHeaderFavoritesText: {
      control: { type: "text" }
    }
  }
};

export default meta;

type Story = StoryObj<typeof WrappedMenu>;

export const UserMenu: Story = {
  args: {
    ...serviceUrlArgs,
    ...groupModalArgs,
    ...loanGroupModalArgs,
    ...renewalArgs,
    ...reservationMaterialDetailsProps,
    ...reservationGroupModalArgs,
    ...deleteReservationModalArgs,
    ...materialDetailsModalArgs,
    ...globalTextArgs,
    ...globalConfigArgs,
    materialAndAuthorText: "and",
    materialByAuthorText: "By",
    menuUserProfileUrlText: "My Account",
    userProfileUrl: "/YourProfile",
    menuNavigationDataConfig:
      '[{"name":"Dashboard","link":"/user/me/dashboard","dataId":"40"},{"name":"Loans","link":"/user/me/loans","dataId":"1"},{"name":"Reservations","link":"/user/me/reservations","dataId":"2"},{"name":"My list","link":"/user/me/favorites","dataId":"20"},{"name":"Fees & Replacement costs","link":"/user/me/fees","dataId":"4"}]',
    menuNotificationLoansExpiredText: "loans expired",
    menuUserIconAriaLabelText: "Open user menu",
    menuUserIconAriaLabelLoggedOutText: "Open login menu",
    menuNotificationLoansExpiredUrl: "/LoansExpired",
    menuNotificationLoansExpiringSoonText: "loans expiring soon",
    menuNotificationLoansExpiringSoonUrl: "/LoansExpiringSoon",
    menuNotificationReadyForPickupText: "reservations ready for pickup",
    menuNotAuthenticatedCloseButtonText: "Close user menu",
    menuAuthenticatedCloseButtonText: "Close user menu",
    menuAuthenticatedModalDescriptionText: "The user modal",
    menuNotAuthenticatedModalDescriptionText:
      "The user modal, log in or create a user",
    menuNotificationReadyForPickupUrl: "/ReservationsReadyForPickup",
    menuLogOutText: "Log out",
    reservationsReadyText: "Ready for you",
    readyForLoanText: "Ready for pickup",
    loansSoonOverdueText: "To be returned soon",
    statusBadgeWarningText: "Expires soon",
    loansOverdueText: "Returned too late",
    menuProfileLinksAriaLabelText: "Profile links",
    logoutUrl: "/Logout",
    physicalLoansUrl: "/user/me/loans",
    reservationsUrl: "/user/me/reservations",
    menuLoginText: "Log in",
    menuLoginUrl: "/Login",
    menuSignUpText: "Sign up",
    menuSignUpUrl: "/Signup",
    ereolenHomepageUrl: "https://ereolen.dk/",
    expirationWarningDaysBeforeConfig: "6",
    searchHeaderLoginText: "Login",
    searchHeaderFavoritesText: "Liked"
  },
  render: (args) => {
    // TODO: Explicitly define prop types for better clarity
    // eslint-disable-next-line react/jsx-props-no-spreading
    const menu = <WrappedMenu {...args} />;
    // We use the Header component as context to the search bar.
    // It is the Header that creates the Search bar's design -
    // - without it, the Search bar loses its shape.
    return <WrappedStoryHeader userProfile={menu} />;
  }
};
