import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import clsx from "clsx";
import React, { FC, ReactNode } from "react";
import { useItemHasBeenVisible } from "../../core/utils/helpers/lazy-load";
import { useText } from "../../core/utils/text";
import Pagefold from "../pagefold/Pagefold";

export interface DisclosureProps {
  mainIconPath?: string;
  title: string;
  children?: ReactNode;
  disclosureIconExpandAltText?: string;
  isAvailable?: boolean;
  fullWidth?: boolean;
  open?: boolean;
  removeHeadlinePadding?: boolean;
  dataCy?: string;
}

const Disclosure: FC<DisclosureProps> = ({
  title,
  children,
  mainIconPath,
  isAvailable,
  fullWidth,
  open,
  removeHeadlinePadding,
  dataCy = "disclosure"
}) => {
  const t = useText();
  const { itemRef, hasBeenVisible: showItem } = useItemHasBeenVisible();

  return (
    <details
      className={`disclosure text-body-large ${
        fullWidth ? "disclosure--full-width" : ""
      }`}
      open={open}
      data-cy={dataCy}
    >
      <summary
        ref={itemRef}
        className={clsx(
          "disclosure__headline text-body-large",
          removeHeadlinePadding && "disclosure__headline--no-padding"
        )}
      >
        {mainIconPath && (
          <div className="disclosure__icon bg-identity-tint-120">
            <img className="invert" src={mainIconPath} alt="" />
          </div>
        )}
        <span
          data-cy="disclosure-title"
          className={`disclosure__text${
            isAvailable !== undefined ? "--shorter" : ""
          }`}
        >
          {title}
        </span>
        {isAvailable !== undefined && (
          <Pagefold
            text={isAvailable ? t("available") : t("unavailable")}
            state={isAvailable ? "success" : "alert"}
          />
        )}
        <img
          className="disclosure__expand noselect"
          src={ExpandMoreIcon}
          alt=""
        />
      </summary>
      {showItem && children}
    </details>
  );
};

export default Disclosure;
