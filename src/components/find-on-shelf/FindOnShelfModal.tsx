import * as React from "react";
import { FC } from "react";
import { partition } from "lodash";
import {
  isAnyManifestationAvailableOnBranch,
  totalBranchesHaveMaterial
} from "../../apps/material/helper";
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
import FindOnShelfPeriodicalDropdowns from "./FindOnShelfPeriodicalDropdowns";
import { PeriodicalEdition } from "../material/periodical/helper";
import { useConfig } from "../../core/utils/config";

export const findOnShelfModalId = (faustId: FaustId) =>
  `find-on-shelf-modal-${faustId}`;

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
  const config = useConfig();
  const blacklistBranches = config<string>("blacklistedPickupBranchesConfig", {
    transformer: "stringToArray"
  });
  const t = useText();
  const pidArray = getManifestationsPids(manifestations);
  const faustIdArray = pidArray.map((manifestationPid) =>
    convertPostIdToFaustId(manifestationPid)
  );
  const { data, isError, isLoading } = useGetHoldingsV3({
    recordid: faustIdArray,
    ...(Array.isArray(blacklistBranches) ? { exclude: blacklistBranches } : {})
  });
  const author =
    creatorsToString(flattenCreators(filterCreators(authors, ["Person"])), t) ||
    t("creatorsAreMissingText");
  const title = workTitles.join(", ");
  const modalId = findOnShelfModalId(
    convertPostIdToFaustId(manifestations[0].pid)
  );
  const isPeriodical = manifestations.some((manifestation) => {
    return manifestation.materialTypes.some((materialType) => {
      return materialType.specific.includes("periodikum");
    });
  });

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
  let finalData: ManifestationHoldings[] = uniqueBranches.map((branch) => {
    return pairedManifestationsWithBranches.filter(
      (manifestationWithBranch) => {
        return manifestationWithBranch.holding.branch.branchId === branch;
      }
    );
  });

  // Sorting of the data below to show branches in the correct order:
  // 1. Main library branch first
  // 2. Branches with any available speciments sorted alphabetically
  // 3. Branches without available speciments sorted alphabetically

  // Filtering only for periodicals
  if (selectedPeriodical) {
    finalData = finalData.map((branchManifestationHoldings) => {
      return branchManifestationHoldings
        .map((manifestationHoldings) => {
          return {
            ...manifestationHoldings,
            holding: {
              ...manifestationHoldings.holding,
              materials: manifestationHoldings.holding.materials.filter(
                (material) => {
                  return (
                    material.periodical?.volumeNumber ===
                      selectedPeriodical.volumeNumber &&
                    material.periodical.volumeYear ===
                      selectedPeriodical.volumeYear
                  );
                }
              )
            }
          };
        })
        .filter((manifestationHoldings) => {
          return manifestationHoldings !== null;
        });
    });
  }
  function orderManifestationHoldingsAlphabetically(
    a: ManifestationHoldings,
    b: ManifestationHoldings
  ) {
    return a[0].holding.branch.title.localeCompare(
      b[0].holding.branch.title,
      "da-DK"
    );
  }
  const [availableManifestationHoldings, unavailableManifestationHoldings] =
    partition(finalData, isAnyManifestationAvailableOnBranch);
  const finalDataAlphabetical = availableManifestationHoldings
    .sort((a: ManifestationHoldings, b: ManifestationHoldings) => {
      return orderManifestationHoldingsAlphabetically(a, b);
    })
    .concat(
      unavailableManifestationHoldings.sort(
        (a: ManifestationHoldings, b: ManifestationHoldings) => {
          return orderManifestationHoldingsAlphabetically(a, b);
        }
      )
    );
  // "00" is the ending of beanchIds for branches that are considered main & should
  // be shown first independent of whether they're available.
  const finalDataMainBranchFirst = finalDataAlphabetical.sort(
    (manifestationHolding: ManifestationHoldings) => {
      return manifestationHolding[0].holding.branch.branchId.endsWith("00")
        ? -1
        : 1;
    }
  );
  const finalDataToShow: ManifestationHoldings[] = finalDataMainBranchFirst;

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
        {isPeriodical && selectedPeriodical && (
          <FindOnShelfPeriodicalDropdowns
            manifestationsHoldings={data}
            setSelectedPeriodical={setSelectedPeriodical}
            selectedPeriodical={selectedPeriodical}
          />
        )}
        {isLoading && (
          <p className="text-body-large ml-16 mt-96">{t("loadingText")}</p>
        )}
        {!isLoading && (
          <>
            <div className="text-small-caption modal-find-on-shelf__caption">
              {`${totalBranchesHaveMaterial(finalDataToShow)} ${t(
                "librariesHaveTheMaterialText"
              )}`}
            </div>
            {finalDataToShow.map((libraryBranch: ManifestationHoldings) => {
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
