import * as React from "react";
import { FC, useEffect, useState } from "react";
import { useGetReservationsV2 } from "../../../core/fbs/fbs";
import { ReservationDetailsV2 } from "../../../core/fbs/model";
import {
  getDigitalReservations,
  getPhysicalReservations
} from "../../../core/utils/helpers/general";
import { useGetV1UserReservations } from "../../../core/publizon/publizon";
import { useText } from "../../../core/utils/text";
import {
  Reservation,
  ReservationListResult
} from "../../../core/publizon/model";
import QueuedReservationsList from "./queued-reservations-list";

export interface StillInQueueModalContentProps {
  HelloW: string;
}

const StillInQueueModalContent: FC<StillInQueueModalContentProps> = ({
  HelloW
}) => {
  const t = useText();
  const [
    physicalReservationsStillInQueue,
    setPhysicalReservationsStillInQueue
  ] = useState<ReservationDetailsV2[]>();
  const [digitalReservationsStillInQueue, setDigitalReservationsStillInQueue] =
    useState<Reservation[]>();
  const { data: physicalReservations } = useGetReservationsV2();
  const { data: digitalReservations } = useGetV1UserReservations();
  useEffect(() => {
    if (physicalReservations) {
      const reservations = getPhysicalReservations(physicalReservations);
      if (reservations) {
        setPhysicalReservationsStillInQueue(reservations);
      }
    }
  }, [physicalReservations]);

  useEffect(() => {
    if (digitalReservations) {
      const { reservations } = digitalReservations;
      if (reservations) {
        setDigitalReservationsStillInQueue(reservations);
      }
    }
  }, [digitalReservations]);
  console.log(physicalReservationsStillInQueue);
  console.log(digitalReservationsStillInQueue);

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
          <input
            id="checkbox_id__0.4701588889139079"
            className="checkbox__input"
            type="checkbox"
          />
          <label className="checkbox__label">
            <span className="checkbox__icon">
              <svg width="20px" height="20px">
                <polyline
                  points="1.5 6 4.5 9 10.5 1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </span>
            <div>
              <span className="checkbox__text text-small-caption color-secondary-gray ">
                {t("chooseAllText")}
              </span>
            </div>
          </label>
        </div>
        <button
          type="button"
          className="btn-primary btn-filled btn-small arrow__hover--right-small undefined"
        >
          {t("removeAllReservationsText")} (2){" "}
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
                <span className="link-filters__counter">1</span>
              </div>
            </div>
          </div>
          {physicalReservationsStillInQueue && (
            <QueuedReservationsList
              reservations={physicalReservationsStillInQueue}
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
                <span className="link-filters__counter">1</span>
              </div>
            </div>
          </div>
          <ul className="modal-loan__list-materials">
            <li>
              <div className="list-materials list-materials__selected">
                <div className="list-materials__checkbox mr-32">
                  <div className="checkbox">
                    <input
                      id="checkbox_id__0.43197340400572903"
                      className="checkbox__input"
                      type="checkbox"
                      aria-label="Vælg materiale"
                    />
                    <label
                      className="checkbox__label"
                      htmlFor="checkbox_id__0.43197340400572903"
                    >
                      <span className="checkbox__icon">
                        <svg width="20px" height="20px">
                          <polyline
                            points="1.5 6 4.5 9 10.5 1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>
                      </span>
                      <div />
                    </label>
                  </div>
                </div>
                <div className="list-materials__content">
                  <div className="list-materials__content-status">
                    <div className="status-label status-label--outline ">
                      bog
                    </div>
                    <div className="status-label status-label--warning list-materials__content-status-label">
                      UDLØBER 20.11.21
                    </div>
                  </div>
                  <p className="text-header-h5 mt-8">Audrey Hepburn</p>
                  <p className="text-small-caption">
                    Af Isabel Sánchez Vegara, Amaia Arrazola (2018)
                  </p>
                </div>
                <div className="list-materials__status">
                  <div className="status-label status-label--warning ">
                    UDLØBER 20.11.21
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default StillInQueueModalContent;
