import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import clsx from "clsx";
import React, { FC, ReactNode, useCallback, useState } from "react";

export interface DisclosureCustomOpeningProps {
  id: string;
  title: string;
  children?: ReactNode;
  fullWidth?: boolean;
  showContent?: boolean;
  removeHeadlinePadding?: boolean;
  onClick?: () => void;
  cyData?: string;
  mainIconPath?: string;
}

// It was not possible to use the Disclosure component thats already in the project
// because we don't have control over the open attribute
const DisclosureCustomOpening: FC<DisclosureCustomOpeningProps> = ({
  id,
  title,
  children,
  fullWidth,
  showContent = false,
  removeHeadlinePadding,
  cyData,
  mainIconPath
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(showContent);

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const disclosureId = `disclosure-${id}`;

  return (
    <div
      data-cy={cyData}
      className={`disclosure text-body-large ${
        fullWidth ? "disclosure--full-width" : ""
      }`}
    >
      <div
        className={clsx(
          "disclosure__headline text-body-large",
          removeHeadlinePadding && "disclosure__headline--no-padding"
        )}
        aria-controls={disclosureId}
        aria-expanded={isOpen}
        onClick={toggleOpen}
        onKeyDown={toggleOpen}
        role="button"
        tabIndex={0}
      >
        {mainIconPath && (
          <div className="disclosure__icon bg-identity-tint-120">
            <img className="invert" src={mainIconPath} alt="" />
          </div>
        )}
        <span className="disclosure__text">{title}</span>

        <img
          className="disclosure__expand noselect"
          src={ExpandMoreIcon}
          alt=""
        />
      </div>
      {isOpen && <div id={disclosureId}>{children}</div>}
    </div>
  );
};

export default DisclosureCustomOpening;
