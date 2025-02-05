import React, { useState } from "react";
import {
  getAllFaustIds,
  getManifestationType
} from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";
import { Cover } from "../cover/cover";
import { Manifestation } from "../../core/utils/types/entities";
import { getAuthorLine } from "./helper";
import ModalMessage from "../message/modal-message/ModalMessage";
import { usePatronData } from "../../core/utils/helpers/usePatronData";
import { OnlineInternalRequestStatus } from "../../core/utils/types/request";
import MaterialAvailabilityTextOnline from "../material/MaterialAvailabilityText/online/MaterialAvailabilityTextOnline";
import useReaderPlayer from "../../core/utils/useReaderPlayer";
import OnlineInternalModalUserListItems from "./OnlineInternalModalUserListItems";
import MaterialButtonsOnlineInternal from "../material/material-buttons/online/MaterialButtonsOnlineInternal";
import { onlineInternalModalId } from "../../apps/material/helper";

type OnlineInternalModalBodyProps = {
  selectedManifestations: Manifestation[];
};

const OnlineInternalModalBody = ({
  selectedManifestations
}: OnlineInternalModalBodyProps) => {
  const t = useText();
  const [reservationStatus, setReservationStatus] =
    useState<OnlineInternalRequestStatus>("idle");

  const manifestationType = getManifestationType(selectedManifestations);
  const faustIds = getAllFaustIds(selectedManifestations);
  const manifestation = selectedManifestations[0];
  const authorLine = getAuthorLine(manifestation, t);

  const { data: userData } = usePatronData();
  const { identifier, canBeReserved } = useReaderPlayer(selectedManifestations);

  if (reservationStatus === "idle") {
    return (
      <section className="reservation-modal">
        <header className="reservation-modal-header">
          <Cover ids={[manifestation.pid]} size="medium" animate />
          <div className="reservation-modal-description">
            <div className="reservation-modal-tag">
              {getManifestationType(selectedManifestations)}
            </div>
            <h2 className="text-header-h2 mt-22 mb-8">
              {manifestation.titles.main}
            </h2>
            {authorLine && (
              <p className="text-body-medium-regular">{authorLine}</p>
            )}
          </div>
        </header>

        <div>
          <div className="reservation-modal-submit">
            {identifier && (
              <MaterialAvailabilityTextOnline
                isbns={[identifier]}
                materialType={manifestationType}
              />
            )}
            <MaterialButtonsOnlineInternal
              openModal={false}
              manifestations={selectedManifestations}
              setReservationStatus={setReservationStatus}
            />
          </div>
          {canBeReserved && (
            <div className="reservation-modal-list">
              {userData?.patron && (
                <OnlineInternalModalUserListItems
                  patron={userData.patron}
                  reservationStatus={reservationStatus}
                />
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

  if (reservationStatus === "loaned") {
    return (
      <ModalMessage
        title={t("onlineInternalResponseTitleText")}
        subTitle={manifestation.titles.main[0]}
      >
        <p
          data-cy="open-oprder-response-status-text"
          className="text-body-medium-regular pt-24"
        >
          {t("onlineInternalSuccessLoanedText")}
        </p>
        <MaterialButtonsOnlineInternal
          openModal={false}
          manifestations={selectedManifestations}
        />
      </ModalMessage>
    );
  }

  if (reservationStatus === "reserved") {
    return (
      <ModalMessage
        title={t("onlineInternalResponseTitleText")}
        subTitle={manifestation.titles.main[0]}
        ctaButton={{
          text: t("okButtonText"),
          modalId: onlineInternalModalId(faustIds),
          dataCy: "online-internal-close-button"
        }}
      >
        <p
          data-cy="open-oprder-response-status-text"
          className="text-body-medium-regular pt-24"
        >
          {t("onlineInternalSuccessReservedText")}
        </p>
      </ModalMessage>
    );
  }

  if (reservationStatus === "error") {
    return (
      <ModalMessage
        title={t("onlineInternalResponseTitleText")}
        subTitle={manifestation.titles.main[0]}
        ctaButton={{
          text: t("tryAginButtonText"),
          modalId: onlineInternalModalId(faustIds),
          dataCy: "online-internal-close-button"
        }}
      >
        <p
          data-cy="open-oprder-response-status-text"
          className="text-body-medium-regular pt-24"
        >
          {t("onlineInternalErrorsText")}
        </p>
      </ModalMessage>
    );
  }

  return null;
};

export default OnlineInternalModalBody;
