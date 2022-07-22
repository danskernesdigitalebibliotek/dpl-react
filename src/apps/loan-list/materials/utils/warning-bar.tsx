import React, { FC } from "react";
import IconWarning from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";

interface WarningBarProps {
  linkText: string;
  overdueText: string;
}

const WarningBar: FC<WarningBarProps> = ({ linkText, overdueText }) => {
  return (
    <div className="warning-bar bg-global-secondary">
      <div className="warning-bar__left">
        <img className="warning-bar__icon" src={IconWarning} alt="" />
        <div>
          <p className="text-body-medium-regular color-primary-black">
            {overdueText}
            <a href="/" className="link-tag color-secondary-gray ml-8">
              {/* todo link til gebyrer */}
              {linkText}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarningBar;
