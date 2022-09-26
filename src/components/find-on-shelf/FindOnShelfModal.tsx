import * as React from "react";
import { FC } from "react";
import { isAnyManifestationAvailableOnBranch } from "../../apps/material/helper";
import { useGetHoldingsV3 } from "../../core/fbs/fbs";
import {
  convertPostIdToFaustId,
  creatorsToString,
  filterCreators,
  flattenCreators,
  getManifestationsPids
} from "../../core/utils/helpers/general";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { ManifestationHoldings } from "./types";
import { FaustId } from "../../core/utils/types/ids";
import Disclosure from "../material/disclosures/disclosure";
import FindOnShelfManifestationList from "./FindOnShelfManifestationList";

export const findOnShelfModalId = (faustId: FaustId) =>
  `find-on-shelf-modal-${faustId}`;

export interface FindOnShelfModalProps {
  manifestations: Manifestation[];
  workTitles: string[];
  authors: Work["creators"];
}

const FindOnShelfModal: FC<FindOnShelfModalProps> = ({
  manifestations,
  workTitles,
  authors
}) => {
  const t = useText();
  const pidArray = getManifestationsPids(manifestations);
  const faustIdArray = pidArray.map((manifestationPid) =>
    convertPostIdToFaustId(manifestationPid)
  );
  const { data, isError, isLoading } = useGetHoldingsV3({
    recordid: faustIdArray
  });
  const author =
    creatorsToString(flattenCreators(filterCreators(authors, ["Person"])), t) ||
    t("creatorsAreMissingText");
  const title = workTitles.join(", ");
  const modalId = findOnShelfModalId(
    convertPostIdToFaustId(manifestations[0].pid)
  );

  if (isError || !data) {
    // TODO: handle error once we have established a way to do it.
    return null;
  }

  // Transforming holdings data & manifestation data so we can render it. The data
  // we get from services cannot be rendered in its raw form - doesn't match what
  // we are supposed to show on the page.
  const pairedManifestationsWithBranches: ManifestationHoldings = data
    .map((holdingsPerManifestation, index) => {
      return holdingsPerManifestation.holdings.map((holding) => {
        const manifestation = manifestations[index];
        return { manifestation, holding };
      });
    })
    .flat();
  const allBranches = data
    .map((item) => item.holdings.map((holding) => holding.branch.branchId))
    .flat();
  const uniqueBranches = Array.from(new Set(allBranches));
  // Grouping pairedManifestationsWithBranches objects based on same branch
  // gives us the desired data structure that we can render.
  const finalData: ManifestationHoldings[] = uniqueBranches.map((branch) => {
    return pairedManifestationsWithBranches.filter(
      (manifestationWithBranch) => {
        return manifestationWithBranch.holding.branch.branchId === branch;
      }
    );
  });

  // Sorting of the data below to show branches & manifestations in the correct order.
  const finalDataAlphabetical = finalData.sort(
    (a: ManifestationHoldings, b: ManifestationHoldings) => {
      return a[0].holding.branch.title > b[0].holding.branch.title ? 1 : -1;
    }
  );
  // "00" is the ending of beanchIds for branches that are considered main.
  const finalDataMainBranchFirst = finalDataAlphabetical.sort(
    (manifestationHolding: ManifestationHoldings) => {
      return manifestationHolding[0].holding.branch.branchId.endsWith("00")
        ? -1
        : 1;
    }
  );

  const finalDataToShow = finalDataMainBranchFirst;

  return (
    <Modal
      modalId={modalId}
      screenReaderModalDescriptionText={t(
        "findOnShelfModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("findOnShelfModalCloseModalAriaLabelText")}
      classNames="modal-details modal-find-on-shelf"
    >
      <>
        <h2 className="text-header-h2 modal-find-on-shelf__headline">
          {`${title} / ${author}`}
        </h2>
        {isLoading && (
          <p className="text-body-large ml-16 mt-96">{t("loadingText")}</p>
        )}
        {!isLoading && (
          <>
            <div className="text-small-caption modal-find-on-shelf__caption">
              {`${finalData.length} ${t("librariesHaveTheMaterialText")}`}
            </div>
            {finalDataToShow.map((libraryBranch) => {
              return (
                <Disclosure
                  key={libraryBranch[0].holding.branch.branchId}
                  title={libraryBranch[0].holding.branch.title}
                  isAvailable={isAnyManifestationAvailableOnBranch(
                    libraryBranch
                  )}
                  fullWidth
                  open={finalData.length === 1}
                >
                  <FindOnShelfManifestationList
                    libraryBranchHoldings={libraryBranch}
                  />
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
