import * as React from "react";
import Location from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Location.svg";
import Various from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import Subtitles from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Subtitles.svg";
import Message from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Message.svg";
import LoanHistory from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/LoanHistory.svg";
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
  getNoInterestAfter,
  getPreferredLocation
} from "../../apps/material/helper";

export const reservationModalId = (faustId: FaustId) =>
  `reservation-modal-${faustId}`;

type ReservationModalProps = {
  manifestation: ManifestationsSimpleFieldsFragment;
  work: WorkMediumFragment;
};

const ReservationModal = ({ manifestation }: ReservationModalProps) => {
  const { pid, materialTypes, creators, titles, publicationYear, edition } =
    manifestation;
  const t = useText();
  const faustId = convertPostIdToFaustId(pid as Pid);
  const { mutate } = useAddReservationsV2();

  const { data: branchData } = useGetBranches();
  const { data: userData } = useGetPatronInformationByPatronIdV2();
  const { data: holdingsData } = useGetHoldingsV3({
    recordid: [String(faustId)]
  });

  // TODO move to material/helper.ts because it is used in multiple places (Info text under buttons in the material header)
  const totalReservations = holdingsData?.[0].reservations;
  const totalMaterials = holdingsData?.[0].holdings.reduce(
    (acc, curr) => acc + curr.materials.length,
    0
  );

  const author =
    creatorsToString(
      flattenCreators(filterCreators(creators, ["Person"])),
      t
    ) || t("creatorsAreMissingText");

  const onClick = () => {
    if (faustId) {
      const batch = {
        data: {
          reservations: [
            {
              recordId: faustId
            }
          ]
        }
      };
      mutate(batch);
    }
  };

  if (!faustId || !userData) {
    return null;
  }

  return (
    <Modal
      modalId={reservationModalId(faustId)}
      screenReaderModalDescriptionText={t("screenReaderModalDescriptionText")}
      closeModalAriaLabelText={t("ariaLabelModalTwoText")}
    >
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
              )} ${totalReservations} ${t("reservationsForThisMaterialText")}`}
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
            {edition?.summary && (
              <ReservationFormListItem
                icon={Various}
                title={t("editionText")}
                text={edition.summary}
              />
            )}
            {userData?.patron?.defaultInterestPeriod && (
              <ReservationFormListItem
                icon={LoanHistory}
                title={t("haveNoInterestAfterText")}
                text={getNoInterestAfter(userData.patron.defaultInterestPeriod)}
              />
            )}
            {userData?.patron?.preferredPickupBranch && branchData && (
              <ReservationFormListItem
                icon={Location}
                title={t("pickupLocationText")}
                text={getPreferredLocation(
                  userData.patron.preferredPickupBranch,
                  branchData
                )}
              />
            )}
            {userData?.patron?.phoneNumber && (
              <ReservationFormListItem
                icon={Subtitles}
                title={t("receiveSmsWhenMaterialReadyText")}
                text={userData.patron.phoneNumber}
              />
            )}
            {userData?.patron?.emailAddress && (
              <ReservationFormListItem
                icon={Message}
                title={t("receiveEmailWhenMaterialReadyText")}
                text={userData.patron.emailAddress}
              />
            )}
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default ReservationModal;
