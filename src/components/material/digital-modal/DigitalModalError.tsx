import React from "react";
import { useModalButtonHandler } from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import ReservationForm from "../../reservation/forms/ReservationForm";

type DigitalModalBodyProps = {
  modalId: string;
};

const DigitalModalError: React.FunctionComponent<DigitalModalBodyProps> = ({
  modalId
}) => {
  const t = useText();
  const { close } = useModalButtonHandler();

  return (
    <ReservationForm
      title={t("orderDigitalCopyErrorTitleText")}
      description={[t("orderDigitalCopyErrorDescriptionText")]}
      onSubmit={() => close(modalId)}
      buttonLabel={t("orderDigitalCopyErrorButtonText")}
    />
  );
};

export default DigitalModalError;
