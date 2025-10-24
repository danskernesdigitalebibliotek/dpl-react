import React, { useEffect, useState, FC } from "react";
import { useConfig } from "../../core/utils/config";
import { useText } from "../../core/utils/text";
import TextInput from "../../components/forms/input/TextInput";

interface PincodeSectionProps {
  changePincode: (newPin: string | null) => void;
  required: boolean;
  setIsPinValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const PincodePatronSection: FC<PincodeSectionProps> = ({
  changePincode,
  required,
  setIsPinValid
}) => {
  const t = useText();
  const config = useConfig();

  const pincodeLengthMin = parseInt(config("pincodeLengthMinConfig"), 10);
  const pincodeLengthMax = parseInt(config("pincodeLengthMaxConfig"), 10);
  const [pincodeValidation, setPincodeValidation] = useState<string>();
  const [pincode, setPincode] = useState<string>("");
  const [confirmPincode, setConfirmPincode] = useState<string>("");

  useEffect(() => {
    // Set pincode to null, so it is only saved if it is validated
    changePincode(null);
    setPincodeValidation("");
    if (pincode && confirmPincode) {
      if (
        pincode.length > pincodeLengthMax ||
        pincode.length < pincodeLengthMin
      ) {
        setIsPinValid(false);
        setPincodeValidation(
          t("patronPagePincodeTooShortValidationText", {
            placeholders: {
              "@pincodeLengthMin": pincodeLengthMin,
              "@pincodeLengthMax": pincodeLengthMax
            }
          })
        );
        return;
      }
      if (pincode !== confirmPincode) {
        setIsPinValid(false);
        setPincodeValidation(t("patronPagePincodesNotTheSameText"));
        return;
      }
      setIsPinValid(true);
      changePincode(confirmPincode);
    }
  }, [
    setIsPinValid,
    changePincode,
    confirmPincode,
    pincode,
    pincodeLengthMax,
    pincodeLengthMin,
    t
  ]);

  return (
    <section data-cy="pincode-section" className="create-patron-page__row">
      <div className="create-patron-page__row dpl-input__double-row">
        <TextInput
          className="dpl-input dpl-input--double"
          id="pincode-input"
          type="password"
          pattern="[0-9]*"
          required={required}
          inputmode="numeric"
          onChange={(newPin) => setPincode(newPin)}
          value={pincode}
          label={t("patronPagePincodeLabelText")}
          validation={pincodeValidation}
          description={t("pincodeSectionDescriptionText")}
        />
        <TextInput
          className="dpl-input dpl-input--double"
          id="pincode-confirm-input"
          pattern="[0-9]*"
          required={required}
          inputmode="numeric"
          type="password"
          onChange={(newPin) => setConfirmPincode(newPin)}
          value={confirmPincode}
          label={t("patronPageConfirmPincodeLabelText")}
          description={t("pincodeSectionDescriptionText")}
        />
      </div>
    </section>
  );
};

export default PincodePatronSection;
