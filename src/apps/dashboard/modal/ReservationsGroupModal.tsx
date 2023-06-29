import React, { FC, useEffect, useState } from "react";
import Modal, { useModalButtonHandler } from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import GroupModalContent from "../../../components/GroupModal/GroupModalContent";
import { Button } from "../../../components/Buttons/Button";
import SimpleModalHeader from "../../../components/GroupModal/SimpleModalHeader";
import { useDeleteReservations } from "../../../core/fbs/fbs";
import {
  getModalIds,
  getPhysicalQueuedReservations
} from "../../../core/utils/helpers/general";
import {
  useDeleteV1UserReservationsIdentifier,
  useGetV1UserReservations
} from "../../../core/publizon/publizon";
import GroupModalReservationsList from "../../../components/GroupModal/GroupModalReservationsList";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import StatusCircleModalHeader from "../../../components/GroupModal/StatusCircleModalHeader";
import { isFaust } from "../util/helpers";
import {
  getReadyForPickup,
  getReservedDigital
} from "../../reservation-list/utils/helpers";
import StatusCircle from "../../loan-list/materials/utils/status-circle";
import { mapPublizonReservationToReservationType } from "../../../core/utils/helpers/list-mapper";

interface ReservationGroupModalProps {
  pageSize: number;
  modalId: string;
  reservations: ReservationType[];
}

const ReservationGroupModal: FC<ReservationGroupModalProps> = ({
  pageSize,
  modalId,
  reservations
}) => {
  const t = useText();
  const { close } = useModalButtonHandler();
  const { reservationsReady, reservationsQueued } = getModalIds();
  const { mutate: deletePhysicalReservation } = useDeleteReservations();
  const { mutate: deleteDigitalReservation } =
    useDeleteV1UserReservationsIdentifier();

  const [materialsToDelete, setMaterialsToDelete] = useState<string[]>([]);
  const [displayedreservations, setDisplayedReservations] = useState<
    ReservationType[]
  >([]);
  const [selectableReservations, setSelectableReservations] = useState<
    string[]
  >([]);

  const { isSuccess: isSuccessPublizon, data: publizonData } =
    useGetV1UserReservations();

  const [displayedDigitalReservations, setDisplayedDigitalReservations] =
    useState<ReservationType[]>([]);
  const [digitalReservations, setDigitalReservations] = useState<
    ReservationType[]
  >([]);

  useEffect(() => {
    if (isSuccessPublizon && publizonData && publizonData.reservations) {
      const reservationType = mapPublizonReservationToReservationType(
        publizonData.reservations
      );
      setDigitalReservations(reservationType);
    } else if (!isSuccessPublizon) {
      setDigitalReservations([]);
    }
  }, [publizonData, isSuccessPublizon]);

  useEffect(() => {
    setMaterialsToDelete([]);
  }, [modalId]);

  useEffect(() => {
    if (reservations && modalId === reservationsReady) {
      const readyToLoan = getReadyForPickup(reservations);
      if (readyToLoan) {
        setDisplayedReservations(readyToLoan);
      }
    }

    if (reservations && modalId === reservationsQueued) {
      const queuedReservations = getPhysicalQueuedReservations(reservations);
      if (queuedReservations) {
        setDisplayedReservations(queuedReservations);
      }
    }
  }, [modalId, reservations, reservationsQueued, reservationsReady]);

  useEffect(() => {
    if (modalId === reservationsReady) {
      const readyForPickup = getReadyForPickup(digitalReservations);
      setDisplayedDigitalReservations(readyForPickup);
    } else {
      setDisplayedDigitalReservations(getReservedDigital(digitalReservations));
    }
  }, [digitalReservations, modalId, reservationsReady]);

  useEffect(() => {
    if (modalId === reservationsQueued) {
      setSelectableReservations([
        ...[...displayedreservations, ...displayedDigitalReservations]
          .map(({ identifier, faust }) => identifier || faust || "")
          .filter((id) => id !== "")
      ]);
    } else {
      setSelectableReservations([
        ...[...displayedreservations, ...displayedDigitalReservations]
          .map(({ identifier, faust }) => identifier || faust || "")
          .filter((id) => id !== "")
      ]);
    }
  }, [
    displayedDigitalReservations,
    displayedreservations,
    modalId,
    reservationsQueued
  ]);

  const removeSelectedReservations = () => {
    if (materialsToDelete.length > 0) {
      const reservationsToDelete = materialsToDelete
        .map((id) => Number(isFaust(id)))
        .filter((id) => id !== 0);
      const digitalMaterialsToDelete = materialsToDelete
        .map((id) => isFaust(id))
        .filter((id) => id !== null);

      deletePhysicalReservation({
        params: { reservationid: reservationsToDelete }
      });
      digitalMaterialsToDelete.forEach((id) =>
        deleteDigitalReservation({
          identifier: String(id)
        })
      );
      close(modalId as string);
    }
  };

  const selectMaterials = (materialIds: string[]) => {
    setMaterialsToDelete(materialIds);
  };

  return (
    <Modal
      modalId={modalId}
      closeModalAriaLabelText={t(
        "groupModalReservationsCloseModalAriaLabelText"
      )}
      screenReaderModalDescriptionText={t(
        "groupModalReservationsLoansAriaDescriptionText"
      )}
    >
      <div className="modal-loan">
        <div className="modal-loan__list">
          {modalId === reservationsQueued && (
            <SimpleModalHeader header={t("queuedReservationsText")} />
          )}
          {modalId === reservationsReady && (
            <StatusCircleModalHeader
              header={t("reservationsReadyForPickupText")}
              statusCircleComponent={<StatusCircle loanDate="" />}
            />
          )}
          <GroupModalContent
            buttonComponent={
              <Button
                label={t("removeAllReservationsText", {
                  placeholders: {
                    "@amount": materialsToDelete.length
                  }
                })}
                buttonType="none"
                disabled={false}
                collapsible={false}
                size="small"
                variant="filled"
                onClick={() => removeSelectedReservations()}
              />
            }
            amountOfSelectableMaterials={selectableReservations.length}
            selectableMaterials={selectableReservations}
            selectedMaterials={materialsToDelete}
            selectMaterials={selectMaterials}
          >
            <GroupModalReservationsList
              header={t("physicalReservationsHeaderText")}
              materials={displayedreservations}
              pageSize={pageSize}
              selectedMaterials={materialsToDelete}
              selectMaterials={selectMaterials}
              marginBottonPager={displayedDigitalReservations.length === 0}
            />
            <GroupModalReservationsList
              marginBottonPager
              header={t("digitalReservationsHeaderText")}
              materials={displayedDigitalReservations}
              pageSize={pageSize}
              selectedMaterials={materialsToDelete}
              selectMaterials={selectMaterials}
            />
          </GroupModalContent>
        </div>
      </div>
    </Modal>
  );
};

export default ReservationGroupModal;
