import React from "react";
import iconWatch from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-watch-static.svg";
import { useText } from "../../core/utils/text";

const OpeningHoursClock = () => {
  const t = useText();

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
};

export default OpeningHoursClock;
