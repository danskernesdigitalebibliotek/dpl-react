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
import { useDeleteV1UserReservationsIdentifier } from "../../../core/publizon/publizon";
import GroupModalReservationsList from "../../../components/GroupModal/GroupModalReservationsList";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import StatusCircleModalHeader from "../../../components/GroupModal/StatusCircleModalHeader";
import { isFaust } from "../util/helpers";
import { getReadyForPickup } from "../../reservation-list/utils/helpers";

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
    if (modalId === reservationsQueued) {
      setSelectableReservations([
        ...displayedreservations
          .map(({ identifier, faust }) => identifier || faust || "")
          .filter((id) => id !== "")
      ]);
    } else {
      setSelectableReservations([
        ...displayedreservations
          .map(({ identifier, faust }) => identifier || faust || "")
          .filter((id) => id !== "")
      ]);
    }
  }, [displayedreservations, modalId, reservationsQueued]);

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
      classNames="modal-loan"
      closeModalAriaLabelText={t(
        "groupModalReservationsCloseModalAriaLabelText"
      )}
      screenReaderModalDescriptionText={t(
        "groupModalReservationsLoansAriaDescriptionText"
      )}
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
              materials={displayedreservations}
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
