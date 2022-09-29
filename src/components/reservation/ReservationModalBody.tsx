import React, { useState } from "react";
import Various from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import { useQueryClient } from "react-query";
import { convertPostIdToFaustId } from "../../core/utils/helpers/general";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { FaustId } from "../../core/utils/types/ids";
import { Button } from "../Buttons/Button";
import { Cover } from "../cover/cover";
import ReservationFormListItem from "./ReservationFormListItem";
import {
  AgencyBranch,
  AuthenticatedPatronV6,
  HoldingsForBibliographicalRecordV3,
  ReservationResponseV2
} from "../../core/fbs/model";
import UserListItems from "./UserListItems";
import ReservationSucces from "./ReservationSucces";
import ReservationError from "./ReservationError";
import {
  getManifestationType,
  totalMaterials
} from "../../apps/material/helper";
import {
  getGetHoldingsV3QueryKey,
  useAddReservationsV2,
  useGetBranches,
  useGetHoldingsV3,
  useGetPatronInformationByPatronIdV2
} from "../../core/fbs/fbs";
import { Manifestation } from "../../core/utils/types/entities";
import {
  getFutureDateString,
  getPreferredBranch,
  constructReservationData,
  getAuthorLine
} from "./helper";
import UseReservableManifestations from "../../core/utils/UseReservableManifestations";
import { GroupListItem } from "../material/MaterialPeriodicalSelect";

export const reservationModalId = (faustId: FaustId) =>
  `reservation-modal-${faustId}`;

type ReservationModalProps = {
  mainManifestation: Manifestation;
  parallelManifestations?: Manifestation[];
  selectedPeriodical: GroupListItem | null;
};

const ReservationModalBody = ({
  mainManifestation,
  mainManifestation: { pid, materialTypes, titles, edition },
  parallelManifestations,
  selectedPeriodical
}: ReservationModalProps) => {
  const mainManifestationType = getManifestationType(mainManifestation);
  const { reservableManifestations } = UseReservableManifestations({
    manifestations: parallelManifestations || [mainManifestation],
    type: mainManifestationType
  });
  const queryClient = useQueryClient();
  const [reservationResponse, setReservationResponse] =
    useState<ReservationResponseV2 | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedInterest, setSelectedInterest] = useState<number | null>(null);

  const t = useText();
  const faustId = convertPostIdToFaustId(pid);

  const { mutate } = useAddReservationsV2();
  const branchResponse = useGetBranches();
  const userResponse = useGetPatronInformationByPatronIdV2();
  const holdingsResponse = useGetHoldingsV3({
    recordid: [faustId]
  });

  // If we don't have all data for displaying the view render nothing.
  if (!branchResponse.data || !userResponse.data || !holdingsResponse.data) {
    return null;
  }

  const { data: branchData } = branchResponse as { data: AgencyBranch[] };
  const { data: userData } = userResponse as { data: AuthenticatedPatronV6 };
  const { data: holdingsData } = holdingsResponse as {
    data: HoldingsForBibliographicalRecordV3[];
  };
  const { reservations, holdings } = holdingsData[0];
  const { patron } = userData;
  const authorLine = getAuthorLine(mainManifestation, t);
  const expiryDate = selectedInterest
    ? getFutureDateString(selectedInterest)
    : null;

  const saveReservation = () => {
    if (!reservableManifestations) {
      return;
    }

    // Save reservation to FBS.
    mutate(
      {
        data: constructReservationData({
          manifestations: reservableManifestations,
          selectedBranch,
          expiryDate,
          periodical: selectedPeriodical
        })
      },
      {
        onSuccess: (res) => {
          // this state is used to show the success or error modal
          setReservationResponse(res);
          // because after a successful reservation the holdings (reservations) are updated
          queryClient.invalidateQueries(getGetHoldingsV3QueryKey());
        }
      }
    );
  };

  const reservationSuccess = reservationResponse?.success || false;
  const reservationResult = reservationResponse?.reservationResults[0]?.result;
  const reservationDetails =
    reservationResponse?.reservationResults[0]?.reservationDetails;

  return (
    <Modal
      modalId={reservationModalId(faustId)}
      screenReaderModalDescriptionText={t(
        "reservationModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("reservationModalCloseModalAriaLabelText")}
    >
      {!reservationResult && (
        <section className="reservation-modal">
          <header className="reservation-modal-header">
            <Cover pid={pid} size="medium" animate />
            <div className="reservation-modal-description">
              <div className="reservation-modal-tag">
                {materialTypes[0].specific}
              </div>
              <h2 className="text-header-h2 mt-22 mb-8">
                {titles.main[0]}{" "}
                {selectedPeriodical && selectedPeriodical.displayText}
              </h2>
              <p className="text-body-medium-regular">{authorLine}</p>
            </div>
          </header>
          <div>
            <div className="reservation-modal-submit">
              <p className="text-small-caption">
                {`${t("weHaveShoppedText")} ${totalMaterials(holdings)} ${t(
                  "copiesThereIsText"
                )} ${reservations} ${t("reservationsForThisMaterialText")}`}
              </p>
              <Button
                label={t("approveReservationText")}
                buttonType="none"
                variant="filled"
                disabled={false}
                collapsible={false}
                size="small"
                onClick={saveReservation}
              />
            </div>
            <div className="reservation-modal-list">
              <ReservationFormListItem
                icon={Various}
                title={t("editionText")}
                text={edition?.summary ?? ""}
                changeHandler={() => {}} // TODO: open modal to switch user data
              />

              {patron && (
                <UserListItems
                  patron={patron}
                  branches={branchData}
                  selectedBranch={selectedBranch}
                  selectBranchHandler={setSelectedBranch}
                  selectedInterest={selectedInterest}
                  setSelectedInterest={setSelectedInterest}
                />
              )}
            </div>
          </div>
        </section>
      )}

      {reservationSuccess && reservationDetails && (
        <ReservationSucces
          modalId={reservationModalId(faustId)}
          title={titles.main[0]}
          preferredPickupBranch={getPreferredBranch(
            reservationDetails.pickupBranch,
            branchData
          )}
          numberInQueue={reservationDetails.numberInQueue}
        />
      )}

      {!reservationSuccess && reservationResult && (
        <ReservationError
          reservationResult={reservationResult}
          setReservationResponse={setReservationResponse}
        />
      )}
    </Modal>
  );
};

export default ReservationModalBody;
