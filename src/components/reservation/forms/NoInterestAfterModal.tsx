import React from "react";
import { useText } from "../../../core/utils/text";
import ModalReservationFormSelect from "./ModalReservationFormSelect";
import { useConfig } from "../../../core/utils/config";
import { Option } from "../../Dropdown/Dropdown";
import { RequestStatus } from "../../../core/utils/types/request";

export interface PickupModalProps {
  selectedInterest: number;
  setSelectedInterest: (value: number) => void;
  saveCallback?: () => void;
  reservationStatus?: RequestStatus;
  setReservationStatus?: (status: RequestStatus) => void;
}

const NoInterestAfterModal = ({
  selectedInterest,
  setSelectedInterest,
  saveCallback,
  reservationStatus,
  setReservationStatus
}: PickupModalProps) => {
  const t = useText();
  const config = useConfig();
  const interstPeriods = config<Option[]>("interestPeriodsConfig", {
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
      saveCallback={saveCallback}
      reservationStatus={reservationStatus}
      setReservationStatus={setReservationStatus}
    />
  );
};

export default NoInterestAfterModal;
