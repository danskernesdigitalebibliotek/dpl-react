import React, { FC } from "react";
import IconWarning from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-warning.svg";
import { Link } from "../../../../components/atoms/link";
import { getCurrentLocation } from "../../../../core/utils/helpers/url";
import { useUrls } from "../../../../core/utils/url";

interface WarningBarProps {
  linkText: string;
  overdueText: string;
}

const WarningBar: FC<WarningBarProps> = ({ linkText, overdueText }) => {
  const { feesPageUrl } = useUrls();
  const feesPage = new URL(feesPageUrl, getCurrentLocation());
  return (
    <div className="warning-bar bg-global-secondary">
      <div className="warning-bar__left">
        <img className="warning-bar__icon" src={IconWarning} alt="" />
        <div>
          <p className="text-body-medium-regular color-primary-black">
            {overdueText}
            <Link
              href={feesPage}
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
