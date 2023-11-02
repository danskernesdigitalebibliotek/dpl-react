import React from "react";
import { useText } from "../../core/utils/text";

interface HeaderDropdownprops {
  redirectTo: (url: URL) => void;
  setIsHeaderDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  headerDropdownRef: React.RefObject<HTMLButtonElement>;
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
      <ul>
        <li>
          <button
            ref={headerDropdownRef}
            type="button"
            role="menuitem"
            className="header__menu-dropdown-item cursor-pointer"
            onClick={() => redirectTo(advancedSearchUrl)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
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
          </button>
        </li>
      </ul>
    </div>
  );
};

export default HeaderDropdown;
