import React, { useState } from "react";
import { useText } from "../../../core/utils/text";
import TextInput from "../../atoms/input/TextInput";
import ReservationForm from "../../reservation/forms/ReservationForm";

type DigitalModalBodyProps = {
  userEmail: string;
  handleSubmit: (email: string) => void;
  isLoading: boolean;
};

const DigitalModalBody: React.FunctionComponent<DigitalModalBodyProps> = ({
  userEmail,
  handleSubmit,
  isLoading
}) => {
  const t = useText();
  const [email, setEmail] = useState<string>(userEmail);

  const handleOnSubmit = () => {
    handleSubmit(email);
  };

  return (
    <ReservationForm
      title={t("orderDigitalCopyTitleText")}
      description={[t("orderDigitalCopyDescriptionText")]}
      onSubmit={handleOnSubmit}
      buttonLabel={
        isLoading
          ? t("orderDigitalCopyButtonLoadingText")
          : t("orderDigitalCopyButtonText")
      }
      disabledButton={isLoading}
    >
      <TextInput
        type="email"
        label="Email"
        id="email-order-digital-copy"
        value={email}
        onChange={setEmail}
      />
    </ReservationForm>
  );
};

export default DigitalModalBody;
