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
import { RequestStatus } from "../../core/utils/types/request";
import MaterialAvailabilityTextOnline from "../material/MaterialAvailabilityText/online/MaterialAvailabilityTextOnline";
import useReaderPlayer from "../../core/utils/useReaderPlayer";
import OnlineInternalModalUserListItems from "./OnlineInternalModalUserListItems";
import MaterialButtonsOnlineInternal from "../material/material-buttons/online/MaterialButtonsOnlineInternal";
import { onlineInternalModalId } from "../../apps/material/helper";
import { CreateLoanResult } from "../../core/publizon/model";
import { formatDate } from "../../core/utils/helpers/date";
import {
  getPublizonErrorStatusText,
  PublizonErrorType
} from "../../core/utils/helpers/publizon";

type OnlineInternalModalBodyProps = {
  selectedManifestations: Manifestation[];
};

const OnlineInternalModalBody = ({
  selectedManifestations
}: OnlineInternalModalBodyProps) => {
  const t = useText();
  const [loanStatus, setloanStatus] = useState<RequestStatus>("idle");
  const [reservationStatus, setReservationStatus] =
    useState<RequestStatus>("idle");
  const [loanResponse, setLoanResponse] = useState<CreateLoanResult | null>(
    null
  );
  const [reservationOrLoanErrorResponse, setReservationOrLoanErrorResponse] =
    useState<PublizonErrorType | null>(null);

  const manifestationType = getManifestationType(selectedManifestations);
  const faustIds = getAllFaustIds(selectedManifestations);
  const manifestation = selectedManifestations[0];
  const authorLine = getAuthorLine(manifestation, t);

  const { data: userData } = usePatronData();
  const { identifier, canBeReserved } = useReaderPlayer(selectedManifestations);

  if (loanStatus === "success" && loanResponse?.expirationDateUtc) {
    return (
      <ModalMessage
        title={t("onlineInternalResponseLoanedTitleText")}
        subTitle={t("onlineInternalResponseLoanedSubtitleText", {
          placeholders: { "@title": manifestation.titles.main[0] }
        })}
      >
        <p
          data-cy="open-oprder-response-status-text"
          className="text-body-medium-regular pt-24 mb-24"
        >
          {t("onlineInternalSuccessLoanedText", {
            placeholders: {
              "@expirationDate": formatDate(loanResponse.expirationDateUtc)
            }
          })}
        </p>
        <MaterialButtonsOnlineInternal
          openModal={false}
          manifestations={selectedManifestations}
        />
      </ModalMessage>
    );
  }

  if (reservationStatus === "success") {
    return (
      <ModalMessage
        title={t("onlineInternalResponseReservedTitleText")}
        subTitle={t("onlineInternalResponseReservedSubtitleText", {
          placeholders: { "@title": manifestation.titles.main[0] }
        })}
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

  if (reservationStatus === "error" || loanStatus === "error") {
    return (
      <ModalMessage
        title={t("onlineInternalResponseErrorTitleText")}
        subTitle={t("onlineInternalResponseErrorSubtitleText", {
          placeholders: { "@title": manifestation.titles.main[0] }
        })}
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
          {reservationOrLoanErrorResponse ? (
            <>{getPublizonErrorStatusText(reservationOrLoanErrorResponse, t)}</>
          ) : (
            <>{t("onlineInternalErrorsText")}</>
          )}
        </p>
      </ModalMessage>
    );
  }

  if (reservationStatus === "idle" || loanStatus === "idle") {
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
              setLoanStatus={setloanStatus}
              setLoanResponse={setLoanResponse}
              setReservationOrLoanErrorResponse={
                setReservationOrLoanErrorResponse
              }
            />
          </div>
          {canBeReserved && (
            <>
              <div className="reservation-modal-list">
                {userData?.patron && (
                  <OnlineInternalModalUserListItems
                    patron={userData.patron}
                    reservationStatus={reservationStatus}
                  />
                )}
              </div>
              <p className="mt-16 text-small-caption">
                {t("onlineInternalModalEnsureNotificationText")}
              </p>
            </>
          )}
        </div>
      </section>
    );
  }

  return null;
};

export default OnlineInternalModalBody;
