import React from "react";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import MaterialMainfestationItem from "../material/MaterialMainfestationItem";
import { getManifestationsOrderByTypeAndYear } from "../../apps/material/helper";
import { WorkId } from "../../core/utils/types/ids";

export type EditionSwitchModalProps = {
  work: Work;
  workId: WorkId;
  dataCy?: string;
};

export const editionSwitchModalId = () => {
  return "edition-switch-modal";
};

const EditionSwitchModal = ({
  work,
  workId,
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
            {allManifestations.map((manifestation: Manifestation) => {
              return (
                <MaterialMainfestationItem
                  key={manifestation.pid}
                  manifestation={manifestation}
                  workId={workId}
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
