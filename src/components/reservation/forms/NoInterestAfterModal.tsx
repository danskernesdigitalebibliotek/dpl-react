import React from "react";
import { useText } from "../../../core/utils/text";
import ModalReservationFormSelect from "./ModalReservationFormSelect";
import { useConfig } from "../../../core/utils/config";
import { RequestStatus } from "../../../core/utils/types/request";
import { Periods } from "../types";
import { FormSelectValue } from "./types";

interface NoInterestAfterModalProps {
  selectedInterest: number;
  setSelectedInterest: (value: number) => void;
  saveCallback?: <TValue extends FormSelectValue>(value: TValue) => void;
  reservationStatus: RequestStatus;
  setReservationStatus?: (status: RequestStatus) => void;
}

const NoInterestAfterModal = ({
  selectedInterest,
  setSelectedInterest,
  saveCallback,
  reservationStatus,
  setReservationStatus
}: NoInterestAfterModalProps) => {
  const t = useText();
  const config = useConfig();
  const interstPeriods = config<Periods>("interestPeriodsConfig", {
    transformer: "jsonParse"
  });

  return (
    <ModalReservationFormSelect<number>
      type="interestPeriod"
      header={{
        title: t("modalReservationFormNoInterestAfterHeaderTitleText"),
        description: [
          t("modalReservationFormNoInterestAfterHeaderDescriptionText")
        ]
      }}
      items={interstPeriods.interestPeriods}
      defaultSelectedItem={selectedInterest}
      selectHandler={(value: FormSelectValue) => {
        setSelectedInterest(Number(value));
      }}
      ariaLabel={t("modalReservationFormNoInterestAfterLabelText")}
      saveCallback={saveCallback}
      reservationStatus={reservationStatus}
      setReservationStatus={setReservationStatus}
    />
  );
};

export default NoInterestAfterModal;
