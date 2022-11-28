import React, { useEffect, useState } from "react";
import { Manifestation } from "../../../core/dbc-gateway/generated/graphql";
import { useGetPatronInformationByPatronIdV2 } from "../../../core/fbs/fbs";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import DigitalModalBody from "./DigitalModalBody";

export const digitalModalId = () => `digital-modal`;

type DigitalModalProps = { manifestation: Manifestation };

const DigitalModal: React.FunctionComponent<DigitalModalProps> = ({
  manifestation
}) => {
  const t = useText();
  const [email, setEmail] = useState<string>("");

  // Pre fill the email field with the patron's email
  const { data: patronData } = useGetPatronInformationByPatronIdV2();
  useEffect(() => {
    if (patronData?.patron?.emailAddress) {
      setEmail(patronData.patron.emailAddress);
    }
  }, [patronData]);

  const orderDigitalCopy = async () => {};

  return (
    <Modal
      modalId={digitalModalId()}
      screenReaderModalDescriptionText={t(
        "orderDigitalCopyModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t(
        "orderDigitalCopyModalCloseModalAriaLabelText"
      )}
    >
      <DigitalModalBody
        handleSubmit={orderDigitalCopy}
        email={email}
        handleOnChange={setEmail}
      />
    </Modal>
  );
};

export default DigitalModal;
