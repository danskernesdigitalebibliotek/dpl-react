import React, { FC, useEffect, useState } from "react";
import profileIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-profile.svg";
import Link from "../../../components/atoms/links/Link";
import MenuNavigationList from "../menu-navigation-list/menu-navigation-list";
import MenuNotification from "../menu-notification/menu-notification";
import { AuthenticatedPatronV6 } from "../../../core/fbs/model";
import { useUrls } from "../../../core/utils/url";
import {
  useGetLoansV2,
  useGetReservationsV2,
  useGetFeesV2
} from "../../../core/fbs/fbs";
import { useGetV1UserLoans } from "../../../core/publizon/publizon";
import {
  mapPublizonLoanToLoanType,
  mapFBSLoanToLoanType
} from "../../../core/utils/helpers/list-mapper";
import { LoanType } from "../../../core/utils/types/loan-type";
import {
  filterLoansOverdue,
  filterLoansSoonOverdue,
  getModalIds,
  getReadyForPickup
} from "../../../core/utils/helpers/general";
import { useConfig } from "../../../core/utils/config";
import { ThresholdType } from "../../../core/utils/types/threshold-type";
import { useText } from "../../../core/utils/text";
import Modal from "../../../core/utils/modal";
import { Button } from "../../../components/Buttons/Button";
import { usePatronData } from "../../../components/material/helper";

export interface MenuLoggedInProps {
  closePatronMenu: () => void;
}
interface MenuNavigationDataType {
  name: string;
  link: string;
  dataId: string;
}

const MenuLoggedIn: FC = () => {
  const { userMenuAuthenticated: userMenuAuthenticatedModalId } = getModalIds();
  const { data: patronData } = usePatronData();
  const { data: patronReservations } = useGetReservationsV2();
  const { data: publizonData } = useGetV1UserLoans();
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

  const [loansCount, setLoansCount] = useState<number>(0);
  const [reservationCount, setReservationCount] = useState<number>(0);
  const [feeCount, setFeeCount] = useState<number>(0);
  const [loansOverdue, setLoansOverdue] = useState<number>(0);
  const [loansSoonOverdue, setLoansSoonOverdue] = useState<number>(0);
  const [reservationsReadyForPickup, setReservationsReadyForPickup] =
    useState<number>(0);
  const {
    menuViewYourProfileTextUrl,
    menuNotificationLoansExpiredUrl,
    menuNotificationLoansExpiringSoonUrl,
    menuNotificationReadyForPickupUrl,
    menuLogOutUrl
  } = useUrls();

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
    if (warning) {
      setLoansSoonOverdue(filterLoansSoonOverdue(loans, warning).length);
    }
  }, [loans, warning]);

  // Set count of reservations- and ready-for-pickup.
  useEffect(() => {
    if (patronReservations) {
      setReservationsReadyForPickup(
        getReadyForPickup(patronReservations).length
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
  return (
    <Modal
      modalId={userMenuAuthenticatedModalId as string}
      classNames="modal-right modal--no-padding"
      closeModalAriaLabelText={t("menuAuthenticatedCloseButtonText")}
      screenReaderModalDescriptionText={t(
        "menuAuthenticatedModalDescriptionText"
      )}
      isSlider
    >
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
                <Button
                  label={t("menuLogOutText")}
                  buttonType="none"
                  disabled={false}
                  collapsible={false}
                  size="medium"
                  variant="filled"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MenuLoggedIn;
