import React from "react";
import { AgencyBranch } from "../../../core/fbs/model";
import { useText } from "../../../core/utils/text";
import ModalReservationFormSelect from "./ModalReservationFormSelect";
import { RequestStatus } from "../../../core/utils/types/request";

export interface PickupModalProps {
  branches: AgencyBranch[];
  defaultBranch: string;
  selectBranchHandler: (value: string) => void;
  saveCallback?: () => void;
  reservationStatus?: RequestStatus;
  setReservationStatus?: (status: RequestStatus) => void;
}

const PickupModal = ({
  branches,
  defaultBranch,
  selectBranchHandler,
  saveCallback,
  reservationStatus,
  setReservationStatus
}: PickupModalProps) => {
  const t = useText();

  const formatBranches = branches.map((branch) => ({
    value: branch.branchId,
    label: branch.title
  }));

  return (
    <ModalReservationFormSelect
      type="pickup"
      header={{
        title: t("modalReservationFormPickupHeaderTitleText"),
        description: [t("modalReservationFormPickupHeaderDescriptionText")]
      }}
      items={formatBranches}
      defaultSelectedItem={defaultBranch}
      selectHandler={selectBranchHandler}
      ariaLabel={t("modalReservationFormPickupLabelText")}
      saveCallback={saveCallback}
      reservationStatus={reservationStatus}
      setReservationStatus={setReservationStatus}
    />
  );
};

export default PickupModal;
