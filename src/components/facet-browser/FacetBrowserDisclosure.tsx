import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import clsx from "clsx";
import React, { FC, ReactNode, useCallback } from "react";

export interface FacetBrowserDisclosureProps {
  id: string;
  title: string;
  children?: ReactNode;
  fullWidth?: boolean;
  showContent?: boolean;
  removeHeadlinePadding?: boolean;
  onClick?: () => void;
}

const FacetBrowserDisclosure: FC<FacetBrowserDisclosureProps> = ({
  id,
  title,
  children,
  fullWidth,
  showContent = false,
  removeHeadlinePadding,
  onClick
}) => {
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
        <span className="disclosure__text">{title}</span>

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
