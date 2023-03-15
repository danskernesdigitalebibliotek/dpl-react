import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import clsx from "clsx";
import React, { FC, ReactNode, useCallback, useState } from "react";
import {
  createHeading,
  HeadingLevelType
} from "../../core/utils/create-heading";

export interface DisclosureControllableProps {
  id: string;
  title: string;
  children?: ReactNode;
  fullWidth?: boolean;
  showContent?: boolean;
  removeHeadlinePadding?: boolean;
  onClick?: () => void;
  cyData?: string;
  mainIconPath?: string;
  headingLevel?: HeadingLevelType;
}

// It was not possible to use the Disclosure component thats already in the project
// because we don't have control over the open attribute
const DisclosureControllable: FC<DisclosureControllableProps> = ({
  id,
  title,
  children,
  fullWidth,
  showContent = false,
  removeHeadlinePadding,
  cyData,
  mainIconPath,
  headingLevel = "h2"
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(showContent);
  const Heading = createHeading(headingLevel);

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const disclosureId = `disclosure-${id}`;

  return (
    <div
      className={`disclosure text-body-large ${
        fullWidth ? "disclosure--full-width" : ""
      }`}
    >
      <div
        className={clsx(
          "disclosure__headline text-body-large",
          removeHeadlinePadding && "disclosure__headline--no-padding"
        )}
        data-cy={cyData}
        onClick={toggleOpen}
        onKeyDown={toggleOpen}
        role="button"
        tabIndex={0}
        aria-controls={disclosureId}
        aria-expanded={isOpen}
      >
        {mainIconPath && (
          <div className="disclosure__icon bg-identity-tint-120">
            <img className="invert" src={mainIconPath} alt="" />
          </div>
        )}
        <Heading className="text-body-large disclosure__text">{title}</Heading>

        <img
          className={clsx("disclosure__expand noselect", {
            "disclosure__expand--expanded": isOpen
          })}
          src={ExpandMoreIcon}
          alt=""
        />
      </div>
      {isOpen && <div id={disclosureId}>{children}</div>}
    </div>
  );
};

export default DisclosureControllable;
