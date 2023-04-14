import * as React from "react";
import { FC } from "react";
import { partition } from "lodash";
import {
  isAnyManifestationAvailableOnBranch,
  totalBranchesHaveMaterial
} from "../../apps/material/helper";
import { useGetHoldingsV3 } from "../../core/fbs/fbs";
import {
  constructModalId,
  convertPostIdToFaustId,
  creatorsToString,
  filterCreators,
  flattenCreators,
  getAllFaustIds,
  getManifestationsPids
} from "../../core/utils/helpers/general";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { ManifestationHoldings } from "./types";
import { FaustId } from "../../core/utils/types/ids";
import Disclosure from "../Disclosures/disclosure";
import FindOnShelfManifestationList from "./FindOnShelfManifestationList";
import FindOnShelfPeriodicalDropdowns from "./FindOnShelfPeriodicalDropdowns";
import { PeriodicalEdition } from "../material/periodical/helper";
import { useConfig } from "../../core/utils/config";
import DisclosureSummary from "../Disclosures/DisclosureSummary";

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
  const config = useConfig();
  const blacklistBranches = config("blacklistedPickupBranchesConfig", {
    transformer: "stringToArray"
  });
  const t = useText();
  const pidArray = getManifestationsPids(manifestations);
  const faustIdArray = pidArray.map((manifestationPid) =>
    convertPostIdToFaustId(manifestationPid)
  );
  const { data, isLoading } = useGetHoldingsV3({
    recordid: faustIdArray,
    ...(blacklistBranches ? { exclude: blacklistBranches } : {})
  });
  const author = creatorsToString(
    flattenCreators(filterCreators(authors, ["Person"])),
    t
  );
  const title = workTitles.join(", ");
  // If this modal is for all manifestations per material type, use all manifestations'
  // faust ids to create the modal id.
  const faustIds = getAllFaustIds(manifestations);
  const modalId = `${findOnShelfModalId(faustIds)}`;
  const isPeriodical = manifestations.some((manifestation) => {
    return manifestation.materialTypes.some((materialType) => {
      return materialType.specific.includes("tidsskrift");
    });
  });

  if (!data || data.length < 1) {
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
          {title}
          {author && ` / ${author}`}
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
                  open={finalData.length === 1}
                  className="disclosure--full-width"
                  summary={
                    <DisclosureSummary
                      title={libraryBranch[0].holding.branch.title}
                      isAvailable={isAnyManifestationAvailableOnBranch(
                        libraryBranch
                      )}
                    />
                  }
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
