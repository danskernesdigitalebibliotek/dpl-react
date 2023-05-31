import React from "react";
import { useText } from "../../../core/utils/text";
import ModalReservationFormSelect from "./ModalReservationFormSelect";
import { useConfig } from "../../../core/utils/config";
import { OptionsProps } from "../../list-details-dropdown/list-details-dropdown";

export interface PickupModalProps {
  selectedInterest: number;
  setSelectedInterest: (value: number) => void;
}

const NoInterestAfterModal = ({
  selectedInterest,
  setSelectedInterest
}: PickupModalProps) => {
  const t = useText();
  const config = useConfig();
  const interstPeriods = config<OptionsProps[]>("interestPeriodsConfig", {
    transformer: "jsonParse"
  });

  return (
    <ModalReservationFormSelect
      type="interestPeriod"
      header={{
        title: t("modalReservationFormNoInterestAfterHeaderTitleText"),
        description: [
          t("modalReservationFormNoInterestAfterHeaderDescriptionText")
        ]
      }}
      items={interstPeriods}
      defaultSelectedItem={String(selectedInterest)}
      selectHandler={(value: string) => setSelectedInterest(Number(value))}
      ariaLabel={t("modalReservationFormNoInterestAfterLabelText")}
    />
  );
};

export default NoInterestAfterModal;
