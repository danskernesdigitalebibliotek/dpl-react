import React, { FC } from "react";
import IconWarning from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import Link from "../../../../components/atoms/links/Link";

interface WarningBarProps {
  linkText: string;
  overdueText?: string;
  rightButtonText?: string;
  rightText?: string;
  leftLink?: URL;
  rightLink?: URL;
}

const WarningBar: FC<WarningBarProps> = ({
  linkText,
  overdueText,
  rightText,
  rightButtonText,
  leftLink,
  rightLink
}) => {
  return (
    <div className="warning-bar bg-global-secondary">
      <div className="warning-bar__left">
        <img className="warning-bar__icon" src={IconWarning} alt="" />
        <div>
          <p className="text-body-medium-regular color-primary-black">
            {overdueText}
            {leftLink && (
              <Link
                href={leftLink}
                className="link-tag color-secondary-gray ml-8"
              >
                {linkText}
              </Link>
            )}
          </p>
        </div>
      </div>
      {rightText && (
        <div className="warning-bar__right">
          <p className="text-body-medium-medium warning-bar__owes">
            {rightText}
          </p>
          {rightLink && (
            <Link
              href={rightLink}
              className="btn-primary btn-filled btn-small arrow__hover--right-small"
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
