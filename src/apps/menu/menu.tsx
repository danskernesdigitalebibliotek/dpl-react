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
        className="header__menu-profile header__button btn-ui"
        type="button"
        aria-label={
          userData
            ? t("menuUserIconAriaLabelText")
            : t("menuUserIconAriaLabelLoggedOutText")
        }
        onClick={() => openMenu()}
        onKeyDown={(e) => e.key === "Enter" && openMenu()}
        tabIndex={0}
      >
        <img src={profileIcon} alt="" />
        {isLoading && (
          <span className="text-small-caption">
            <TextLineSkeleton width={50} />
          </span>
        )}
        {!userData?.patron?.name && (
          <span className="text-small-caption">
            {t("searchHeaderLoginText")}
          </span>
        )}
        {userData?.patron?.name && (
          <span className="text-small-caption">{userData.patron.name}</span>
        )}
      </button>
      <MenuLoggedIn pageSize={pageSize} />
      <MenuUserUnregistered />
      <MenuNotLoggedInContent />
    </>
  );
};

export default Menu;
