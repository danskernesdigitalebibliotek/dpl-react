import clsx from "clsx";
import React, { FC } from "react";
import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { useText } from "../../core/utils/text";

export type ButtonExpandProps = {
  showMore: boolean;
  setShowMore: (showMore: boolean) => void;
};

const ButtonExpand: FC<ButtonExpandProps> = ({ showMore, setShowMore }) => {
  const t = useText();
  return (
    <button
      className="button-expand"
      type="button"
      onClick={() => setShowMore(!showMore)}
      aria-label={t("expandMoreText")}
    >
      <img
        className={clsx("button-expand__image", {
          "button-expand__image--expanded": showMore
        })}
        src={ExpandMoreIcon}
        alt=""
      />
    </button>
  );
};

export default ButtonExpand;
