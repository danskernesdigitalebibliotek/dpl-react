import React, { useEffect, useState } from "react";
import { useGetInfomediaQuery } from "../../../core/dbc-gateway/generated/graphql";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { Pid } from "../../../core/utils/types/ids";
import InfomediaModalBody from "./InfomediaModalBody";
import { Manifestation } from "../../../core/utils/types/entities";
import InfomediaSkeleton from "./InfomediaSkeleton";
import { usePatronData } from "../../../core/utils/helpers/usePatronData";

export const infomediaModalId = (pid: Pid) => `infomedia-modal-${pid}`;

interface InfomediaModalProps {
  selectedManifestations: Manifestation[];
  infoMediaId: string;
}

const InfomediaModal: React.FunctionComponent<InfomediaModalProps> = ({
  selectedManifestations,
  infoMediaId
}) => {
  const t = useText();
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [infomediaData, setInfomediaData] = useState<Record<
    string,
    string | null | undefined
  > | null>(null);
  const { data: patronData, isLoading: isLoadingPatron } = usePatronData();

  useEffect(() => {
    if (patronData?.resident !== undefined) {
      setShouldFetchData(patronData.resident);
    }
  }, [patronData]);

  const {
    data,
    error,
    isLoading: isLoadingInfomedia
  } = useGetInfomediaQuery(
    {
      id: infoMediaId
    },
    {
      enabled: shouldFetchData,
      onSuccess: (response) => {
        const infomedia: Record<string, string | null | undefined> = {
          headline: response?.infomedia?.article?.headLine,
          text: response?.infomedia?.article?.text
        };
        setInfomediaData(infomedia);
      }
    }
  );

  if (!data || error) {
    return null;
  }

  return (
    <Modal
      modalId={infomediaModalId(selectedManifestations[0].pid)}
      screenReaderModalDescriptionText={t(
        "infomediaModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("infomediaModalCloseModalAriaLabelText")}
      dataCy="infomedia-modal"
    >
      {isLoadingPatron || (isLoadingInfomedia && <InfomediaSkeleton />)}
      {infomediaData?.headline && infomediaData?.text && (
        <InfomediaModalBody
          headline={infomediaData.headline}
          text={infomediaData.text}
        />
      )}
    </Modal>
  );
};

export default InfomediaModal;
