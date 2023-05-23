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
import ReadyToLoanList from "./ready-to-loan-list";
import CheckBox from "../../../../components/checkbox/Checkbox";
import StatusCircleIcon from "../../../loan-list/materials/utils/status-circle-icon";
import { Button } from "../../../../components/Buttons/Button";

interface ReadyToLoanModalContentProps {
  removeSelectedReservations: (
    selectedReservations: {
      [key: string]: string;
    }[]
  ) => void;
}
const ReadyToLoanModalContent: FC<ReadyToLoanModalContentProps> = ({
  removeSelectedReservations
}) => {
  const t = useText();

  const { success } = getColors();
  const today = dayjs();
  const [physicalReservationsReadyToLoan, setPhysicalReservationsReadyToLoan] =
    useState<ReservationDetailsV2[]>();
  const [digitalReservationsReadyToLoan, setDigitalReservationsReadyToLoan] =
    useState<Reservation[]>();
  const { data: physicalReservations } = useGetReservationsV2();
  const { data: digitalReservations } =
    useGetV1UserReservations<ReservationListResult>();
  const [allSelectableReservations, setAllSelectableReservations] = useState<
    string[]
  >([]);
  const [selectedReservations, setSelectedReservations] = useState<string[]>(
    []
  );

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
      if (selectableReservations.length > 0) {
        setAllSelectableReservations(selectableReservations);
      }
    }
  }, [
    allSelectableReservations,
    physicalReservationsReadyToLoan,
    digitalReservationsReadyToLoan
  ]);

  const selectAllQueuedResevationsHandler = () => {
    if (selectedReservations.length > 0) {
      setSelectedReservations([]);
    } else if (allSelectableReservations) {
      setSelectedReservations(allSelectableReservations);
    }
  };
  const setCustomSelection = useCallback(
    (elementId: string, reservationId: string) => {
      if (selectedReservations.includes(elementId as string)) {
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
          <StatusCircleIcon percent={100} color={success as string}>
            <img className="counter__icon" src={check} alt="" />
            <span className="counter__label">
              {t("readyForLoanCounterLabelText")}
            </span>
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
        <Button
          label={t("removeAllReservationsText", {
            placeholders: {
              "@amount": selectedReservations.length
            }
          })}
          buttonType="none"
          disabled={false}
          collapsible={false}
          size="small"
          variant="filled"
          onClick={() => removeSelectedReservations(selectedReservations)}
        />
      </div>
      <ul className="modal-loan__list-container">
        <li className="modal-loan__list">
          <ul className="modal-loan__list-materials">
            {physicalReservationsReadyToLoan && (
              <ReadyToLoanList
                physicalReservations={physicalReservationsReadyToLoan}
                selectedReservations={selectedReservations}
                setCustomSelection={setCustomSelection}
              />
            )}
            {digitalReservationsReadyToLoan && (
              <ReadyToLoanList
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
