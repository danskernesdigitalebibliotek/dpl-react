import React, { FC, useEffect, useState } from "react";
import profileIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-profile.svg";
import Link from "../../../components/atoms/links/Link";
import MenuNavigationItem, {
  MenuNavigationDataType
} from "../menu-navigation-list/MenuNavigationItem";
import { AuthenticatedPatronV6 } from "../../../core/fbs/model";
import { useUrls } from "../../../core/utils/url";
import { useGetLoansV2, useGetFeesV2 } from "../../../core/fbs/fbs";
import {
  mapFBSLoanToLoanType,
  mapFBSReservationGroupToReservationType
} from "../../../core/utils/helpers/list-mapper";
import { LoanType } from "../../../core/utils/types/loan-type";
import {
  filterLoansOverdue,
  filterLoansSoonOverdue
} from "../../../core/utils/helpers/general";
import { useConfig } from "../../../core/utils/config";
import { ThresholdType } from "../../../core/utils/types/threshold-type";
import { useText } from "../../../core/utils/text";
import { usePatronData } from "../../../components/material/helper";
import { getReadyForPickup } from "../../reservation-list/utils/helpers";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import DashboardNotificationList from "../../dashboard/dashboard-notification-list/dashboard-notification-list";
import useGetReservationGroups from "../../../core/utils/useGetReservationGroups";

interface MenuLoggedInContentProps {
  pageSize: number;
}

const MenuLoggedInContent: FC<MenuLoggedInContentProps> = ({ pageSize }) => {
  const { data: patronData } = usePatronData();
  const { reservations: patronReservations } = useGetReservationGroups();
  const { data: fbsData } = useGetLoansV2();
  const { data: fbsFees } = useGetFeesV2();
  const t = useText();
  const config = useConfig();
  const {
    colorThresholds: { warning }
  } = config<ThresholdType>("thresholdConfig", {
    transformer: "jsonParse"
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
  const [loans, setLoans] = useState<LoanType[]>([]);
  const [reservations, setReservations] = useState<ReservationType[]>([]);
  const [loansCount, setLoansCount] = useState<number>(0);
  const [reservationCount, setReservationCount] = useState<number>(0);
  const [feeCount, setFeeCount] = useState<number>(0);
  const [loansOverdue, setLoansOverdue] = useState<number>(0);
  const [loansSoonOverdue, setLoansSoonOverdue] = useState<number>(0);
  const [reservationsReadyForPickup, setReservationsReadyForPickup] =
    useState<number>(0);
  const { menuViewYourProfileTextUrl, menuLogOutUrl } = useUrls();

  // Set user data
  useEffect(() => {
    setUserData(patronData);
  }, [patronData]);

  // Merge digital and physical loans, for easier filtration down the line.
  useEffect(() => {
    if (fbsData) {
      const mappedFbsLoans = mapFBSLoanToLoanType(fbsData);
      setLoans(mappedFbsLoans);
    }
  }, [fbsData]);

  // Set count of loans overdue.
  useEffect(() => {
    setLoansOverdue(filterLoansOverdue(loans).length);
  }, [loans]);

  // Set count of loans soon to be overdue.
  useEffect(() => {
    if (warning) {
      setLoansSoonOverdue(filterLoansSoonOverdue(loans, warning).length);
    }
  }, [loans, warning]);

  // Set count of reservations- and ready-for-pickup.
  useEffect(() => {
    if (patronReservations) {
      const mappedReservations =
        mapFBSReservationGroupToReservationType(patronReservations);
      setReservations(mappedReservations);
      setReservationsReadyForPickup(
        getReadyForPickup(mappedReservations).length
      );
      setReservationCount(mappedReservations.length);
    }
  }, [patronReservations]);

  // Set count of loans.
  useEffect(() => {
    setLoansCount(loans.length);
  }, [loans]);

  // Set count of fees.
  useEffect(() => {
    if (fbsFees) {
      setFeeCount(fbsFees.length);
    }
  }, [fbsFees]);

  const showNotifications =
    loansOverdue !== 0 ||
    loansSoonOverdue !== 0 ||
    reservationsReadyForPickup !== 0;

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
            href={menuViewYourProfileTextUrl}
            className="link-tag modal-header__link color-secondary-gray"
          >
            {t("menuViewYourProfileText")}
          </Link>
        </div>
        {showNotifications && (
          <div className="modal-profile__container">
            <DashboardNotificationList
              reservations={reservations}
              loans={loans}
              pageSize={pageSize}
              columns={false}
            />
          </div>
        )}
        <nav
          className="modal-profile__container"
          aria-label={t("menuProfileLinksAriaLabelText")}
        >
          <ul className="modal-profile__links">
            {menuNavigationData.map((menuNavigationItem) => (
              <MenuNavigationItem
                menuNavigationItem={menuNavigationItem}
                loansCount={loansCount}
                reservationCount={reservationCount}
                feeCount={feeCount}
              />
            ))}
          </ul>
        </nav>
        <div className="modal-profile__btn-logout mx-32">
          <Link
            className="btn-primary btn-filled btn-large arrow__hover--right-small"
            href={menuLogOutUrl}
          >
            {t("menuLogOutText")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuLoggedInContent;
