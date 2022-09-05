import * as React from "react";
import {
  ManifestationsSimpleFieldsFragment,
  WorkMediumFragment
} from "../../core/dbc-gateway/generated/graphql";
import { useAddReservationsV2 } from "../../core/fbs/fbs";
import { convertPostIdToFaustId } from "../../core/utils/helpers/general";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import { FaustId, Pid } from "../../core/utils/types/ids";
import { Button } from "../Buttons/Button";
import { Cover } from "../cover/cover";

export const reservationModalId = (faustId: FaustId) =>
  `reservation-modal-${faustId}`;

type ReserVationModalProps = {
  manifestation: ManifestationsSimpleFieldsFragment;
  work: WorkMediumFragment;
};

const ReserVationModal = ({
  manifestation: { pid }
}: ReserVationModalProps) => {
  const t = useText();
  const faustId = convertPostIdToFaustId(pid as Pid);
  const { mutate } = useAddReservationsV2();
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

  if (!faustId) {
    return null;
  }

  return (
    <Modal
      modalId={reservationModalId(faustId)}
      screenReaderModalDescriptionText={t("screenReaderModalDescriptionText")}
      closeModalAriaLabelText={t("ariaLabelModalTwoText")}
    >
      <div>
        <div>
          {" "}
          <Cover pid={pid as Pid} size="xlarge" animate />
        </div>
        <div>
          {" "}
          <Button
            label={t("reserveText")}
            buttonType="none"
            variant="filled"
            disabled={false}
            collapsible={false}
            size="large"
            onClick={onClick}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ReserVationModal;
