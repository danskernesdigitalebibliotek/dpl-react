import React, { FC } from "react";
import profileIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-profile.svg";
// import MenuNotLoggedInContent from "./menu-not-logged-in/menu-not-logged-in";
import { isAnonymous } from "../../core/utils/helpers/user";
// import MenuLoggedIn from "./menu-logged-in/menu-logged-in";
import { useText } from "../../core/utils/text";
import { useModalButtonHandler } from "../../core/utils/modal";
import { getModalIds } from "../../core/utils/helpers/general";

const Menu: FC = () => {
  const { open } = useModalButtonHandler();
  const t = useText();
  const {
    userMenuAuthenticated: userMenuAuthenticatedModalId,
    userMenuAnonymous: userMenuAnonymousModalId
  } = getModalIds();

  const openMenu = () => {
    if (isAnonymous()) {
      open(userMenuAnonymousModalId as string);
      return;
    }

    open(userMenuAuthenticatedModalId as string);
  };

  /*
  TODO: Add data-cy to all elements regarding cypress tests in this file,
  for reduced flakyness.
  */

  /*
  TODO: Find a way generally to handle loading state in app.
  */
  return (
    <>
      <button
        className="header__menu-profile header__button"
        type="button"
        aria-label={t("menuUserIconAriaLabelText")}
        onClick={() => openMenu()}
      >
        <img src={profileIcon} alt="" />
      </button>
      {/* todo will be fixed */}
      {/* <MenuLoggedIn />
      <MenuNotLoggedInContent /> */}
    </>
  );
};

export default Menu;
