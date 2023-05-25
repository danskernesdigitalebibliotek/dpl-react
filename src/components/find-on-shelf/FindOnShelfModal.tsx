import * as React from "react";
import { FC } from "react";
import {
  constructModalId,
  getAllFaustIds
} from "../../core/utils/helpers/general";
import Modal from "../../core/utils/modal";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { FaustId } from "../../core/utils/types/ids";
import { PeriodicalEdition } from "../material/periodical/helper";
import FindOnShelfModalBody from "./FindOnShelfModalBody";
import { useText } from "../../core/utils/text";

export const findOnShelfModalId = (faustIds: FaustId[]) => {
  return constructModalId("find-on-shelf-modal", faustIds.sort());
};

export interface FindOnShelfModalProps {
  manifestations: Manifestation[];
  workTitles: string[];
  authors: Work["creators"];
  selectedPeriodical: PeriodicalEdition | null;
  setSelectedPeriodical: (selectedPeriodical: PeriodicalEdition) => void;
}

const FindOnShelfModal: FC<FindOnShelfModalProps> = ({
  manifestations,
  workTitles,
  authors,
  selectedPeriodical,
  setSelectedPeriodical
}) => {
  const t = useText();
  // If this modal is for all manifestations per material type, use all manifestations'
  // faust ids to create the modal id.
  const faustIds = getAllFaustIds(manifestations);
  const modalId = `${findOnShelfModalId(faustIds)}`;

  return (
    <Modal
      modalId={modalId}
      screenReaderModalDescriptionText={t(
        "findOnShelfModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("findOnShelfModalCloseModalAriaLabelText")}
      classNames="modal-details modal-find-on-shelf"
    >
      <FindOnShelfModalBody
        manifestations={manifestations}
        workTitles={workTitles}
        authors={authors}
        selectedPeriodical={selectedPeriodical}
        setSelectedPeriodical={setSelectedPeriodical}
      />
    </Modal>
  );
};

export default FindOnShelfModal;
