import * as React from "react";
import { FC } from "react";
import { ManifestationsSimpleFieldsFragment } from "../../core/dbc-gateway/generated/graphql";
import {
  convertPostIdToFaustId,
  creatorsToString,
  filterCreators,
  flattenCreators
} from "../../core/utils/helpers/general";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { FaustId, Pid } from "../../core/utils/types/ids";
import Disclosure from "../material/disclosures/disclosure";

export const findOnShelfModalId = (faustId: FaustId) =>
  `find-on-shelf-modal-${faustId}`;

export interface FindOnShelfModalProps {
  manifestation: ManifestationsSimpleFieldsFragment;
}

const FindOnShelfModal: FC<FindOnShelfModalProps> = ({ manifestation }) => {
  const t = useText();
  const {
    pid,
    creators,
    titles: { main: mainTitle }
  } = manifestation;
  const faustId = convertPostIdToFaustId(pid as Pid);
  const author =
    creatorsToString(
      flattenCreators(filterCreators(creators, ["Person"])),
      t
    ) || t("creatorsAreMissingText");

  return (
    <Modal
      modalId={findOnShelfModalId(faustId)}
      screenReaderModalDescriptionText={t("screenReaderModalDescriptionText")}
      closeModalAriaLabelText={t("ariaLabelModalTwoText")}
      additionalClasses="modal-details modal-find-on-shelf"
    >
      <>
        <h1 className="text-header-h2 modal-find-on-shelf__headline">
          {mainTitle} / {author}
        </h1>
        <div className="text-small-caption modal-find-on-shelf__caption">
          8 biblioteker har materialet
        </div>
        <Disclosure title="Xyz" faustId={faustId}>
          I will one day be a list of items.
        </Disclosure>
      </>
    </Modal>
  );
};

export default FindOnShelfModal;
