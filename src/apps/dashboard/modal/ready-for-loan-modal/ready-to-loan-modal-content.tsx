import * as React from "react";
import { FC, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import check from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-check.svg";
import { useGetReservationsV2 } from "../../../../core/fbs/fbs";
import { ReservationDetailsV2 } from "../../../../core/fbs/model";
import {
  getColors,
  getReadyForPickup
} from "../../../../core/utils/helpers/general";
import { useGetV1UserReservations } from "../../../../core/publizon/publizon";
import { useText } from "../../../../core/utils/text";
import {
  Reservation,
  ReservationListResult
} from "../../../../core/publizon/model";
import QueuedReservationsList from "./ready-to-loan-list";
import CheckBox from "../../../../components/checkbox/Checkbox";
import StatusCircleIcon from "../../../loan-list/materials/utils/status-circle-icon";
import ArrowWhite from "../../../../components/atoms/icons/arrow/arrow-white";

interface ReadyToLoanModalContentProps {
  removeSelectedReservations: (selectedReservations: any) => void;
}
const ReadyToLoanModalContent: FC<ReadyToLoanModalContentProps> = ({
  removeSelectedReservations
}) => {
  const t = useText();

  const colors = getColors();
  const today = dayjs();
  const [physicalReservationsReadyToLoan, setPhysicalReservationsReadyToLoan] =
    useState<ReservationDetailsV2[]>();
  const [digitalReservationsReadyToLoan, setDigitalReservationsReadyToLoan] =
    useState<Reservation[]>();
  const { data: physicalReservations } = useGetReservationsV2();
  const { data: digitalReservations } =
    useGetV1UserReservations<ReservationListResult>();
  const [allSelectableReservations, setAllSelectableReservations] = useState<
    {
      [key: string]: string;
    }[]
  >();
  const [selectedReservations, setSelectedReservations] = useState<
    {
      [key: string]: string;
    }[]
  >([]);

  useEffect(() => {
    if (physicalReservations && !physicalReservationsReadyToLoan) {
      const readyToLoan = getReadyForPickup(physicalReservations);
      if (readyToLoan) {
        setPhysicalReservationsReadyToLoan(readyToLoan);
      }
    }
  }, [physicalReservations, physicalReservationsReadyToLoan, today]);

  useEffect(() => {
    if (digitalReservations && !digitalReservationsReadyToLoan) {
      const { reservations } = digitalReservations;
      if (reservations) {
        const readyToLoan = reservations.filter((reservation) => {
          const expiryDate = dayjs(reservation.expireDateUtc);
          return expiryDate > today;
        });
        if (readyToLoan) {
          setDigitalReservationsReadyToLoan(readyToLoan);
        }
      }
    }
  }, [digitalReservations, digitalReservationsReadyToLoan, today]);

  useEffect(() => {
    if (
      physicalReservationsReadyToLoan &&
      digitalReservationsReadyToLoan &&
      !allSelectableReservations
    ) {
      const fausts = physicalReservationsReadyToLoan.reduce((acc, pr) => {
        return { ...acc, [pr.recordId]: pr.reservationId };
      }, {});
      const identsObj = digitalReservationsReadyToLoan.reduce((acc, dr) => {
        return { ...acc, [dr.identifier as string]: dr.identifier };
      }, {});
      const selectableReservations = { ...fausts, ...identsObj };
      if (Object.keys(selectableReservations).length > 0) {
        setAllSelectableReservations(
          selectableReservations as {
            [key: string]: string;
          }[]
        );
      }
    }
  }, [
    allSelectableReservations,
    physicalReservationsReadyToLoan,
    digitalReservationsReadyToLoan
  ]);

  const selectAllQueuedResevationsHandler = () => {
    if (Object.keys(selectedReservations).length > 0) {
      setSelectedReservations([]);
    } else if (allSelectableReservations) {
      setSelectedReservations(allSelectableReservations);
    }
  };
  const setCustomSelection = useCallback(
    (elementId: string, reservationId: string) => {
      if (Object.keys(selectedReservations).includes(elementId as string)) {
        const newSelection = { ...selectedReservations };
        delete newSelection[elementId as never];
        setSelectedReservations(newSelection);
      } else {
        const updatedSelectedReservations = {
          ...selectedReservations,
          ...{
            [elementId]: reservationId
          }
        };
        setSelectedReservations(updatedSelectedReservations);
      }
    },
    [selectedReservations]
  );

  return (
    <div className="modal-loan__container">
      <div className="modal-loan__header">
        <div className="mr-32">
          <StatusCircleIcon percent={100} color={colors.success as string}>
            <img className="counter__icon" src={check} alt="check icon" />
            <span className="counter__label">Ready</span>
          </StatusCircleIcon>
        </div>
        <div>
          <h2 className="modal-loan__title text-header-h2">
            {t("readyForLoanText")}
          </h2>
          <p className="text-body-medium-regular color-secondary-gray mt-4" />
        </div>
      </div>
      <div className="modal-loan__buttons">
        <div className="checkbox">
          <CheckBox
            id="queued-reservations-select-all"
            label={t("chooseAllText")}
            onChecked={selectAllQueuedResevationsHandler}
          />
        </div>
        <button
          type="button"
          className="btn-primary btn-filled btn-small arrow__hover--right-small"
          onClick={() => removeSelectedReservations(selectedReservations)}
        >
          {t("removeAllReservationsText")} (
          {selectedReservations && Object.keys(selectedReservations).length})
          <div className="ml-16">
            <ArrowWhite />
          </div>
        </button>
      </div>
      <ul className="modal-loan__list-container">
        <li className="modal-loan__list">
          <ul className="modal-loan__list-materials">
            {physicalReservationsReadyToLoan && (
              <QueuedReservationsList
                physicalReservations={physicalReservationsReadyToLoan}
                selectedReservations={selectedReservations}
                setCustomSelection={setCustomSelection}
              />
            )}
            {digitalReservationsReadyToLoan && (
              <QueuedReservationsList
                digitalReservations={digitalReservationsReadyToLoan}
                selectedReservations={selectedReservations}
                setCustomSelection={setCustomSelection}
              />
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ReadyToLoanModalContent;
