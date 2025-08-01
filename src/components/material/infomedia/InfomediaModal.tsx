import React, { useEffect, useState } from "react";
import { useGetInfomediaQuery } from "../../../core/dbc-gateway/generated/graphql";
import Modal from "../../../core/utils/modal";
import { useText } from "../../../core/utils/text";
import { useConfig } from "../../../core/utils/config";
import { Pid } from "../../../core/utils/types/ids";
import InfomediaModalBody from "./InfomediaModalBody";
import { Manifestation } from "../../../core/utils/types/entities";
import InfomediaSkeleton from "./InfomediaSkeleton";
import { isResident } from "../../../core/utils/helpers/userInfo";
import useUserInfo from "../../../core/adgangsplatformen/useUserInfo";
import {
  getManifestationAuthors,
  getManifestationTitle
} from "../../../apps/material/helper";
import { first } from "lodash";

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
  const config = useConfig();
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const { data: userInfo, isLoading: isLoadingUserInfo } = useUserInfo();
  const siteAgencyId = config("agencyIdConfig");

  useEffect(() => {
    if (userInfo && siteAgencyId) {
      const userIsResident = isResident(userInfo, siteAgencyId);
      setShouldFetchData(userIsResident);
    }
  }, [userInfo, siteAgencyId]);

  const {
    data,
    error,
    isLoading: isLoadingInfomedia
  } = useGetInfomediaQuery(
    {
      id: infoMediaId
    },
    {
      enabled: shouldFetchData
    }
  );
  const firstManifestation = first(selectedManifestations);

  if (!data || error || !firstManifestation) {
    return null;
  }

  const author = getManifestationAuthors(firstManifestation);
  const title = getManifestationTitle(firstManifestation);

  return (
    <Modal
      modalId={infomediaModalId(firstManifestation.pid)}
      screenReaderModalDescriptionText={t(
        "infomediaModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("infomediaModalCloseModalAriaLabelText")}
      dataCy="infomedia-modal"
    >
      {(isLoadingUserInfo || isLoadingInfomedia) && <InfomediaSkeleton />}
      {data?.infomedia?.article && data.infomedia.article.text && (
        <InfomediaModalBody
          headLine={title}
          hedLine={data.infomedia.article.hedLine ?? ""}
          paper={data.infomedia.article.paper ?? ""}
          byLine={author}
          dateLine={data.infomedia.article.dateLine ?? ""}
          text={data.infomedia.article.text ?? ""}
        />
      )}
    </Modal>
  );
};

export default InfomediaModal;
