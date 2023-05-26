import React, { FC, useEffect, useState } from "react";
import Modal, { useModalButtonHandler } from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import GroupModalContent from "../../../components/GroupModal/GroupModalContent";
import { Button } from "../../../components/Buttons/Button";
import SimpleModalHeader from "../../../components/GroupModal/SimpleModalHeader";
import { useDeleteReservations } from "../../../core/fbs/fbs";
import {
  getModalIds,
  getPhysicalQueuedReservations,
  getReadyForPickup
} from "../../../core/utils/helpers/general";
import { useDeleteV1UserReservationsIdentifier } from "../../../core/publizon/publizon";
import GroupModalReservationsList from "../../../components/GroupModal/GroupModalReservationsList";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import StatusCircleModalHeader from "../../../components/GroupModal/StatusCircleModalHeader";
import { getReservedReservations, isFaust } from "../util/helpers";

interface ReservationGroupModalProps {
  pageSize: number;
  modalId: string;
  physicalReservations: ReservationType[];
  digitalReservations: ReservationType[];
}

const ReservationGroupModal: FC<ReservationGroupModalProps> = ({
  pageSize,
  modalId,
  digitalReservations,
  physicalReservations
}) => {
  const t = useText();
  const { close } = useModalButtonHandler();
  const { reservationsReady, reservationsQueued } = getModalIds();
  const { mutate: deletePhysicalReservation } = useDeleteReservations();
  const { mutate: deleteDigitalReservation } =
    useDeleteV1UserReservationsIdentifier();

  const [materialsToDelete, setMaterialsToDelete] = useState<string[]>([]);
  const [displayedPhysicalReservations, setDisplayedPhysicalReservations] =
    useState<ReservationType[]>([]);
  const [displayedDigitalReservations, setDisplayedDigitalReservations] =
    useState<ReservationType[]>(digitalReservations);
  const [selectableReservations, setSelectableReservations] = useState<
    string[]
  >([]);

  useEffect(() => {
    setMaterialsToDelete([]);
  }, [modalId]);

  useEffect(() => {
    if (digitalReservations) {
      setDisplayedDigitalReservations(
        getReservedReservations(digitalReservations)
      );
    }
  }, [digitalReservations]);

  useEffect(() => {
    if (physicalReservations && modalId === reservationsReady) {
      const readyToLoan = getReadyForPickup(physicalReservations);
      if (readyToLoan) {
        setDisplayedPhysicalReservations(readyToLoan);
      }
    }

    if (physicalReservations && modalId === reservationsQueued) {
      const reservations = getPhysicalQueuedReservations(physicalReservations);
      if (reservations) {
        setDisplayedPhysicalReservations(reservations);
      }
    }
  }, [modalId, physicalReservations, reservationsQueued, reservationsReady]);

  useEffect(() => {
    if (modalId === reservationsQueued) {
      setSelectableReservations([
        ...displayedPhysicalReservations
          .map(({ identifier, faust }) => identifier || faust || "")
          .filter((id) => id !== ""),
        ...displayedDigitalReservations
          .map(({ identifier, faust }) => identifier || faust || "")
          .filter((id) => id !== "")
      ]);
    } else {
      setSelectableReservations([
        ...displayedPhysicalReservations
          .map(({ identifier, faust }) => identifier || faust || "")
          .filter((id) => id !== "")
      ]);
    }
  }, [
    displayedDigitalReservations,
    displayedPhysicalReservations,
    modalId,
    reservationsQueued
  ]);

  const removeSelectedReservations = () => {
    if (materialsToDelete.length > 0) {
      const physicalReservationsToDelete = materialsToDelete
        .map((id) => Number(isFaust(id)))
        .filter((id) => id !== 0);
      const digitalMaterialsToDelete = materialsToDelete
        .map((id) => isFaust(id))
        .filter((id) => id !== null);

      deletePhysicalReservation({
        params: { reservationid: physicalReservationsToDelete }
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
      classNames="modal-loan"
      closeModalAriaLabelText={t("groupModalCloseModalAriaLabelText")}
      screenReaderModalDescriptionText={t("groupModalAriaDescriptionText")}
    >
      <div className="modal-loan">
        <div className="modal-loan__container">
          {modalId === reservationsQueued && (
            <SimpleModalHeader header={t("queuedReservationsText")} />
          )}
          {modalId === reservationsReady && (
            <StatusCircleModalHeader
              header={t("reservationsReadyForPickupText")}
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
              listHeader={
                modalId === reservationsQueued
                  ? t("physicalReservationsModalHeaderText")
                  : ""
              }
              materials={displayedPhysicalReservations}
              pageSize={pageSize}
              selectedMaterials={materialsToDelete}
              selectMaterials={selectMaterials}
            />
            {modalId === reservationsQueued && (
              <GroupModalReservationsList
                listHeader={t("digitalReservationsModalHeaderText")}
                materials={displayedDigitalReservations}
                pageSize={pageSize}
                selectedMaterials={materialsToDelete}
                selectMaterials={selectMaterials}
              />
            )}
          </GroupModalContent>
        </div>
      </div>
    </Modal>
  );
};

export default ReservationGroupModal;
