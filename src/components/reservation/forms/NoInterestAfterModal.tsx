import React from "react";
import { useText } from "../../../core/utils/text";
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

  const hardcodedInterestPeriods = [
    {
      branchId: "30",
      title: t("oneMonthText")
    },
    {
      branchId: "60",
      title: t("twoMonthsText")
    },
    {
      branchId: "90",
      title: t("threeMonthsText")
    },
    {
      branchId: "180",
      title: t("sixMonthsText")
    },
    {
      branchId: "360",
      title: t("oneYearText")
    }
  ];

  return (
    <ModalReservationFormSelect
      type="interestPeriod"
      header={{
        title: t("modalReservationFormNoInterestAfterHeaderTitleText"),
        description: [t("modalReservationFormNoInterestAfterHeaderDescriptionText")]
      }}
      items={hardcodedInterestPeriods}
      defaultSelectedItem={selectedInterest}
      selectHandler={setSelectedInterest}
    />
  );
};

export default NoInterestAfterModal;
