import React, { useState } from "react";
import Various from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import { useQueryClient } from "react-query";
import {
  convertPostIdsToFaustIds,
  getAllPids,
  getMaterialTypes,
  getManifestationType,
  materialIsFiction
} from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";
import { Button } from "../Buttons/Button";
import { Cover } from "../cover/cover";
import ReservationFormListItem from "./ReservationFormListItem";
import {
  AgencyBranch,
  AuthenticatedPatronV6,
  HoldingsForBibliographicalRecordLogisticsV1,
  ReservationResponseV2
} from "../../core/fbs/model";
import UserListItems from "./UserListItems";
import ReservationSucces from "./ReservationSucces";
import ReservationError from "./ReservationError";
import {
  getTotalHoldings,
  getTotalReservations,
  reservationModalId,
  useGetHoldings
} from "../../apps/material/helper";
import {
  getGetHoldingsLogisticsV1QueryKey,
  useAddReservationsV2
} from "../../core/fbs/fbs";
import { Manifestation, Work } from "../../core/utils/types/entities";
import {
  getFutureDateString,
  getPreferredBranch,
  constructReservationData,
  getAuthorLine,
  getManifestationsToReserve,
  getInstantLoanBranchHoldings,
  getInstantLoanBranchHoldingsAboveThreshold,
  removePrefixFromBranchId,
  translateOpenOrderStatus,
  getFutureDateStringISO
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
import InstantLoan from "../instant-loan/InstantLoan";
import { excludeBlacklistedBranches } from "../../core/utils/branches";
import { InstantLoanConfigType } from "../../core/utils/types/instant-loan";
import {
  OpenOrderMutation,
  useOpenOrderMutation
} from "../../core/dbc-gateway/generated/graphql";
import ModalMessage from "../message/modal-message/ModalMessage";
import configuration, { getConf } from "../../core/configuration";
import useReservableFromAnotherLibrary from "../../core/utils/useReservableFromAnotherLibrary";
import { usePatronData } from "../../core/utils/helpers/usePatronData";
import { Periods } from "./types";
import { RequestStatus } from "../../core/utils/types/request";

type ReservationModalProps = {
  selectedManifestations: Manifestation[];
  selectedPeriodical: PeriodicalEdition | null;
  work: Work;
};

export const ReservationModalBody = ({
  selectedManifestations,
  selectedPeriodical,
  work
}: ReservationModalProps) => {
  const t = useText();
  const config = useConfig();
  const { defaultInterestDaysForOpenOrder } = getConf(
    "reservation",
    configuration
  );
  const {
    matchStrings: instantLoanMatchStrings,
    threshold: instantLoanThreshold,
    enabled: instantLoanEnabled
  } = config<InstantLoanConfigType>("instantLoanConfig", {
    transformer: "jsonParse"
  });

  const branches = config<AgencyBranch[]>("branchesConfig", {
    transformer: "jsonParse"
  });
  const blacklistBranchesInstantLoan = config(
    "blacklistedInstantLoanBranchesConfig",
    {
      transformer: "stringToArray"
    }
  );
  const blacklistPickupBranches = config("blacklistedPickupBranchesConfig", {
    transformer: "stringToArray"
  });
  const whitelistBranches = excludeBlacklistedBranches(
    branches,
    blacklistBranchesInstantLoan.concat(blacklistPickupBranches)
  );

  const mainManifestationType = getManifestationType(selectedManifestations);
  const { reservableManifestations } = UseReservableManifestations({
    manifestations: selectedManifestations,
    type: mainManifestationType
  });
  const queryClient = useQueryClient();
  const [reservationResponse, setReservationResponse] =
    useState<ReservationResponseV2 | null>(null);
  const [openOrderResponse, setOpenOrderResponse] =
    useState<OpenOrderMutation | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedInterest, setSelectedInterest] = useState<number | null>(null);
  const allPids = getAllPids(selectedManifestations);
  const faustIds = convertPostIdsToFaustIds(allPids);
  const { mutate: mutateAddReservations } = useAddReservationsV2();
  const { mutate: mutateOpenOrder } = useOpenOrderMutation();
  const userResponse = usePatronData();
  const holdingsResponse = useGetHoldings({
    faustIds,
    config,
    blacklist: "availability"
  });
  const { track } = useStatistics();
  const { otherManifestationPreferred } = useAlternativeAvailableManifestation(
    work,
    allPids
  );
  const manifestationsToReserve = getManifestationsToReserve(
    reservableManifestations ?? [],
    !!selectedPeriodical
  );
  const [reservationStatus, setReservationStatus] =
    useState<RequestStatus>("idle");
  const {
    reservablePidsFromAnotherLibrary,
    materialIsReservableFromAnotherLibrary
  } = useReservableFromAnotherLibrary(selectedManifestations);

  // If we don't have all data for displaying the view render nothing.
  if (!userResponse.data || !holdingsResponse.data) {
    return null;
  }
  const { data: userData } = userResponse as { data: AuthenticatedPatronV6 };
  const { data: holdingsData } = holdingsResponse as {
    data: HoldingsForBibliographicalRecordLogisticsV1[];
  };
  const holdings = getTotalHoldings(holdingsData);
  const reservations = getTotalReservations(holdingsData);
  const { patron } = userData;
  const authorLine = getAuthorLine(selectedManifestations[0], t);
  const interestPeriods = config<Periods>("interestPeriodsConfig", {
    transformer: "jsonParse"
  });
  const interestPeriod =
    selectedInterest || interestPeriods.defaultInterestPeriod.value;
  const expiryDate = getFutureDateString(interestPeriod);

  const saveReservation = () => {
    if (manifestationsToReserve?.length) {
      setReservationStatus("pending");
      // Save reservation to FBS.
      mutateAddReservations(
        {
          data: constructReservationData({
            manifestations: manifestationsToReserve,
            selectedBranch,
            expiryDate,
            periodical: selectedPeriodical
          })
        },
        {
          onSuccess: (res) => {
            setReservationStatus("success");
            // Track only if the reservation has been successfully saved.
            track("click", {
              id: statistics.reservation.id,
              name: statistics.reservation.name,
              trackedData: work.workId
            });
            // This state is used to show the success or error modal.
            setReservationResponse(res);
            // Because after a successful reservation the holdings (reservations) are updated.
            queryClient.invalidateQueries(
              getGetHoldingsLogisticsV1QueryKey({ recordid: faustIds })
            );
          },
          onError: () => {
            setReservationStatus("error");
          }
        }
      );
    }

    if (materialIsReservableFromAnotherLibrary && patron) {
      setReservationStatus("pending");
      const { patronId, name, emailAddress, preferredPickupBranch } = patron;
      // Save reservation to open order.
      mutateOpenOrder(
        {
          input: {
            pids: reservablePidsFromAnotherLibrary,
            pickUpBranch: selectedBranch
              ? removePrefixFromBranchId(selectedBranch)
              : removePrefixFromBranchId(preferredPickupBranch),
            expires: getFutureDateStringISO(
              Number(selectedInterest ?? defaultInterestDaysForOpenOrder)
            ),
            userParameters: {
              userId: patronId.toString(),
              userName: name,
              userMail: emailAddress
            }
          }
        },
        {
          onSuccess: (res) => {
            setReservationStatus("success");
            setOpenOrderResponse(res);
          },
          onError: () => {
            setReservationStatus("error");
          }
        }
      );
    }
  };

  const reservationSuccess = reservationResponse?.success || false;
  const reservationResults = reservationResponse?.reservationResults;
  const reservationDetails =
    reservationResponse?.reservationResults[0]?.reservationDetails;
  const manifestation =
    manifestationsToReserve?.[0] || selectedManifestations[0];
  const editionText =
    !materialIsFiction(work) || manifestationsToReserve?.length === 1
      ? manifestation.edition?.summary
      : t("firstAvailableEditionText");

  const instantLoanBranchHoldings = getInstantLoanBranchHoldings(
    holdingsData[0].holdings,
    whitelistBranches,
    instantLoanMatchStrings ?? []
  );

  const instantLoanBranchHoldingsAboveThreshold =
    getInstantLoanBranchHoldingsAboveThreshold(
      instantLoanBranchHoldings,
      instantLoanThreshold
    );

  return (
    <>
      {!reservationResults && !openOrderResponse && (
        <section className="reservation-modal">
          <header className="reservation-modal-header">
            <Cover ids={[manifestation.pid]} size="medium" animate />
            <div className="reservation-modal-description">
              <div className="reservation-modal-tag">
                {getMaterialTypes(selectedManifestations)[0]}
              </div>
              <h2 className="text-header-h2 mt-22 mb-8">
                {manifestation.titles.main}
                {selectedPeriodical && ` ${selectedPeriodical.displayText}`}
              </h2>
              {authorLine && (
                <p className="text-body-medium-regular">{authorLine}</p>
              )}
            </div>
          </header>
          <div>
            <div className="reservation-modal-submit">
              <MaterialAvailabilityTextParagraph>
                {materialIsReservableFromAnotherLibrary ? (
                  t("reservableFromAnotherLibraryText")
                ) : (
                  <StockAndReservationInfo
                    stockCount={holdings}
                    reservationCount={reservations}
                  />
                )}
              </MaterialAvailabilityTextParagraph>
              <Button
                dataCy="reservation-modal-submit-button"
                label={t("approveReservationText")}
                buttonType="none"
                variant="filled"
                disabled={reservationStatus === "pending"}
                collapsible={false}
                size="small"
                onClick={saveReservation}
              />
            </div>
            <div className="reservation-modal-list">
              <ReservationFormListItem
                icon={Various}
                title={t("editionText")}
                text={selectedPeriodical?.displayText || editionText || ""}
              />
              {!materialIsFiction(work) && otherManifestationPreferred && (
                <PromoBar
                  classNames="px-35"
                  sticky
                  type="info"
                  text={t("materialIsAvailableInAnotherEditionText", {
                    placeholders: {
                      "@title": otherManifestationPreferred.titles.main[0],
                      "@authorAndYear":
                        getAuthorLine(otherManifestationPreferred, t) ?? "",
                      "@reservations": otherManifestationPreferred.reservations
                    }
                  })}
                />
              )}
              {patron && (
                <UserListItems
                  whitelistBranches={whitelistBranches}
                  patron={patron}
                  branches={branches}
                  selectedBranch={selectedBranch}
                  selectBranchHandler={setSelectedBranch}
                  selectedInterest={
                    materialIsReservableFromAnotherLibrary &&
                    selectedInterest === null
                      ? Number(defaultInterestDaysForOpenOrder)
                      : selectedInterest
                  }
                  setSelectedInterest={setSelectedInterest}
                  reservationStatus={reservationStatus}
                />
              )}

              {instantLoanEnabled &&
                instantLoanBranchHoldingsAboveThreshold.length > 0 && (
                  <InstantLoan
                    manifestation={manifestation}
                    instantLoanBranchHoldings={
                      instantLoanBranchHoldingsAboveThreshold
                    }
                  />
                )}
            </div>
          </div>
        </section>
      )}
      {openOrderResponse?.submitOrder?.status && (
        <ModalMessage
          title={t("openOrderResponseTitleText")}
          subTitle={manifestation.titles.main[0]}
          ctaButton={{
            text: t("okButtonText"),
            modalId: reservationModalId(faustIds),
            dataCy: "reservation-success-close-button"
          }}
        >
          {openOrderResponse.submitOrder.status && (
            <p
              data-cy="open-oprder-response-status-text"
              className="text-body-medium-regular pt-24"
            >
              {translateOpenOrderStatus(
                openOrderResponse.submitOrder?.status,
                t
              )}
            </p>
          )}
        </ModalMessage>
      )}
      {reservationSuccess && reservationDetails && (
        <ReservationSucces
          modalId={reservationModalId(faustIds)}
          title={manifestation.titles.main[0]}
          preferredPickupBranch={getPreferredBranch(
            reservationDetails.pickupBranch,
            branches
          )}
          holdings={holdings}
          numberInQueue={reservationDetails.numberInQueue}
        />
      )}
      {!reservationSuccess && reservationResults && (
        <ReservationError
          reservationResults={reservationResults}
          setReservationResponse={setReservationResponse}
        />
      )}
    </>
  );
};

export default ReservationModalBody;
