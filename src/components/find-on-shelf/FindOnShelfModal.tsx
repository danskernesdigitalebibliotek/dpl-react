import * as React from "react";
import { FC } from "react";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { FaustId } from "../../core/utils/types/ids";
import Disclosure from "../material/disclosures/disclosure";

export const findOnShelfModalId = (faustId: FaustId) =>
  `find-on-shelf-modal-${faustId}`;

export interface FindOnShelfModalProps {
  faustId: FaustId;
}

const FindOnShelfModal: FC<FindOnShelfModalProps> = ({ faustId }) => {
  const t = useText();

  return (
    <Modal
      modalId={findOnShelfModalId(faustId)}
      screenReaderModalDescriptionText={t("screenReaderModalDescriptionText")}
      closeModalAriaLabelText={t("ariaLabelModalTwoText")}
      additionalClasses="modal-details modal-find-on-shelf"
    >
      <h1 className="text-header-h2 modal-find-on-shelf__headline">
        Vejen til Jerusalem / Jan Guillou
      </h1>
      <div className="text-small-caption modal-find-on-shelf__caption">
        8 biblioteker har materialet
      </div>
      <Disclosure title="Xyz" faustId={faustId}>
        I will one day be a list of items.
      </Disclosure>
    </Modal>
  );
};

export default FindOnShelfModal;
