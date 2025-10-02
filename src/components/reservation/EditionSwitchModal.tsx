import React from "react";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import MaterialMainfestationItem from "../material/MaterialMainfestationItem";
import {
  getManifestationsOrderByTypeAndYear,
  editionSwitchModalId
} from "../../apps/material/helper";
import { WorkId } from "../../core/utils/types/ids";
import { Button } from "../Buttons/Button";

export type EditionSwitchModalProps = {
  work: Work;
  workId: WorkId;
  handleReserveFirstAvailable: () => void;
  dataCy?: string;
};

const EditionSwitchModal = ({
  work,
  workId,
  handleReserveFirstAvailable,
  dataCy
}: EditionSwitchModalProps) => {
  const t = useText();

  const allManifestations = getManifestationsOrderByTypeAndYear(
    work.manifestations.all
  );

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
                onClick={handleReserveFirstAvailable}
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
