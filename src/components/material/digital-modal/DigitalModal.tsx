import React, { useEffect, useState } from "react";
import { usePlaceCopyMutation } from "../../../core/dbc-gateway/generated/graphql";
import { useGetPatronInformationByPatronIdV2 } from "../../../core/fbs/fbs";
import { statistics } from "../../../core/statistics/statistics";
import { useStatistics } from "../../../core/statistics/useStatistics";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { Pid, WorkId } from "../../../core/utils/types/ids";
import DigitalModalBody from "./DigitalModalBody";
import DigitalModalFeedback from "./DigitalModalFeedback";
import { createDigitalModalId, getResponseMessage } from "./helper";

type DigitalModalProps = {
  pid: Pid;
  workId: WorkId;
};

const DigitalModal: React.FunctionComponent<DigitalModalProps> = ({
  pid,
  workId
}) => {
  const modalId = createDigitalModalId(pid);
  const t = useText();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { track } = useStatistics();

  const {
    mutate: articleOrder,
    isLoading: articleOrderLoading,
    data: articleResponse
  } = usePlaceCopyMutation();

  const responseMessage = getResponseMessage(articleResponse, t);

  const orderDigitalCopy = (email: string) => {
    articleOrder(
      {
        input: {
          pid,
          userMail: email
        }
      },
      {
        onSuccess: () => {
          // Track only if the reservation has been successfully saved.
          track("click", {
            id: statistics.reservation.id,
            name: statistics.reservation.name,
            trackedData: workId
          });
        }
      }
    );
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
      {responseMessage ? (
        <DigitalModalFeedback
          modalId={modalId}
          feedbackMessage={responseMessage}
        />
      ) : (
        userEmail !== null && (
          <DigitalModalBody
            userEmail={userEmail}
            handleSubmit={orderDigitalCopy}
            isLoading={articleOrderLoading}
          />
        )
      )}
    </Modal>
  );
};

export default DigitalModal;
