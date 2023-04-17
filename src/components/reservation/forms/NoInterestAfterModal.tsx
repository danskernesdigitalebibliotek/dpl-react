import React from "react";
import { useText } from "../../../core/utils/text";
import { getInterestPeriods } from "../helper";
import ModalReservationFormSelect from "./ModalReservationFormSelect";

export interface PickupModalProps {
  selectedInterest: number;
  setSelectedInterest: (value: number) => void;
}

const NoInterestAfterModal = ({
  selectedInterest,
  setSelectedInterest
}: PickupModalProps) => {
  const t = useText();

  const formatInterestPeriods = Object.entries(getInterestPeriods(t)).map(
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
      defaultSelectedItem={String(selectedInterest)}
      selectHandler={(value: string) => setSelectedInterest(Number(value))}
    />
  );
};

export default NoInterestAfterModal;
