import React, { useEffect, useState } from "react";
import Various from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import { useQueryClient } from "react-query";
import {
  creatorsToString,
  filterCreators,
  flattenCreators,
  convertPostIdToFaustId
} from "../../core/utils/helpers/general";
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
import { totalMaterials } from "../../apps/material/helper";
import {
  getGetHoldingsV3QueryKey,
  useAddReservationsV2,
  useGetBranches,
  useGetHoldingsV3,
  useGetPatronInformationByPatronIdV2
} from "../../core/fbs/fbs";
import { Manifestation } from "../../core/utils/types/entities";
import { getPreferredLocation } from "./helper";

export const reservationModalId = (faustId: FaustId) =>
  `reservation-modal-${faustId}`;

type ReservationModalProps = {
  manifestation: Manifestation;
};

const ReservationModal = ({
  manifestation: {
    pid,
    materialTypes,
    creators,
    titles,
    publicationYear,
    edition
  }
}: ReservationModalProps) => {
  const queryClient = useQueryClient();
  const [reservationResponse, setReservationResponse] =
    useState<ReservationResponseV2 | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const t = useText();
  const faustId = convertPostIdToFaustId(pid);

  const { mutate } = useAddReservationsV2();
  const branchResponse = useGetBranches();
  const userResponse = useGetPatronInformationByPatronIdV2();
  const holdingsResponse = useGetHoldingsV3({
    recordid: [faustId]
  });

  // If the user has a preferred pickup branch, use that as default.
  useEffect(() => {
    if (!selectedBranch && userResponse?.data?.patron) {
      setSelectedBranch(userResponse.data.patron.preferredPickupBranch);
    }
  }, [selectedBranch, userResponse]);

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

  const author =
    creatorsToString(
      flattenCreators(filterCreators(creators, ["Person"])),
      t
    ) || t("creatorsAreMissingText");

  const saveReservation = () => {
    // Save reservation to FBS.
    mutate(
      {
        data: {
          reservations: [
            {
              recordId: faustId,
              ...(selectedBranch ? { pickupBranch: selectedBranch } : {})
            }
          ]
        }
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
      {reservationSuccess && reservationDetails && (
        <ReservationSucces
          modalId={reservationModalId(faustId)}
          title={titles.main[0]}
          preferredPickupBranch={getPreferredLocation(
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

      {!reservationResult && (
        <section className="reservation-modal">
          <header className="reservation-modal-header">
            <Cover pid={pid} size="medium" animate />
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
              {patron && selectedBranch && (
                <UserListItems
                  patron={patron}
                  branches={branchData}
                  selectedBranch={selectedBranch}
                  selectBranchHandler={setSelectedBranch}
                />
              )}
            </div>
          </div>
        </section>
      )}
    </Modal>
  );
};

export default ReservationModal;
