import * as React from "react";
import { FC, useCallback, useEffect, useState } from "react";
import { element, object } from "prop-types";
import {
  useDeleteReservations,
  useGetReservationsV2
} from "../../../../core/fbs/fbs";
import { ReservationDetailsV2 } from "../../../../core/fbs/model";
import { getPhysicalReservations } from "../../../../core/utils/helpers/general";
import {
  useDeleteV1UserReservationsIdentifier,
  useGetV1UserReservations
} from "../../../../core/publizon/publizon";
import { useText } from "../../../../core/utils/text";
import {
  Reservation,
  ReservationListResult
} from "../../../../core/publizon/model";
import QueuedReservationsList from "./queued-reservations-list";
import CheckBox from "../../../../components/checkbox/Checkbox";
import ArrowWhite from "../../../../components/atoms/icons/arrow/arrow-white";
import { useModalButtonHandler } from "../../../../core/utils/modal";

interface StillInQueueModalContentProps {
  modalId: string;
}
const StillInQueueModalContent: FC<StillInQueueModalContentProps> = ({
  modalId
}) => {
  const t = useText();
  const { close } = useModalButtonHandler();
  const [
    physicalReservationsStillInQueue,
    setPhysicalReservationsStillInQueue
  ] = useState<ReservationDetailsV2[]>();
  const [digitalReservationsStillInQueue, setDigitalReservationsStillInQueue] =
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
  const { mutate: deletePhysicalReservation } = useDeleteReservations();
  const { mutate: deleteDigitalReservation } =
    useDeleteV1UserReservationsIdentifier();
  useEffect(() => {
    if (physicalReservations) {
      const reservations = getPhysicalReservations(physicalReservations);
      console.log(reservations);
      if (reservations) {
        setPhysicalReservationsStillInQueue(reservations);
      }
    }
  }, [physicalReservations]);

  useEffect(() => {
    if (
      physicalReservationsStillInQueue &&
      digitalReservationsStillInQueue &&
      !allSelectableReservations
    ) {
      const fausts = physicalReservationsStillInQueue.map((pr) => {
        return { [pr.recordId]: pr.reservationId } as unknown as {
          [key: string]: string;
        };
      });
      const idents = digitalReservationsStillInQueue.map((dr) => {
        return { [dr.identifier as string]: dr.identifier } as {
          [key: string]: string;
        };
      });
      const selectableReservations = [...fausts, ...idents];

      if (selectableReservations.length > 0) {
        setAllSelectableReservations(selectableReservations);
      }
    }
  }, [
    physicalReservationsStillInQueue,
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
    (elementId: string, reservationId: string) => {
      if (Object.keys(selectedReservations).includes(elementId as string)) {
        // Slet element fra objekt
        // sæt ny værdi
        // setSelectedReservations();
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

  const removeSelectedReservations = () => {
    if (selectedReservations.length > 0) {
      // Publizon
      // deleteV1UserReservationsIdentifier
      selectedReservations.map((reservation) => {
        switch (reservation.length) {
          case "8": // Physical Loans
            deletePhysicalReservation(
              {
                params: { reservationid: [Number(reservation)] }
              },
              {
                onSuccess: () => {
                  close(modalId);
                },
                // todo error handling, missing in figma
                onError: () => {
                  close(modalId);
                }
              }
            );
            break;
          case "13": // Digital Loans
            console.log("digitalLoan");
            break;
          default:
            return false;
        }
        return false;
      });
      // deletePhysicalReservation(
      //   {
      //     params: { reservationid: [Number(reservation.faust)] }
      //   },
      //   {
      //     onSuccess: () => {
      //       queryClient.invalidateQueries(getGetReservationsV2QueryKey());
      //       close(modalId);
      //     },
      //     // todo error handling, missing in figma
      //     onError: () => {
      //       close(modalId);
      //     }
      //   }
      // );
      // deleteDigitalReservation(
      //   {
      //     identifier: reservation.identifier
      //   },
      //   {
      //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //     onSuccess: (result) => {
      //       close(modalId);
      //     },
      //     // todo error handling, missing in figma
      //     onError: () => {
      //       close(modalId);
      //     }
      //   }
      // );
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
            <ArrowWhite />
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
