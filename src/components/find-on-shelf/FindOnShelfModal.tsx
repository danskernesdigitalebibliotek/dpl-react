import * as React from "react";
import { FC } from "react";
import { ManifestationsSimpleFieldsFragment } from "../../core/dbc-gateway/generated/graphql";
import { useGetHoldingsV3 } from "../../core/fbs/fbs";
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
  const { data, isError, isLoading } = useGetHoldingsV3({
    recordid: [faustId]
  });

  if (isError || !data) {
    // TODO: handle error once we have established a way to do it
    return null;
  }

  const { holdings } = data[0];

  return (
    <Modal
      modalId={findOnShelfModalId(faustId)}
      screenReaderModalDescriptionText={t("screenReaderModalDescriptionText")}
      closeModalAriaLabelText={t("ariaLabelModalTwoText")}
      additionalClasses="modal-details modal-find-on-shelf"
    >
      <>
        <h2 className="text-header-h2 modal-find-on-shelf__headline">
          {mainTitle} / {author}
        </h2>
        {isLoading && (
          <p className="text-body-large ml-16 mt-96">{t("loadingText")}</p>
        )}
        {!isLoading && (
          <>
            <div className="text-small-caption modal-find-on-shelf__caption">
              {data[0].holdings.length} biblioteker har materialet
            </div>
            {holdings.map((holding) => {
              return (
                <Disclosure
                  key={holding.branch.branchId}
                  title={holding.branch.title}
                  faustId={faustId}
                >
                  I will one day be a list of items.
                </Disclosure>
              );
            })}
          </>
        )}
      </>
    </Modal>
  );
};

export default FindOnShelfModal;
