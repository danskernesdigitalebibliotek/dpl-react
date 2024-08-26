import React, { FC } from "react";
import iconWatch from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-watch-static.svg";
import { useText } from "../../core/utils/text";

export type OpeningHoursSidebarType = {
  size: "small" | "large";
};

const OpeningHoursSidebar: FC<OpeningHoursSidebarType> = ({ size }) => {
  const t = useText();

  if (size === "large") {
    return (
      <div className="header__clock">
        <div className="pagefold-parent--medium">
          <div className="pagefold-triangle--medium" />
        </div>
        <button type="button" className="header__clock-items">
          <img
            loading="lazy"
            width="58"
            height="58"
            src={iconWatch}
            className="mb-8"
            alt=""
          />
          <span className="text-small-caption">{t("openingHoursText")}</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="header__button header__button--left-border"
    >
      <img
        className="header__button-icon"
        loading="lazy"
        width="24"
        height="24"
        src={iconWatch}
        alt="clock icon"
      />

      <span className="header__button-text">{t("openingHoursText")}</span>
    </button>
  );
};

export default OpeningHoursSidebar;
