import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import React, { FC, ReactNode } from "react";
import { useText } from "../../../core/utils/text";
import Pagefold from "../../pagefold/Pagefold";

export interface DisclosureProps {
  mainIconPath?: string;
  title: string;
  children?: ReactNode;
  disclosureIconExpandAltText?: string;
  isAvailable?: boolean;
  fullWidth?: boolean;
}

const Disclosure: FC<DisclosureProps> = ({
  title,
  children,
  mainIconPath,
  isAvailable,
  fullWidth
}) => {
  const t = useText();

  return (
    <details
      className={`disclosure text-body-large ${
        fullWidth ? "disclosure--full-width" : ""
      }`}
    >
      <summary className="disclosure__headline text-body-large">
        {mainIconPath && (
          <div className="disclosure__icon bg-identity-tint-120">
            <img className="invert" src={mainIconPath} alt="" />
          </div>
        )}
        <span
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
      {children}
    </details>
  );
};

export default Disclosure;
