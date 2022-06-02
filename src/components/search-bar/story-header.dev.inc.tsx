import * as React from "react";
import menuIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-menu.svg";
import profileIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-profile.svg";
import heartIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-heart.svg";
import watchIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-watch-static.svg";
import crossIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-cross-medium.svg";

export interface StoryHeaderProps {
  children: React.ReactNode;
}

const StoryHeader: React.FC<StoryHeaderProps> = ({ children }) => {
  // the component below is copied from the Design system repository:
  // https://github.com/danskernesdigitalebibliotek/dpl-design-system
  // located at -> /src/stories/header
  // if this component looks different than the one in design system,
  // please update it to match the design system
  // NOTE: icons need to be imported here + the search bar needs to be
  // replaced by {children}
  return (
    <div>
      <header className="header">
        <div className="header__logo-desktop">
          <a className="header__logo-desktop-link" href="/">
            <div>
              <img
                className="logo"
                src="data:image/png;base64,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"
                alt="Logo of libary"
              />
            </div>
          </a>
        </div>
        <div className="header__menu">
          <nav className="header__menu-first">
            <div>
              <div className="header__menu-navigation-mobile">
                <div
                  className="pagefold-parent--small header__menu-navigation-button header__button"
                  id="header__menu--open"
                >
                  <div className="pagefold-triangle--small" />
                  <img src={menuIcon} alt="List of bookmarks" />
                </div>
                <div className="header__menu-navigation-logo">
                  <div className="logo-fallback">
                    <p className="logo-fallback__text-name">Lyngby-Taarbæk</p>
                    <p className="logo-fallback__text-libraries">
                      Bibliotekerne
                    </p>
                  </div>
                </div>
              </div>
              <ul className="header__menu-navigation">
                <li className="header__menu-navigation-item">
                  <a
                    href="/"
                    className="header__menu-navigation-link text-body-medium-regular hide-linkstyle"
                  >
                    Det sker
                  </a>
                </li>
                <li className="header__menu-navigation-item">
                  <a
                    href="/"
                    className="header__menu-navigation-link text-body-medium-regular hide-linkstyle"
                  >
                    Biblioteker &amp; åbningstider
                  </a>
                </li>
                <li className="header__menu-navigation-item">
                  <a
                    href="/"
                    className="header__menu-navigation-link text-body-medium-regular hide-linkstyle"
                  >
                    Digitale tilbud
                  </a>
                </li>
                <li className="header__menu-navigation-item">
                  <a
                    href="/"
                    className="header__menu-navigation-link text-body-medium-regular hide-linkstyle"
                  >
                    Litteratur
                  </a>
                </li>
                <li className="header__menu-navigation-item">
                  <a
                    href="/"
                    className="header__menu-navigation-link text-body-medium-regular hide-linkstyle"
                  >
                    Børn &amp; forældre
                  </a>
                </li>
              </ul>
            </div>
            <div className="header__menu-profile header__button">
              <a href="/" className="hide-linkstyle">
                <img src={profileIcon} alt="Profile" />
              </a>
            </div>
            <div className="header__menu-bookmarked header__button">
              <a href="/">
                <img src={heartIcon} alt="List of bookmarks" />
              </a>
            </div>
          </nav>
          {children}
        </div>
        <div className="header__clock">
          <div className="pagefold-parent--medium">
            <div className="pagefold-triangle--medium" />
          </div>
          <div className="header__clock-items">
            <img src={watchIcon} className="mb-8" alt="clock icon" />
            <span className="text-small-caption">Fredag</span>
            <span className="text-small-caption">28 Maj</span>
          </div>
        </div>
      </header>
      <div id="header__overlay">
        <div className="header__overlay-main">
          <img id="header__menu--close" src={crossIcon} alt="close" />
          <ul className="header__overlay-menu">
            <li className="header__overlay-menu-item">
              <a
                href="/"
                className="header__overlay-menu-link text-body-large hide-linkstyle"
              >
                Det sker
              </a>
            </li>
            <li className="header__overlay-menu-item">
              <a
                href="/"
                className="header__overlay-menu-link text-body-large hide-linkstyle"
              >
                Biblioteker &amp; åbningstider
              </a>
            </li>
            <li className="header__overlay-menu-item">
              <a
                href="/"
                className="header__overlay-menu-link text-body-large hide-linkstyle"
              >
                Digitale tilbud
              </a>
            </li>
            <li className="header__overlay-menu-item">
              <a
                href="/"
                className="header__overlay-menu-link text-body-large hide-linkstyle"
              >
                Litteratur
              </a>
            </li>
            <li className="header__overlay-menu-item">
              <a
                href="/"
                className="header__overlay-menu-link text-body-large hide-linkstyle"
              >
                Børn &amp; forældre
              </a>
            </li>
          </ul>
        </div>
        <div className="header__overlay-backdrop" />
      </div>
    </div>
  );
};

export default StoryHeader;
