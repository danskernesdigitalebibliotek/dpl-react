import React, { Dispatch, SetStateAction } from "react";
import { useText } from "../../../core/utils/text";
import TextInput from "../../atoms/input/TextInput";
import ReservationForm from "../../reservation/forms/ReservationForm";

type DigitalModalBodyProps = {
  email: string;
  handleOnChange: Dispatch<SetStateAction<string>>;
  handleSubmit: () => void;
};

const DigitalModalBody: React.FunctionComponent<DigitalModalBodyProps> = ({
  email,
  handleOnChange,
  handleSubmit
}) => {
  const t = useText();

  return (
    <ReservationForm
      title={t("orderDigitalCopyTitleText")}
      description={[t("orderDigitalCopyDescriptionText")]}
      onSubmit={handleSubmit}
      buttonLabel={t("orderDigitalCopyButtonText")}
    >
      <TextInput
        type="email"
        label="Email"
        id="email-order-digital-copy"
        value={email}
        onChange={handleOnChange}
      />
    </ReservationForm>
  );
};

export default DigitalModalBody;
