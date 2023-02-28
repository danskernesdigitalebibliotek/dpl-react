import React, { useEffect, useState, FC } from "react";
import TextInput from "../../../components/atoms/input/TextInput";
import { useConfig } from "../../../core/utils/config";
import { useText } from "../../../core/utils/text";

interface PincodeSectionProps {
  changePincode: (newPin: string | null) => void;
}

const PincodeSection: FC<PincodeSectionProps> = ({ changePincode }) => {
  const t = useText();
  const config = useConfig();

  const pincodeLength = parseInt(config("pincodeLengthConfig"), 10) || 4;
  const [pincodeValidation, setPincodeValidation] = useState<string>();
  const [pincode, setPincode] = useState<string>("");
  const [confirmPincode, setConfirmPincode] = useState<string>("");

  useEffect(() => {
    // Set pincode to null, so it is only saved if it is validated
    changePincode(null);
    setPincodeValidation("");
    if (pincode && confirmPincode) {
      if (pincode.length !== pincodeLength) {
        setPincodeValidation(
          t("patronPagePincodeTooShortValidationText", {
            placeholders: {
              "@pincodeLength": pincodeLength
            }
          })
        );
        return;
      }
      if (pincode !== confirmPincode) {
        setPincodeValidation(t("patronPagePincodesNotTheSameText"));
        return;
      }
      changePincode(confirmPincode);
    }
  }, [changePincode, confirmPincode, pincode, pincodeLength, t]);

  return (
    <section data-cy="pincode-section">
      <h2 className="text-body-small-regular mt-32 mb-16">
        {t("patronPageChangePincodeHeaderText")}
      </h2>
      <p className="text-body-small-regular">
        {t("patronPageChangePincodeBodyText")}
      </p>
      <div className="dpl-pincode-container">
        <TextInput
          className="patron__input patron__input--desktop"
          id="pincode-input"
          type="password"
          pattern="[0-9]*"
          inputmode="numeric"
          onChange={(newPin) => setPincode(newPin)}
          value={pincode}
          label={t("patronPagePincodeLabelText")}
          validation={pincodeValidation}
        />
        <TextInput
          className="patron__input patron__input--desktop"
          id="pincode-confirm-input"
          pattern="[0-9]*"
          inputmode="numeric"
          type="password"
          onChange={(newPin) => setConfirmPincode(newPin)}
          value={confirmPincode}
          label={t("patronPageConfirmPincodeLabelText")}
        />
      </div>
    </section>
  );
};

export default PincodeSection;
