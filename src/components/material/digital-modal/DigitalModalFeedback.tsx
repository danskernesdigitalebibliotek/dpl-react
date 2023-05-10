import React from "react";
import { useModalButtonHandler } from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import ReservationForm from "../../reservation/forms/ReservationForm";

type DigitalModalFeedbackProps = {
  modalId: string;
  feedbackMessage: string | null;
};

const DigitalModalFeedback: React.FunctionComponent<
  DigitalModalFeedbackProps
> = ({ modalId, feedbackMessage }) => {
  const t = useText();
  const { close } = useModalButtonHandler();

  return (
    <ReservationForm
      cyData="order-digital-feedback"
      title={t("orderDigitalCopyFeedbackTitleText")}
      description={[feedbackMessage ?? ""]}
      onSubmit={() => close(modalId)}
      buttonLabel={t("orderDigitalCopyFeedbackButtonText")}
    />
  );
};

export default DigitalModalFeedback;
