import React, { useEffect, useState } from "react";
import { DigitalArticleService } from "../../../core/dbc-gateway/generated/graphql";
import { useDplDasDigitalArticleOrderPOST } from "../../../core/dpl-cms/dpl-cms";
import { useGetPatronInformationByPatronIdV2 } from "../../../core/fbs/fbs";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { Pid } from "../../../core/utils/types/ids";
import DigitalModalBody from "./DigitalModalBody";
import DigitalModalFeedback from "./DigitalModalFeedback";
import { createDigitalModalId } from "./helper";

type DigitalModalProps = {
  digitalArticleIssn: DigitalArticleService["issn"];
  pid: Pid;
};

const DigitalModal: React.FunctionComponent<DigitalModalProps> = ({
  digitalArticleIssn,
  pid
}) => {
  const modalId = createDigitalModalId(digitalArticleIssn);
  const t = useText();
  const [email, setEmail] = useState<string>("");
  const {
    mutate: articleOrder,
    isLoading: articleOrderLoading,
    isSuccess: articleOrderSuccess,
    isError: articleOrderError
  } = useDplDasDigitalArticleOrderPOST();

  const orderDigitalCopy = () => {
    articleOrder({
      data: {
        pid,
        email
      }
    });
  };

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
      {(articleOrderSuccess || articleOrderError) && (
        <DigitalModalFeedback modalId={modalId} isError={articleOrderError} />
      )}

      {!articleOrderSuccess && !articleOrderError && (
        <DigitalModalBody
          handleSubmit={orderDigitalCopy}
          email={email}
          handleOnChange={setEmail}
          isLoading={articleOrderLoading}
        />
      )}
    </Modal>
  );
};

export default DigitalModal;
