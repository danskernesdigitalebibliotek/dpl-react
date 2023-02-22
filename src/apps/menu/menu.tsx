import React, { FC, useState } from "react";
import profileIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-profile.svg";
import MenuNotLoggedInContent from "./menu-not-logged-in/menu-not-logged-in";
import { userIsAnonymous } from "../../core/utils/helpers/user";
import MenuLoggedIn from "./menu-logged-in/menu-logged-in";

const Menu: FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const closePatronMenu = () => {
    setShowMenu(false);
  };

  /*
  TODO: Find a proper way to handle tabindex when this menu is active.
  All content behind the overlay cannot be targetable
  while the menu is open.
  */

  /*
  TODO: Add data-cy to all elements regarding cypress tests in this file,
  for reduced flakyness.
  */

  /*
  TODO: Find a way generally to handle loading state in app.
  */

  /*
  TODO: Add check if user is authenticated, else show login prompt or directly redirect. TBD.
  */

  return (
    <>
      <button
        className="header__menu-profile header__button"
        type="button"
        onClick={() => setShowMenu(true)}
      >
        <img src={profileIcon} alt="Profile" />
      </button>
      {showMenu && (
        <div className="modal-backdrop">
          {userIsAnonymous() && (
            <MenuLoggedIn closePatronMenu={closePatronMenu} />
          )}
          {!userIsAnonymous() && (
            <MenuNotLoggedInContent closePatronMenu={closePatronMenu} />
          )}
        </div>
      )}
    </>
  );
};

export default Menu;
