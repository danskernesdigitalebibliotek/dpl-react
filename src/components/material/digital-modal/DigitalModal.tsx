import React, { useEffect, useState } from "react";
import { useDplDasDigitalArticleOrderPOST } from "../../../core/dpl-cms/dpl-cms";
import { useGetPatronInformationByPatronIdV2 } from "../../../core/fbs/fbs";
import { statistics } from "../../../core/statistics/statistics";
import { useStatistics } from "../../../core/statistics/useStatistics";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { IssnId, Pid, WorkId } from "../../../core/utils/types/ids";
import DigitalModalBody from "./DigitalModalBody";
import DigitalModalFeedback from "./DigitalModalFeedback";
import { createDigitalModalId } from "./helper";

type DigitalModalProps = {
  digitalArticleIssnIds: IssnId[];
  pid: Pid;
  workId: WorkId;
};

const DigitalModal: React.FunctionComponent<DigitalModalProps> = ({
  digitalArticleIssnIds,
  pid,
  workId
}) => {
  const modalId = createDigitalModalId(digitalArticleIssnIds);
  const t = useText();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { track } = useStatistics();

  const {
    mutate: articleOrder,
    isLoading: articleOrderLoading,
    isSuccess: articleOrderSuccess,
    isError: articleOrderError
  } = useDplDasDigitalArticleOrderPOST();

  const orderDigitalCopy = (email: string) => {
    articleOrder(
      {
        data: {
          pid,
          email
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
      {(articleOrderSuccess || articleOrderError) && (
        <DigitalModalFeedback modalId={modalId} isError={articleOrderError} />
      )}

      {!articleOrderSuccess && !articleOrderError && userEmail !== null && (
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
