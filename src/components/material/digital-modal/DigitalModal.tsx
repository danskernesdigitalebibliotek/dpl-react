import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { DigitalArticleService } from "../../../core/dbc-gateway/generated/graphql";
import { useGetPatronInformationByPatronIdV2 } from "../../../core/fbs/fbs";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import DigitalModalBody from "./DigitalModalBody";
import DigitalModalError from "./DigitalModalError";
import DigitalModalSuccess from "./DigitalModalSuccess";
import { createDigitalModalId, orderDigitalCopy } from "./helper";

type DigitalModalProps = { digitalArticleIssn: DigitalArticleService["issn"] };

const DigitalModal: React.FunctionComponent<DigitalModalProps> = ({
  digitalArticleIssn
}) => {
  const modalId = createDigitalModalId(digitalArticleIssn);
  const t = useText();
  const [responseState, setResponseState] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const { mutate, isLoading } = useMutation(orderDigitalCopy, {
    onSuccess: (data) => {
      if (data.status === 204) {
        setResponseState("success");
        return;
      }
      setResponseState("error");
    }
  });

  // Pre fill the email field with the patron's email
  const { data: patronData } = useGetPatronInformationByPatronIdV2();
  useEffect(() => {
    if (patronData?.patron?.emailAddress) {
      setEmail(patronData.patron.emailAddress);
    }
  }, [patronData]);

  return (
    <Modal
      modalId={modalId}
      screenReaderModalDescriptionText={t(
        "orderDigitalCopyModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t(
        "orderDigitalCopyModalCloseModalAriaLabelText"
      )}
    >
      {responseState === "success" && <DigitalModalSuccess modalId={modalId} />}
      {responseState === "error" && <DigitalModalError modalId={modalId} />}
      {responseState === null && (
        <DigitalModalBody
          handleSubmit={() => mutate()}
          email={email}
          handleOnChange={setEmail}
          isLoading={isLoading}
        />
      )}
    </Modal>
  );
};

export default DigitalModal;
