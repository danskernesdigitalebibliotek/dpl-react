import React, { FC } from "react";
import IconWarning from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import Link from "../../../../components/atoms/links/Link";
import { useUrls } from "../../../../core/utils/url";

interface WarningBarProps {
  linkText: string;
  overdueText: string;
}

const WarningBar: FC<WarningBarProps> = ({ linkText, overdueText }) => {
  const { feesPageUrl } = useUrls();

  return (
    <div className="warning-bar bg-global-secondary">
      <div className="warning-bar__left">
        <img className="warning-bar__icon" src={IconWarning} alt="" />
        <div>
          <p className="text-body-medium-regular color-primary-black">
            {overdueText}
            <Link
              href={feesPageUrl}
              className="link-tag color-secondary-gray ml-8"
            >
              {linkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarningBar;
