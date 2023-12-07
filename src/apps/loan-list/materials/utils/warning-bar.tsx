import React, { FC, useId } from "react";
import IconWarning from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import Link from "../../../../components/atoms/links/Link";

interface WarningBarProps {
  linkText?: string;
  overdueText?: string;
  rightButtonText?: string;
  rightButtonAriaLabelText?: string;
  rightText?: string;
  leftLink?: URL;
  rightLink?: URL;
}

const WarningBar: FC<WarningBarProps> = ({
  linkText,
  overdueText,
  rightText,
  rightButtonText,
  rightButtonAriaLabelText,
  leftLink,
  rightLink
}) => {
  const labelId = useId();

  return (
    <div className="warning-bar bg-global-secondary" data-cy="warning-bar">
      <div className="warning-bar__left">
        <img className="warning-bar__icon" src={IconWarning} alt="" />
        <div>
          <p
            className="text-body-medium-regular color-primary-black"
            data-cy="warning-bar-text"
          >
            {overdueText}
            {leftLink && (
              <Link
                href={leftLink}
                className="link-tag color-secondary-gray ml-8 hide-linkstyle"
              >
                {linkText}
              </Link>
            )}
          </p>
        </div>
      </div>
      {rightText && (
        <div className="warning-bar__right">
          <p
            className="text-body-medium-medium warning-bar__owes"
            data-cy="warning-bar-right-text"
          >
            {rightText}
          </p>
          <span className="hide-visually" id={labelId}>
            {rightButtonAriaLabelText}
          </span>
          {rightLink && (
            <Link
              dataCy="warning-bar-right-link"
              href={rightLink}
              className="btn-primary btn-filled btn-small arrow__hover--right-small"
              ariaLabelledBy={labelId}
            >
              {rightButtonText}
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default WarningBar;
