import React from "react";
import { useModalButtonHandler } from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import ReservationForm from "../../reservation/forms/ReservationForm";

type DigitalModalBodyProps = {
  modalId: string;
};

const DigitalModalSuccess: React.FunctionComponent<DigitalModalBodyProps> = ({
  modalId
}) => {
  const t = useText();
  const { close } = useModalButtonHandler();

  return (
    <ReservationForm
      title={t("orderDigitalCopySuccessTitleText")}
      description={[t("orderDigitalCopySuccessDescriptionText")]}
      onSubmit={() => close(modalId)}
      buttonLabel={t("orderDigitalCopySuccessButtonText")}
    />
  );
};

export default DigitalModalSuccess;
