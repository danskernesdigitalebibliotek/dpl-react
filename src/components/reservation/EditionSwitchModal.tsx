import React from "react";
import Modal, { useModalButtonHandler } from "../../core/utils/modal";
import { useModalIdsToCloseForReservation } from "../../core/utils/useModalIdsToCloseForReservation";
import { useText } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import MaterialMainfestationItem from "../material/MaterialMainfestationItem";
import {
  getManifestationsOrderByTypeAndYear,
  reservationModalId,
  onlineInternalModalId,
  editionSwitchModalId
} from "../../apps/material/helper";
import {
  getAllPids,
  convertPostIdsToFaustIds
} from "../../core/utils/helpers/general";
import { hasCorrectAccessType } from "../material/material-buttons/helper";
import { AccessTypeCodeEnum } from "../../core/dbc-gateway/generated/graphql";
import { WorkId } from "../../core/utils/types/ids";
import { useUrls } from "../../core/utils/url";
import { Button } from "../Buttons/Button";

export type EditionSwitchModalProps = {
  work: Work;
  workId: WorkId;
  selectedManifestations: Manifestation[];
  dataCy?: string;
};

const EditionSwitchModal = ({
  work,
  workId,
  selectedManifestations,
  dataCy
}: EditionSwitchModalProps) => {
  const t = useText();
  const u = useUrls();
  const authUrl = u("authUrl");
  const { openGuarded } = useModalButtonHandler();
  const modalsToCloseForReservation = useModalIdsToCloseForReservation();

  const allManifestations = getManifestationsOrderByTypeAndYear(
    work.manifestations.all
  );

  const pids = getAllPids(selectedManifestations);
  const faustIds = convertPostIdsToFaustIds(pids);

  const handleFirstAvailableEditionSwitchClick = () => {
    // Determine the appropriate modal ID based on the access type
    const isPhysical = hasCorrectAccessType(
      AccessTypeCodeEnum.Physical,
      selectedManifestations
    );
    const modalId = isPhysical
      ? reservationModalId(faustIds)
      : onlineInternalModalId(faustIds);

    const modalsToClose = modalsToCloseForReservation;

    openGuarded({
      authUrl,
      modalId,
      modalsToClose
    });
  };

  return (
    <Modal
      modalId={editionSwitchModalId()}
      screenReaderModalDescriptionText={t(
        "editionSwitchModalScreenReaderDescriptionText"
      )}
      closeModalAriaLabelText={t("editionSwitchModalCloseAriaLabelText")}
      dataCy={dataCy || "edition-switch-modal"}
    >
      <section className="reservation-modal">
        <header className="reservation-modal-header">
          <div className="reservation-modal-description">
            <h2 className="text-header-h2 mt-22 mb-8">
              {t("editionSwitchModalTitleText")}
            </h2>
            <p className="text-body-medium-regular">
              {t("editionSwitchModalDescriptionText")}
            </p>
          </div>
        </header>
        <div>
          <div className="edition-switch-list">
            <div className="reservation-modal-submit">
              <Button
                dataCy="edition-switch-first-available-button"
                label={t("firstAvailableEditionText")}
                buttonType="none"
                variant="filled"
                collapsible={false}
                size="small"
                onClick={handleFirstAvailableEditionSwitchClick}
              />
            </div>
            {allManifestations.map((manifestation: Manifestation) => {
              return (
                <MaterialMainfestationItem
                  key={manifestation.pid}
                  manifestation={manifestation}
                  workId={workId}
                  isEditionPicker
                />
              );
            })}
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default EditionSwitchModal;
