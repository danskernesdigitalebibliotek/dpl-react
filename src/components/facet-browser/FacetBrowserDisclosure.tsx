import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import clsx from "clsx";
import React, { FC, ReactNode, useCallback } from "react";
import { useText } from "../../core/utils/text";
import Pagefold from "../pagefold/Pagefold";

export interface FacetBrowserDisclosureProps {
  id: string;
  mainIconPath?: string;
  title: string;
  children?: ReactNode;
  isAvailable?: boolean;
  fullWidth?: boolean;
  showContent?: boolean;
  removeHeadlinePadding?: boolean;
  onClick?: () => void;
}

const FacetBrowserDisclosure: FC<FacetBrowserDisclosureProps> = ({
  id,
  title,
  children,
  mainIconPath,
  isAvailable,
  fullWidth,
  showContent = false,
  removeHeadlinePadding,
  onClick
}) => {
  const t = useText();
  const onClickHandler = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  const disclosureId = `facet-${id}`;

  return (
    <div
      className={`disclosure text-body-large ${
        fullWidth ? "disclosure--full-width" : ""
      }`}
      role="button"
      aria-controls={disclosureId}
      aria-expanded={showContent}
    >
      <div
        className={clsx(
          "disclosure__headline text-body-large",
          removeHeadlinePadding && "disclosure__headline--no-padding"
        )}
        onClick={onClickHandler}
        onKeyDown={onClickHandler}
        role="button"
        tabIndex={0}
      >
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
      </div>
      {showContent && <div id={disclosureId}>{children}</div>}
    </div>
  );
};

export default FacetBrowserDisclosure;
