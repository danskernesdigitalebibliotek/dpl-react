import React, { FC, useEffect, useState } from "react";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import GroupModalContent from "../../../components/GroupModal/GroupModalContent";
import { Button } from "../../../components/Buttons/Button";
import SimpleModalHeader from "../../../components/GroupModal/SimpleModalHeader";
import { getModalIds } from "../../../core/utils/helpers/general";
import GroupModalReservationsList from "../../../components/GroupModal/GroupModalReservationsList";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import StatusCircleModalHeader from "../../../components/GroupModal/StatusCircleModalHeader";
import StatusCircle from "../../loan-list/materials/utils/status-circle";
import useReservations from "../../../core/utils/useReservations";

interface ReservationGroupModalProps {
  pageSize: number;
  modalId: string;
  setReservationsToDelete: (reservations: string[]) => void;
  openDetailsModal: (modalId: string) => void;
}

const ReservationGroupModal: FC<ReservationGroupModalProps> = ({
  pageSize,
  modalId,
  setReservationsToDelete,
  openDetailsModal
}) => {
  const { fbs, publizon } = useReservations();
  const t = useText();
  const { reservationsReady, reservationsQueued } = getModalIds();
  const [materialsToDelete, setMaterialsToDelete] = useState<string[]>([]);

  let physicalReservations: ReservationType[] = [];
  let digitalReservations: ReservationType[] = [];

  if (modalId === reservationsReady) {
    physicalReservations = fbs.readyToLoan;
    digitalReservations = publizon.readyToLoan;
  }

  if (modalId === reservationsQueued) {
    physicalReservations = fbs.queued;
    digitalReservations = publizon.queued;
  }

  useEffect(() => {
    setMaterialsToDelete([]);
  }, [modalId]);

  const selectableReservations = [
    ...physicalReservations,
    ...digitalReservations
  ]
    .map(
      ({ identifier, reservationId }) =>
        identifier || String(reservationId) || ""
    )
    .filter((id) => id !== "");

  const selectMaterials = (materialIds: string[]) => {
    setMaterialsToDelete(materialIds);
  };

  const deleteMaterialsModal = () => {
    setReservationsToDelete(materialsToDelete);
    setMaterialsToDelete([]);
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
                disabled={!materialsToDelete.length}
                collapsible={false}
                size="small"
                variant="filled"
                onClick={() => deleteMaterialsModal()}
              />
            }
            amountOfSelectableMaterials={selectableReservations.length}
            selectableMaterials={selectableReservations}
            selectedMaterials={materialsToDelete}
            selectMaterials={selectMaterials}
          >
            <GroupModalReservationsList
              openDetailsModal={openDetailsModal}
              header={t("physicalReservationsHeaderText")}
              materials={physicalReservations}
              pageSize={pageSize}
              selectedMaterials={materialsToDelete}
              selectMaterials={selectMaterials}
              marginBottonPager={digitalReservations.length === 0}
            />
            <GroupModalReservationsList
              marginBottonPager
              openDetailsModal={openDetailsModal}
              header={t("digitalReservationsHeaderText")}
              materials={digitalReservations}
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
