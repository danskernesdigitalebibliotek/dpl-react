import React from "react";
import { AgencyBranch } from "../../../core/fbs/model";
import { useText } from "../../../core/utils/text";
import ModalReservationFormSelect from "./ModalReservationFormSelect";

export interface PickupModalProps {
  branches: AgencyBranch[];
  defaultBranch: string;
  selectBranchHandler: (value: string) => void;
}

const PickupModal = ({
  branches,
  defaultBranch,
  selectBranchHandler
}: PickupModalProps) => {
  const t = useText();

  return (
    <ModalReservationFormSelect
      type="pickup"
      header={{
        title: t("modalReservationFormPickupHeaderTitleText"),
        description: [t("modalReservationFormPickupHeaderDescriptionText")]
      }}
      items={branches}
      defaultSelectedItem={defaultBranch}
      selectHandler={selectBranchHandler}
    />
  );
};

export default PickupModal;
