import React, { useState } from "react";
import Various from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import { useQueryClient } from "react-query";
import {
  convertPostIdToFaustId,
  materialIsFiction
} from "../../core/utils/helpers/general";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { FaustId, WorkId } from "../../core/utils/types/ids";
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
  useGetHoldingsV3,
  useGetPatronInformationByPatronIdV2
} from "../../core/fbs/fbs";
import { Manifestation, Work } from "../../core/utils/types/entities";
import {
  getFutureDateString,
  getPreferredBranch,
  constructReservationData,
  getAuthorLine
} from "./helper";
import UseReservableManifestations from "../../core/utils/UseReservableManifestations";
import { PeriodicalEdition } from "../material/periodical/helper";
import { useConfig } from "../../core/utils/config";
import { useStatistics } from "../../core/statistics/useStatistics";
import StockAndReservationInfo from "../material/StockAndReservationInfo";
import MaterialAvailabilityTextParagraph from "../material/MaterialAvailabilityText/generic/MaterialAvailabilityTextParagraph";
import { statistics } from "../../core/statistics/statistics";
import useAlternativeAvailableManifestation from "./useAlternativeAvailableManifestation";
import PromoBar from "../promo-bar/PromoBar";

export const reservationModalId = (faustId: FaustId) =>
  `reservation-modal-${faustId}`;

type ReservationModalProps = {
  mainManifestation: Manifestation;
  parallelManifestations?: Manifestation[];
  selectedPeriodical: PeriodicalEdition | null;
  workId: WorkId;
  work: Work;
};

const ReservationModalBody = ({
  mainManifestation,
  mainManifestation: {
    pid,
    materialTypes,
    titles: { main: mainTitle },
    edition
  },
  parallelManifestations,
  selectedPeriodical,
  workId,
  work
}: ReservationModalProps) => {
  const t = useText();
  const config = useConfig();
  const branches = config<AgencyBranch[]>("branchesConfig", {
    transformer: "jsonParse"
  });

  const mainManifestationType = getManifestationType(mainManifestation);
  const { reservableManifestations } = UseReservableManifestations({
    manifestations:
      // TODO: We should investigate why we need to check for parallelManifestation length
      // because it doesn't seem to reflect the possible types.
      parallelManifestations && parallelManifestations.length > 0
        ? parallelManifestations
        : [mainManifestation],
    type: mainManifestationType
  });
  const queryClient = useQueryClient();
  const [reservationResponse, setReservationResponse] =
    useState<ReservationResponseV2 | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedInterest, setSelectedInterest] = useState<number | null>(null);
  const faustId = convertPostIdToFaustId(pid);
  const { mutate } = useAddReservationsV2();
  const userResponse = useGetPatronInformationByPatronIdV2();
  const holdingsResponse = useGetHoldingsV3({
    recordid: [faustId]
  });
  const { track } = useStatistics();
  const { otherManifestationPreferred } = useAlternativeAvailableManifestation(
    work,
    mainManifestation.pid
  );

  // If we don't have all data for displaying the view render nothing.
  if (!userResponse.data || !holdingsResponse.data) {
    return null;
  }

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
          // Track only if the reservation has been successfully saved.
          track("click", {
            id: statistics.reservation.id,
            name: statistics.reservation.name,
            trackedData: workId
          });
          // This state is used to show the success or error modal.
          setReservationResponse(res);
          // Because after a successful reservation the holdings (reservations) are updated.
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
            <Cover id={pid} size="medium" animate />
            <div className="reservation-modal-description">
              <div className="reservation-modal-tag">
                {materialTypes[0].specific}
              </div>
              <h2 className="text-header-h2 mt-22 mb-8">
                {mainTitle}{" "}
                {selectedPeriodical && selectedPeriodical.displayText}
              </h2>
              {authorLine && (
                <p className="text-body-medium-regular">{authorLine}</p>
              )}
            </div>
          </header>
          <div>
            <div className="reservation-modal-submit">
              <MaterialAvailabilityTextParagraph>
                <StockAndReservationInfo
                  stockCount={totalMaterials(holdings)}
                  reservationCount={reservations}
                />
              </MaterialAvailabilityTextParagraph>
              <Button
                dataCy="reservation-modal-submit-button"
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
                text={selectedPeriodical?.displayText || edition?.summary || ""}
              />
              {!materialIsFiction(work) && otherManifestationPreferred && (
                <PromoBar
                  classNames="px-35"
                  sticky
                  type="info"
                  text={`${t("materialIsAvailableInAnotherEditionText")}
                    - ${otherManifestationPreferred.titles.main}
                    - ${getAuthorLine(otherManifestationPreferred, t)}
                    - ${t(
                      "materialIsAvailableInAnotherEditionReservationsText"
                    )}:
                    ${otherManifestationPreferred.reservations}`}
                />
              )}
              {patron && (
                <UserListItems
                  patron={patron}
                  branches={branches}
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
          title={mainTitle[0]}
          preferredPickupBranch={getPreferredBranch(
            reservationDetails.pickupBranch,
            branches
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
