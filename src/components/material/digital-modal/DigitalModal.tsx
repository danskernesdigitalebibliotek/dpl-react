import React, { useEffect, useState } from "react";
import { useDplDasDigitalArticleOrderPOST } from "../../../core/dpl-cms/dpl-cms";
import { useGetPatronInformationByPatronIdV2 } from "../../../core/fbs/fbs";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { IssnId, Pid } from "../../../core/utils/types/ids";
import DigitalModalBody from "./DigitalModalBody";
import DigitalModalFeedback from "./DigitalModalFeedback";
import { createDigitalModalId } from "./helper";

type DigitalModalProps = {
  digitalArticleIssn: IssnId;
  pid: Pid;
};

const DigitalModal: React.FunctionComponent<DigitalModalProps> = ({
  digitalArticleIssn,
  pid
}) => {
  const modalId = createDigitalModalId(digitalArticleIssn);
  const t = useText();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const {
    mutate: articleOrder,
    isLoading: articleOrderLoading,
    isSuccess: articleOrderSuccess,
    isError: articleOrderError
  } = useDplDasDigitalArticleOrderPOST();

  const orderDigitalCopy = (email: string) => {
    articleOrder({
      data: {
        pid,
        email
      }
    });
  };

  // Pre fill the email field with the patron's email or set it to an empty string
  const { data: patronData } = useGetPatronInformationByPatronIdV2();
  useEffect(() => {
    if (!patronData) return;
    if (patronData.patron?.emailAddress) {
      setUserEmail(patronData.patron.emailAddress);
      return;
    }
    setUserEmail("");
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
      {(articleOrderSuccess || articleOrderError) && (
        <DigitalModalFeedback modalId={modalId} isError={articleOrderError} />
      )}

      {!articleOrderSuccess &&
        !articleOrderError &&
        typeof userEmail === "string" && (
          <DigitalModalBody
            userEmail={userEmail}
            handleSubmit={orderDigitalCopy}
            isLoading={articleOrderLoading}
          />
        )}
    </Modal>
  );
};

export default DigitalModal;
