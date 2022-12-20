import React from "react";
import { useModalButtonHandler } from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import ReservationForm from "../../reservation/forms/ReservationForm";

type DigitalModalFeedbackProps = {
  modalId: string;
  isError: boolean;
};

const DigitalModalFeedback: React.FunctionComponent<
  DigitalModalFeedbackProps
> = ({ modalId, isError }) => {
  const t = useText();
  const { close } = useModalButtonHandler();

  return (
    <ReservationForm
      cyData="order-digital-feedback"
      title={
        isError
          ? t("orderDigitalCopyErrorTitleText")
          : t("orderDigitalCopySuccessTitleText")
      }
      description={
        isError
          ? [t("orderDigitalCopyErrorDescriptionText")]
          : [t("orderDigitalCopySuccessDescriptionText")]
      }
      onSubmit={() => close(modalId)}
      buttonLabel={
        isError
          ? t("orderDigitalCopyErrorButtonText")
          : t("orderDigitalCopySuccessButtonText")
      }
    />
  );
};

export default DigitalModalFeedback;
