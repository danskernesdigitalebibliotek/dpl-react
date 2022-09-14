import React, { useState } from "react";
import Various from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import { useQueryClient } from "react-query";
import {
  ManifestationsSimpleFieldsFragment,
  WorkMediumFragment
} from "../../core/dbc-gateway/generated/graphql";
import {
  getGetHoldingsV3QueryKey,
  useAddReservationsV2,
  useGetBranches,
  useGetHoldingsV3,
  useGetPatronInformationByPatronIdV2
} from "../../core/fbs/fbs";
import {
  convertPostIdToFaustId,
  creatorsToString,
  filterCreators,
  flattenCreators
} from "../../core/utils/helpers/general";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { FaustId, Pid } from "../../core/utils/types/ids";
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
  getPreferredLocation,
  totalMaterials
} from "../../apps/material/helper";

export const reservationModalId = (faustId: FaustId) =>
  `reservation-modal-${faustId}`;

type ReservationModalProps = {
  manifestation: ManifestationsSimpleFieldsFragment;
  work: WorkMediumFragment;
};

const ReservationModal = ({ manifestation }: ReservationModalProps) => {
  const {
    pid,
    materialTypes,
    creators,
    titles,
    publicationYear,
    edition: { summary }
  } = manifestation;
  const queryClient = useQueryClient();
  const [reservationResponse, setReservationResponse] =
    useState<ReservationResponseV2 | null>(null);

  const t = useText();
  const faustId = convertPostIdToFaustId(pid as Pid);

  const { mutate } = useAddReservationsV2();
  const branchResponse = useGetBranches();
  const userResponse = useGetPatronInformationByPatronIdV2();
  const holdingsResponse = useGetHoldingsV3({
    recordid: [faustId]
  });

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

  const author =
    creatorsToString(
      flattenCreators(filterCreators(creators, ["Person"])),
      t
    ) || t("creatorsAreMissingText");

  const onClick = () => {
    const batch = {
      data: {
        reservations: [
          {
            recordId: faustId
          }
        ]
      }
    };
    mutate(batch, {
      onSuccess: (res) => {
        // this state is used to show the success or error modal
        setReservationResponse(res);
        // because after a successful reservation the holdings (reservations) are updated
        queryClient.invalidateQueries(getGetHoldingsV3QueryKey());
      }
    });
  };

  const reservationResult = reservationResponse?.reservationResults
    ? reservationResponse.reservationResults[0].result
    : null;

  const reservationDetails = reservationResponse?.reservationResults
    ? reservationResponse.reservationResults[0].reservationDetails
    : null;

  return (
    <Modal
      modalId={reservationModalId(faustId)}
      screenReaderModalDescriptionText={t(
        "reservationModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("reservationModalCloseModalAriaLabelText")}
    >
      {reservationResult === "success" && reservationDetails && patron && (
        <ReservationSucces
          modalId={reservationModalId(faustId)}
          title={titles.main[0]}
          preferredPickupBranch={getPreferredLocation(
            patron.preferredPickupBranch,
            branchData
          )}
          numberInQueue={String(reservationDetails.numberInQueue)}
        />
      )}

      {reservationResult === "already_reserved" && (
        <ReservationError
          setReservationResponse={setReservationResponse}
          errorDescription={t("alreadyReservedText")}
          buttonText={t("closeText")}
        />
      )}

      {reservationResult !== "success" &&
        reservationResult !== "already_reserved" && (
          <section className="reservation-modal">
            <header className="reservation-modal-header">
              <Cover pid={pid as Pid} size="medium" animate />
              <div className="reservation-modal-description">
                <div className="reservation-modal-tag">
                  {materialTypes[0].specific}
                </div>
                <h2 className="text-header-h2 mt-22 mb-8">{titles.main[0]}</h2>
                <p className="text-body-medium-regular">
                  {t("materialHeaderAuthorByText")} {author} (
                  {publicationYear.display})
                </p>
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
                  onClick={onClick}
                />
              </div>
              <div className="reservation-modal-list">
                <ReservationFormListItem
                  icon={Various}
                  title={t("editionText")}
                  text={summary}
                  changeHandler={() => {}} // TODO: open modal to switch user data
                />
                {patron && (
                  <UserListItems patron={patron} branchData={branchData} />
                )}
              </div>
            </div>
          </section>
        )}
    </Modal>
  );
};

export default ReservationModal;
