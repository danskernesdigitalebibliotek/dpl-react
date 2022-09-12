import React, { useState } from "react";
import Various from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import {
  ManifestationsSimpleFieldsFragment,
  WorkMediumFragment
} from "../../core/dbc-gateway/generated/graphql";
import {
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
  HoldingsForBibliographicalRecordV3
} from "../../core/fbs/model";
import UserListItems from "./UserListItems";
import ReservationSucces from "./ReservationSucces";
import ReservationError from "./ReservationError";
import { getPreferredLocation } from "../../apps/material/helper";

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
  const [reservationDidSuccess, setReservationDidSuccess] = useState<
    boolean | null
  >(null);
  const t = useText();
  const faustId = convertPostIdToFaustId(pid as Pid);
  const { mutate } = useAddReservationsV2();

  const branchResponse = useGetBranches();
  const userResponse = useGetPatronInformationByPatronIdV2();
  const holdingsResponse = useGetHoldingsV3({
    recordid: [String(faustId)]
  });

  if (
    !faustId ||
    !branchResponse.data ||
    !userResponse.data ||
    !holdingsResponse.data
  ) {
    return null;
  }

  const { data: branchData } = branchResponse as { data: AgencyBranch[] };
  const { data: userData } = userResponse as { data: AuthenticatedPatronV6 };
  const { data: holdingsData } = holdingsResponse as {
    data: HoldingsForBibliographicalRecordV3[];
  };
  const { reservations, holdings } = holdingsData[0];
  const { patron } = userData;

  // TODO move to material/helper.ts because it is used in multiple places (Info text under buttons in the material header)
  const totalReservations = reservations;
  const totalMaterials = holdings.reduce(
    (acc, curr) => acc + curr.materials.length,
    0
  );

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
      onSuccess: () => setReservationDidSuccess(true),
      onError: () => setReservationDidSuccess(false)
    });
  };

  return (
    <Modal
      modalId={reservationModalId(faustId)}
      screenReaderModalDescriptionText={t("screenReaderModalDescriptionText")}
      closeModalAriaLabelText={t("ariaLabelModalTwoText")}
    >
      {reservationDidSuccess && patron && (
        <ReservationSucces
          modalId={reservationModalId(faustId)}
          title={titles.main[0]}
          preferredPickupBranch={getPreferredLocation(
            patron.preferredPickupBranch,
            branchData
          )}
        />
      )}

      {reservationDidSuccess === false && (
        <ReservationError setReservationDidSuccess={setReservationDidSuccess} />
      )}

      {reservationDidSuccess === null && (
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
                {`${t("weHaveShoppedText")} ${totalMaterials} ${t(
                  "copiesThereIsText"
                )} ${totalReservations} ${t(
                  "reservationsForThisMaterialText"
                )}`}
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
