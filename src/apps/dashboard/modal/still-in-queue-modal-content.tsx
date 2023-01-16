import * as React from "react";
import { FC, useCallback, useEffect, useState } from "react";
import { useGetReservationsV2 } from "../../../core/fbs/fbs";
import { ReservationDetailsV2 } from "../../../core/fbs/model";
import { getPhysicalReservations } from "../../../core/utils/helpers/general";
import { useGetV1UserReservations } from "../../../core/publizon/publizon";
import { useText } from "../../../core/utils/text";
import {
  Reservation,
  ReservationListResult
} from "../../../core/publizon/model";
import QueuedReservationsList from "./queued-reservations-list";
import CheckBox from "../../../components/checkbox/Checkbox";

const StillInQueueModalContent: FC = () => {
  const t = useText();
  const [
    physicalReservationsStillInQueue,
    setPhysicalReservationsStillInQueue
  ] = useState<ReservationDetailsV2[]>();
  const [digitalReservationsStillInQueue, setDigitalReservationsStillInQueue] =
    useState<Reservation[]>();
  const { data: physicalReservations } = useGetReservationsV2();
  const { data: digitalReservations } =
    useGetV1UserReservations<ReservationListResult>();
  const [allSelectableReservations, setAllSelectableReservations] =
    useState<string[]>();
  const [selectedReservations, setSelectedReservations] = useState<string[]>(
    []
  );
  useEffect(() => {
    if (physicalReservations) {
      const reservations = getPhysicalReservations(physicalReservations);
      if (reservations) {
        setPhysicalReservationsStillInQueue(reservations);
      }
    }
  }, [physicalReservations]);

  useEffect(() => {
    if (
      physicalReservations &&
      digitalReservationsStillInQueue &&
      !allSelectableReservations
    ) {
      const fausts = physicalReservations.map((pr) => {
        return pr.recordId;
      });
      const idents = digitalReservationsStillInQueue.map((dr) => {
        return dr.identifier;
      });
      const selectableReservations = [...fausts, ...idents] as string[];
      if (selectableReservations.length > 0) {
        setAllSelectableReservations(selectableReservations);
      }
    }
  }, [
    physicalReservations,
    digitalReservationsStillInQueue,
    allSelectableReservations
  ]);

  useEffect(() => {
    if (digitalReservations) {
      const { reservations } = digitalReservations;
      if (reservations) {
        setDigitalReservationsStillInQueue(reservations);
      }
    }
  }, [digitalReservations]);
  const selectAllQueuedResevationsHandler = () => {
    if (selectedReservations.length > 0) {
      setSelectedReservations([]);
    } else if (allSelectableReservations) {
      setSelectedReservations(allSelectableReservations);
    }
  };
  const setCustomSelection = useCallback(
    (elementId: string | number) => {
      if (selectedReservations.includes(elementId as string)) {
        const filteredReservations = selectedReservations.filter((item) => {
          return item !== elementId;
        });
        setSelectedReservations(filteredReservations);
      } else {
        const updatedSelectedReservations = [...selectedReservations];
        updatedSelectedReservations.push(elementId as string);
        setSelectedReservations(updatedSelectedReservations);
      }
    },
    [selectedReservations]
  );
  const removeSelectedReservations = () => {
    if (selectedReservations.length > 0) {
      console.log("Delete reservations using following:");
      // Publizon
      // deleteV1UserReservationsIdentifier

      // FBS
      // deleteReservations
    }
  };
  return (
    <div className="modal-loan__container">
      <div className="modal-loan__header">
        <div>
          <h2 className="modal-loan__title text-header-h2">
            {t("reservationsStillInQueueForText")}
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
          onClick={removeSelectedReservations}
        >
          {t("removeAllReservationsText")} (
          {selectedReservations && selectedReservations.length}){" "}
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
      <ul className="modal-loan__list-container">
        <li className="modal-loan__list">
          <div className="modal-loan__count">
            <div className="link-filters">
              <div className="link-filters__tag-wrapper">
                <a href="/" className="link-tag link-tag link-filters__tag">
                  {t("physicalText")}
                </a>
                <span className="link-filters__counter">
                  {physicalReservationsStillInQueue &&
                    physicalReservationsStillInQueue.length}
                </span>
              </div>
            </div>
          </div>
          {physicalReservationsStillInQueue && (
            <QueuedReservationsList
              physicalReservations={physicalReservationsStillInQueue}
              selectedReservations={selectedReservations}
              setCustomSelection={setCustomSelection}
            />
          )}
        </li>
        <li className="modal-loan__list">
          <div className="modal-loan__count">
            <div className="link-filters">
              <div className="link-filters__tag-wrapper">
                <a href="/" className="link-tag link-tag link-filters__tag">
                  {t("digitalText")}
                </a>
                <span className="link-filters__counter">
                  {digitalReservationsStillInQueue &&
                    digitalReservationsStillInQueue.length}
                </span>
              </div>
            </div>
          </div>
          {digitalReservationsStillInQueue && (
            <QueuedReservationsList
              digitalReservations={digitalReservationsStillInQueue}
              selectedReservations={selectedReservations}
              setCustomSelection={setCustomSelection}
            />
          )}
        </li>
      </ul>
    </div>
  );
};

export default StillInQueueModalContent;
