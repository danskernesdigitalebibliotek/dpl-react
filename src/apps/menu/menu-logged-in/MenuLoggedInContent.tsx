import React, { FC, useEffect, useState } from "react";
import profileIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-profile.svg";
import Link from "../../../components/atoms/links/Link";
import MenuNavigationItem, {
  MenuNavigationDataType
} from "../menu-navigation-list/MenuNavigationItem";
import { AuthenticatedPatronV6, FeeV2 } from "../../../core/fbs/model";
import { useUrls } from "../../../core/utils/url";
import { useGetFeesV2 } from "../../../core/fbs/fbs";
import { useConfig } from "../../../core/utils/config";
import { useText } from "../../../core/utils/text";
import DashboardNotificationList from "../../dashboard/dashboard-notification-list/dashboard-notification-list";
import useReservations from "../../../core/utils/useReservations";
import useLoans from "../../../core/utils/useLoans";
import { usePatronData } from "../../../core/utils/helpers/usePatronData";
import { resetPersistedData } from "../../../core/store";
import { Button } from "../../../components/Buttons/Button";
import { redirectTo } from "../../../core/utils/helpers/url";

interface MenuLoggedInContentProps {
  pageSize: number;
}

const MenuLoggedInContent: FC<MenuLoggedInContentProps> = ({ pageSize }) => {
  const t = useText();
  const u = useUrls();
  const userProfileUrl = u("userProfileUrl");
  const logoutUrl = u("logoutUrl");
  const config = useConfig();

  const {
    all: { reservations }
  } = useReservations();
  const {
    all: { loans, overdue: loansOverdue, soonOverdue: loansSoonOverdue }
  } = useLoans();
  const { data: patronData } = usePatronData();
  const { data: fbsFees = [] } = useGetFeesV2<FeeV2[]>({
    includepaid: false,
    includenonpayable: true
  });

  // Get menu navigation data from config.
  const menuNavigationData = config<MenuNavigationDataType[]>(
    "menuNavigationDataConfig",
    {
      transformer: "jsonParse"
    }
  );
  const [userData, setUserData] = useState<
    AuthenticatedPatronV6 | null | undefined
  >();
  const [feeCount, setFeeCount] = useState<number>(0);

  // Set user data
  useEffect(() => {
    setUserData(patronData);
  }, [patronData]);

  // Set count of fees.
  useEffect(() => {
    if (fbsFees) {
      setFeeCount(fbsFees.length);
    }
  }, [fbsFees]);

  const showNotifications =
    loansOverdue.length !== 0 ||
    loansSoonOverdue.length !== 0 ||
    reservations.length !== 0;

  return (
    <div className="modal-login modal-login--authenticated">
      <div className="modal-login__container">
        <div className="modal-header">
          <div className="modal-header__avatar">
            <div className="avatar bg-global-secondary">
              <img src={profileIcon} alt="" />
            </div>
          </div>
          <div
            className="modal-header__name text-header-h4"
            data-cy="menu-patron-name"
          >
            {userData?.patron?.name}
          </div>
          <Link
            href={userProfileUrl}
            className="link-tag modal-header__link color-secondary-gray"
          >
            {t("menuUserProfileUrlText")}
          </Link>
        </div>
        {showNotifications && (
          <div className="modal-profile__container">
            <DashboardNotificationList pageSize={pageSize} columns={false} />
          </div>
        )}
        <nav
          className="modal-profile__container"
          aria-label={t("menuProfileLinksAriaLabelText")}
        >
          <ul className="modal-profile__links">
            {menuNavigationData.map((menuNavigationItem) => (
              <MenuNavigationItem
                key={menuNavigationItem.dataId}
                menuNavigationItem={menuNavigationItem}
                loansCount={loans.length}
                reservationCount={reservations.length}
                feeCount={feeCount}
              />
            ))}
          </ul>
        </nav>
        <div className="modal-profile__btn-logout mx-32">
          <Button
            label={t("menuLogOutText")}
            buttonType="none"
            size="large"
            variant="filled"
            collapsible={false}
            onClick={() => {
              resetPersistedData();
              redirectTo(logoutUrl);
            }}
            canOnlyBeClickedOnce
          />
        </div>
      </div>
    </div>
  );
};

export default MenuLoggedInContent;
