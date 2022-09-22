import React from "react";
import { useText } from "../../../core/utils/text";
import { hardcodedInterestPeriods } from "../helper";
import ModalReservationFormSelect from "./ModalReservationFormSelect";

export interface PickupModalProps {
  selectedInterest: string;
  setSelectedInterest: (value: string) => void;
}

const NoInterestAfterModal = ({
  selectedInterest,
  setSelectedInterest
}: PickupModalProps) => {
  const t = useText();

  const formatInterestPeriods = Object.entries(hardcodedInterestPeriods(t)).map(
    ([key, value]) => ({
      value: key,
      label: value
    })
  );

  return (
    <ModalReservationFormSelect
      type="interestPeriod"
      header={{
        title: t("modalReservationFormNoInterestAfterHeaderTitleText"),
        description: [
          t("modalReservationFormNoInterestAfterHeaderDescriptionText")
        ]
      }}
      items={formatInterestPeriods}
      defaultSelectedItem={selectedInterest}
      selectHandler={setSelectedInterest}
    />
  );
};

export default NoInterestAfterModal;
