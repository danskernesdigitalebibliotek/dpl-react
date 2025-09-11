import React from "react";
import Modal, { useModalButtonHandler } from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import MaterialMainfestationItem from "../material/MaterialMainfestationItem";
import {
  getParallelReservationModalId,
  getManifestationsOrderByTypeAndYear
} from "../../apps/material/helper";
import { WorkId } from "../../core/utils/types/ids";
import { useUrls } from "../../core/utils/url";
import { Button } from "../Buttons/Button";

export type EditionSwitchModalProps = {
  work: Work;
  workId: WorkId;
  selectedManifestations: Manifestation[];
  dataCy?: string;
};

export const editionSwitchModalId = () => {
  return "edition-switch-modal";
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

  const allManifestations = getManifestationsOrderByTypeAndYear(
    work.manifestations.all
  );

  const parallelReservationModalId = getParallelReservationModalId(
    selectedManifestations
  );

  const handleFirstAvailableEditionSwitchClick = () => {
    openGuarded({
      authUrl,
      modalId: parallelReservationModalId
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
