import React from "react";
import { useModalButtonHandler } from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import ReservationForm from "../../reservation/forms/ReservationForm";

type DigitalModalFeedbackProps = {
  modalId: string;
  isError: boolean;
  feedbackMessage: string | null;
};

const DigitalModalFeedback: React.FunctionComponent<
  DigitalModalFeedbackProps
> = ({ modalId, isError, feedbackMessage }) => {
  const t = useText();
  const { close } = useModalButtonHandler();

  return (
    <ReservationForm
      cyData="order-digital-feedback"
      title={
        isError
          ? t("orderDigitalCopyErrorTitleText")
          : t("orderDigitalCopyFeedbackTitleText")
      }
      description={
        isError
          ? [t("orderDigitalCopyErrorDescriptionText")]
          : [feedbackMessage ?? ""]
      }
      onSubmit={() => close(modalId)}
      buttonLabel={
        isError
          ? t("orderDigitalCopyErrorButtonText")
          : t("orderDigitalCopyFeedbackButtonText")
      }
    />
  );
};

export default DigitalModalFeedback;
