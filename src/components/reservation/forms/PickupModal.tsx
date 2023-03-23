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
    />
  );
};

export default PickupModal;
