import React from "react";
import { useText } from "../../core/utils/text";

interface HeaderDropdownprops {
  redirectTo: (url: URL) => void;
  setIsHeaderDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  headerDropdownRef: React.RefObject<HTMLAnchorElement | null>;
  advancedSearchUrl: URL;
}
const HeaderDropdown: React.FC<HeaderDropdownprops> = ({
  redirectTo,
  setIsHeaderDropdownOpen,
  headerDropdownRef,
  advancedSearchUrl
}) => {
  const t = useText();
  return (
    <div className="header__menu-dropdown" data-cy="search-header-dropdown">
      <ul role="menu">
        <li role="presentation">
          <a
            ref={headerDropdownRef}
            role="menuitem"
            className="header__menu-dropdown-item hide-linkstyle"
            href={String(advancedSearchUrl)}
            onClick={(e) => {
              e.preventDefault();
              redirectTo(advancedSearchUrl);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                return redirectTo(advancedSearchUrl);
              }
              if (
                e.key === "ArrowDown" ||
                e.key === "ArrowUp" ||
                e.key === "Escape"
              ) {
                return setIsHeaderDropdownOpen(false);
              }
              return null;
            }}
            onBlur={() => setIsHeaderDropdownOpen(false)}
          >
            {t("headerDropdownItemAdvancedSearchText")}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default HeaderDropdown;
