import React, { FC } from "react";
import iconWatch from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-watch-static.svg";
import { useText } from "../../core/utils/text";

type ButtonSmallProps = {
  openDialog: () => void;
};

const ButtonSmall: FC<ButtonSmallProps> = ({ openDialog }) => {
  const t = useText();

  return (
    <button
      type="button"
      className="header__button header__button--left-border"
      onClick={openDialog}
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

export default ButtonSmall;
