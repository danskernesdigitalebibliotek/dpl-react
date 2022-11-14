import React, { FC, useEffect, useState } from "react";
import profileIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-profile.svg";
import CloseIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/CloseLarge.svg";
import MenuNavigationList from "./menu-navigation-list/menu-navigation-list";
import MenuNotification from "./menu-notification/menu-notification";
import { useConfig } from "../../core/utils/config";
import { useText } from "../../core/utils/text";
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
  mapFBSLoanToLoanType
} from "../../core/utils/helpers/list-mapper";
import { LoanType } from "../../core/utils/types/loan-type";
import {
  filterLoansOverdue,
  filterLoansSoonOverdue,
  getReadyForPickup
} from "../../core/utils/helpers/general";

interface MenuNavigationDataType {
  name: string;
  link: string;
  dataId: string;
}

const Menu: FC = () => {
  const t = useText();
  const config = useConfig();
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
  const [reservationsReadyForPickup, setReservationsReadyForPickup] =
    useState<number>(0);

  // Get menu navigation data from config
  const menuNavigationData = config<MenuNavigationDataType[]>(
    "menuNavigationDataConfig",
    {
      transformer: "jsonParse"
    }
  );

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

  // Set count of loans overdue
  useEffect(() => {
    setLoansOverdue(filterLoansOverdue(loans).length);
  }, [loans]);

  // Set count of loans soon to be overdue
  useEffect(() => {
    setLoansSoonOverdue(filterLoansSoonOverdue(loans).length);
  }, [loans]);

  // Set count of reservations- and ready-for-pickup
  useEffect(() => {
    if (patronReservations) {
      setReservationsReadyForPickup(
        getReadyForPickup(patronReservations).length
      );
      setReservationCount(patronReservations.length);
    }
  }, [patronReservations]);

  // Set count of loans
  useEffect(() => {
    setLoansCount(loans.length);
  }, [loans]);

  // Set count of fees
  useEffect(() => {
    if (fbsFees) {
      setFeeCount(fbsFees.length);
    }
  }, [fbsFees]);

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
          <div className="modal-header__name text-header-h4">
            {userData?.patron?.name}
          </div>
          <a
            href="/"
            className="link-tag modal-header__link color-secondary-gray"
          >
            {t("menuViewYourProfileText")}
          </a>
        </div>
        <div className="modal-profile__notifications">
          {loansOverdue !== 0 && (
            <MenuNotification
              notificationNumber={loansOverdue}
              notificationText={t("menuNotificationLoansExpiredText")}
              notificationColor="danger"
            />
          )}
          {loansSoonOverdue !== 0 && (
            <MenuNotification
              notificationNumber={loansSoonOverdue}
              notificationText={t("menuNotificationLoansExpiringSoonText")}
              notificationColor="warning"
            />
          )}
          {reservationsReadyForPickup !== 0 && (
            <MenuNotification
              notificationNumber={reservationsReadyForPickup}
              notificationText={t("menuNotificationReadyForPickupText")}
              notificationColor="info"
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
            <button
              type="button"
              className="btn-primary btn-filled btn-medium arrow__hover--right-small undefined"
            >
              {t("menuLogOutText")}
              <div className="ml-16">
                <svg
                  width="61"
                  height="9"
                  viewBox="0 0 61 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="arrow__body"
                    d="M60 4.5H0"
                    stroke="currentColor"
                  />
                  <path
                    className="arrow__head"
                    d="M60.3537 4.85355C60.5489 4.65829 60.5489 4.34171 60.3537 4.14645L57.1717 0.96447C56.9764 0.769208 56.6598 0.769208 56.4646 0.96447C56.2693 1.15973 56.2693 1.47631 56.4646 1.67157L59.293 4.5L56.4646 7.32843C56.2693 7.52369 56.2693 7.84027 56.4646 8.03553C56.6598 8.2308 56.9764 8.2308 57.1717 8.03553L60.3537 4.85355ZM60.0001 4H57.0001V5H60.0001V4Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
