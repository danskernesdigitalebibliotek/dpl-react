import React, { FC, useEffect, useState } from "react";
import check from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-check.svg";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import GroupModalContent from "../../../components/GroupModal/GroupModalContent";
import { Button } from "../../../components/Buttons/Button";
import SimpleModalHeader from "../../../components/GroupModal/SimpleModalHeader";
import {
  useDeleteReservations,
  useGetReservationsV2
} from "../../../core/fbs/fbs";
import {
  getColors,
  getModalIds,
  getPhysicalQueuedReservations,
  getReadyForPickup
} from "../../../core/utils/helpers/general";
import {
  useDeleteV1UserReservationsIdentifier,
  useGetV1UserReservations
} from "../../../core/publizon/publizon";
import { ReservationListResult } from "../../../core/publizon/model";
import GroupModalReservationsList from "../../../components/GroupModal/GroupModalReservationsList";
import { mapFBSReservationToReservationType } from "../../../core/utils/helpers/list-mapper";
import { ReservationType } from "../../../core/utils/types/reservation-type";
import StatusCircleIcon from "../../loan-list/materials/utils/status-circle-icon";
import ReservationCircleModalHeader from "../../../components/GroupModal/ReservationCircleModalHeader";
import StatusCircleModalHeader from "../../../components/GroupModal/StatusCircleModalHeader";

interface ReservationGroupModalProps {
  pageSize: number;
  modalId: string;
  openDetailsModal?: (modalId: string) => void;
}

const ReservationGroupModal: FC<ReservationGroupModalProps> = ({
  pageSize,
  openDetailsModal,
  modalId
}) => {
  const t = useText();
  const { reservationsReady, reservationsQueued } = getModalIds();
  const { success } = getColors();
  const { mutate: deletePhysicalReservation } = useDeleteReservations();
  const { mutate: deleteDigitalReservation } =
    useDeleteV1UserReservationsIdentifier();

  const [selectedReservations, setSelectedReservations] = useState<string[]>(
    []
  );
  const [materialsToDelete, setMaterialsToDelete] = useState<string[]>([]);

  const { data: physicalReservations } = useGetReservationsV2();
  const [physicalReservation, setPhysicalReservations] = useState<
    ReservationType[]
  >([]);
  const [selectableReservations, setSelectableReservations] = useState<
    string[]
  >([]);
  const [digitalReservations, setDigitalReservations] = useState<
    ReservationType[]
  >([]);
  const { data: digitalReservationsPublizon } =
    useGetV1UserReservations<ReservationListResult>();

  useEffect(() => {
    if (physicalReservations && modalId === reservationsReady) {
      const readyToLoan = getReadyForPickup(physicalReservations);
      if (readyToLoan) {
        setPhysicalReservations(
          mapFBSReservationToReservationType(readyToLoan)
        );
      }
    }

    if (physicalReservations && modalId === reservationsQueued) {
      const reservations = getPhysicalQueuedReservations(physicalReservations);
      if (reservations) {
        setPhysicalReservations(
          mapFBSReservationToReservationType(reservations)
        );
      }
    }
  }, [modalId, physicalReservations, reservationsQueued, reservationsReady]);

  useEffect(() => {
    if (digitalReservationsPublizon) {
      const { reservations } = digitalReservationsPublizon;
      if (reservations) {
        setDigitalReservations(reservations);
        setSelectableReservations(
          reservations
            .map(({ identifier }) => identifier || "")
            .filter((id) => id !== "")
        );
      }
    }
  }, [digitalReservationsPublizon]);

  // const removeSelectedReservations = () => {
  //   const selectedReservationsKeys = Object.keys(selectedReservations);
  //   const selectedReservationsValues = Object.values(selectedReservations);
  //   if (selectedReservationsKeys.length > 0) {
  //     selectedReservationsKeys.map((reservation) => {
  //       const index = selectedReservationsKeys.indexOf(reservation);
  //       const reservationToDelete = selectedReservationsValues[index];
  //       const reservationType = getReservationType(reservation);
  //       switch (reservationType) {
  //         case "physical":
  //           deletePhysicalReservation({
  //             params: { reservationid: [Number(reservationToDelete)] }
  //           });
  //           break;
  //         case "digital":
  //           deleteDigitalReservation({
  //             identifier: String(selectedReservationsValues)
  //           });
  //           break;
  //         default:
  //           return false;
  //       }
  //       close(modalId);
  //       return false;
  //     });
  //   }
  // };

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
                    "@amount": selectedReservations.length
                  }
                })}
                buttonType="none"
                disabled={false}
                collapsible={false}
                size="small"
                variant="filled"
                // onClick={() =>
                //   removeSelectedReservations(selectedReservations)
                // }
              />
            }
            amountOfSelectableMaterials={0}
            selectableMaterials={selectableReservations}
            selectedMaterials={selectedReservations}
            selectMaterials={selectMaterials}
          >
            <GroupModalReservationsList
              listHeader={
                modalId === reservationsQueued
                  ? t("physicalReservationsModalHeaderText")
                  : ""
              }
              materials={physicalReservation}
              pageSize={pageSize}
              selectedMaterials={[]}
              selectMaterials={selectMaterials}
              openDetailsModal={() => openDetailsModal}
            />
            {modalId === reservationsQueued && (
              <GroupModalReservationsList
                listHeader={t("digitalReservationsModalHeaderText")}
                materials={digitalReservations}
                pageSize={pageSize}
                selectedMaterials={[]}
                selectMaterials={selectMaterials}
                openDetailsModal={() => openDetailsModal}
              />
            )}
          </GroupModalContent>
        </div>
      </div>
    </Modal>
  );
};

export default ReservationGroupModal;
