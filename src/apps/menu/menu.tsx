import React, { FC, useEffect, useState } from "react";
import profileIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-profile.svg";
import CloseIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/CloseLarge.svg";
import { Link } from "../../components/atoms/link";
import MenuNavigationList from "./menu-navigation-list/menu-navigation-list";
import MenuNotification from "./menu-notification/menu-notification";
import { useConfig } from "../../core/utils/config";
import { useText } from "../../core/utils/text";
import ArrowIcon from "../../components/atoms/icons/arrow/arrow-white";
import {
  useGetPatronInformationByPatronIdV2,
  useGetLoansV2,
  useGetReservationsV2,
  useGetFeesV2
} from "../../core/fbs/fbs";
import { AuthenticatedPatronV6 } from "../../core/fbs/model/authenticatedPatronV6";
import { useGetV1UserLoans } from "../../core/publizon/publizon";
import {
  mapPublizonLoanToLoanType,
  mapFBSLoanToLoanType,
  mapFBSReservationToReservationType
} from "../../core/utils/helpers/list-mapper";
import { LoanType } from "../../core/utils/types/loan-type";
import { ThresholdType } from "../../core/utils/types/threshold-type";
import {
  filterLoansOverdue,
  filterLoansSoonOverdue,
  getReadyForPickup
} from "../../core/utils/helpers/general";
import { useUrls } from "../../core/utils/url";

interface MenuNavigationDataType {
  name: string;
  link: string;
  dataId: string;
}

const Menu: FC = () => {
  const t = useText();
  const config = useConfig();
  const {
    colorThresholds: { warning }
  } = config<ThresholdType>("thresholdConfig", {
    transformer: "jsonParse"
  });

  const { data: patronData } = useGetPatronInformationByPatronIdV2();
  const { data: patronReservations } = useGetReservationsV2();
  const { data: publizonData } = useGetV1UserLoans();
  const { data: fbsData } = useGetLoansV2();
  const { data: fbsFees } = useGetFeesV2();
  const [userData, setUserData] = useState<
    AuthenticatedPatronV6 | null | undefined
  >();
  const [loans, setLoans] = useState<LoanType[]>([]);
  const [loansCount, setLoansCount] = useState<number>(0);
  const [reservationCount, setReservationCount] = useState<number>(0);
  const [feeCount, setFeeCount] = useState<number>(0);
  const [loansOverdue, setLoansOverdue] = useState<number>(0);
  const [loansSoonOverdue, setLoansSoonOverdue] = useState<number>(0);
  const [warningThresholdFromConfig, setWarningThresholdFromConfig] = useState<
    number | null
  >(null);
  const [reservationsReadyForPickup, setReservationsReadyForPickup] =
    useState<number>(0);
  const {
    menuViewYourProfileTextUrl,
    menuNotificationLoansExpiredUrl,
    menuNotificationLoansExpiringSoonUrl,
    menuNotificationReadyForPickupUrl,
    menuLogOutUrl
  } = useUrls();

  // Get menu navigation data from config.
  const menuNavigationData = config<MenuNavigationDataType[]>(
    "menuNavigationDataConfig",
    {
      transformer: "jsonParse"
    }
  );

  useEffect(() => {
    if (warning) {
      setWarningThresholdFromConfig(warning);
    }
  }, [warning]);

  // Set user data
  useEffect(() => {
    setUserData(patronData);
  }, [patronData]);

  // Merge digital and physical loans, for easier filtration down the line.
  useEffect(() => {
    if (publizonData?.loans && fbsData) {
      const digitalLoans = mapPublizonLoanToLoanType(publizonData.loans);
      const physicalLoans = mapFBSLoanToLoanType(fbsData);
      setLoans([...digitalLoans, ...physicalLoans]);
    }
  }, [publizonData, fbsData]);

  // Set count of loans overdue.
  useEffect(() => {
    setLoansOverdue(filterLoansOverdue(loans).length);
  }, [loans]);

  // Set count of loans soon to be overdue.
  useEffect(() => {
    if (warningThresholdFromConfig) {
      setLoansSoonOverdue(
        filterLoansSoonOverdue(loans, warningThresholdFromConfig).length
      );
    }
  }, [loans, warningThresholdFromConfig]);

  // Set count of reservations- and ready-for-pickup.
  useEffect(() => {
    if (patronReservations) {
      setReservationsReadyForPickup(
        getReadyForPickup(
          mapFBSReservationToReservationType(patronReservations)
        ).length
      );
      setReservationCount(patronReservations.length);
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

  /*
  TODO: Find a proper way to handle tabindex when this menu is active.
  All content behind the overlay cannot be targetable
  while the menu is open.
  */

  /*
  TODO: Add data-cy to all elements regarding cypress tests in this file,
  for reduced flakyness.
  */

  /*
  TODO: Find a way generally to handle loading state in app.
  */

  /*
  TODO: Add check if user is authenticated, else show login prompt or directly redirect. TBD.
  */

  return (
    <div className="modal-backdrop">
      <div className="modal modal-show modal-profile modal-right">
        <div className="modal__screen-reader-description" id="describemodal" />
        <button
          type="button"
          aria-describedby="describemodal"
          className="btn-ui modal-btn-close"
          aria-label="close modal"
        >
          <img src={CloseIcon} alt="close modal button" />
        </button>
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
        <div className="modal-profile__notifications">
          {loansOverdue !== 0 && (
            <MenuNotification
              notificationNumber={loansOverdue}
              notificationText={t("menuNotificationLoansExpiredText")}
              notificationColor="danger"
              notificationLink={menuNotificationLoansExpiredUrl}
            />
          )}
          {loansSoonOverdue !== 0 && (
            <MenuNotification
              notificationNumber={loansSoonOverdue}
              notificationText={t("menuNotificationLoansExpiringSoonText")}
              notificationColor="warning"
              notificationLink={menuNotificationLoansExpiringSoonUrl}
            />
          )}
          {reservationsReadyForPickup !== 0 && (
            <MenuNotification
              notificationNumber={reservationsReadyForPickup}
              notificationText={t("menuNotificationReadyForPickupText")}
              notificationColor="info"
              notificationLink={menuNotificationReadyForPickupUrl}
            />
          )}
        </div>
        <div className="modal-profile__container">
          <div className="modal-profile__links">
            <div className="link-filters">
              <MenuNavigationList
                menuNavigationData={menuNavigationData}
                loansCount={loansCount}
                reservationCount={reservationCount}
                feeCount={feeCount}
              />
            </div>
          </div>
          <div className="modal-profile__btn-logout">
            <Link href={menuLogOutUrl}>
              <button
                type="button"
                className="btn-primary btn-filled btn-medium arrow__hover--right-small undefined"
              >
                {t("menuLogOutText")}
                <div className="ml-16">
                  <ArrowIcon />
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
