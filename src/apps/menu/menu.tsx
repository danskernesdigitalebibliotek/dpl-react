import React, { FC } from "react";
import profileIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-profile.svg";
import MenuNotLoggedInContent from "./menu-not-logged-in/menu-not-logged-in";
import { isAnonymous, isUnregistered } from "../../core/utils/helpers/user";
import MenuLoggedIn from "./menu-logged-in/menu-logged-in";
import { useText } from "../../core/utils/text";
import { useModalButtonHandler } from "../../core/utils/modal";
import TextLineSkeleton from "../../components/skeletons/TextLineSkeleton";
import { getModalIds } from "../../core/utils/helpers/modal-helpers";
import MenuUserUnregistered from "./menu-user-unregistered/menu-user-unregistered";
import { usePatronData } from "../../core/utils/helpers/usePatronData";
import Translations from "./translations/Translations";

interface MenuProps {
  pageSize: number;
}

const Menu: FC<MenuProps> = ({ pageSize }) => {
  const { open } = useModalButtonHandler();
  const t = useText();
  const {
    userMenuAuthenticated: userMenuAuthenticatedModalId,
    userMenuAnonymous: userMenuAnonymousModalId,
    userMenuUnregistered: userMenuUnregisteredModalId
  } = getModalIds();
  const { isLoading, data: userData } = usePatronData();
  const openMenu = () => {
    if (isUnregistered()) {
      open(userMenuUnregisteredModalId as string);
      return;
    }
    if (isAnonymous()) {
      open(userMenuAnonymousModalId as string);
      return;
    }
    open(userMenuAuthenticatedModalId as string);
  };
  const getAriaLabel = () => {
    if (isLoading) {
      return t("searchHeaderLoginText");
    }
    return userData?.patron
      ? t("menuUserIconAriaLabelText")
      : t("menuUserIconAriaLabelLoggedOutText");
  };

  /*
  TODO: Add data-cy to all elements regarding cypress tests in this file,
  for reduced flakyness.
  */
  return (
    <>
      <Translations />
      <button
        className="header__button btn-ui"
        data-cy="header-menu-profile-button"
        type="button"
        aria-label={getAriaLabel()}
        onClick={() => openMenu()}
        onKeyDown={(e) => e.key === "Enter" && openMenu()}
        tabIndex={0}
      >
        <img src={profileIcon} className="header__button-icon" alt="" />
        <span className="header__button-text">
          {isLoading ? (
            <TextLineSkeleton width={50} />
          ) : (
            userData?.patron?.name || t("searchHeaderLoginText")
          )}
        </span>
      </button>
      <MenuLoggedIn pageSize={pageSize} />
      <MenuUserUnregistered />
      <MenuNotLoggedInContent />
    </>
  );
};

export default Menu;
