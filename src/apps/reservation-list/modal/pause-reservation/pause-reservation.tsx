import React, { FC, useCallback } from "react";
import { Link } from "../../../../components/atoms/link";
import Modal, { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import DateInput from "./date-input";
import { useUpdateV5 } from "../../../../core/fbs/fbs";
import { PatronV5 } from "../../../../core/fbs/model";
import { getModalIds } from "../../../../core/utils/helpers/general";

interface PauseReservationProps {
  id: string;
  user: PatronV5;
}

const PauseReservation: FC<PauseReservationProps> = ({ id, user }) => {
  const t = useText();
  const { mutate } = useUpdateV5();
  const { close } = useModalButtonHandler();
  const { pauseReservation } = getModalIds();
  
  const save = useCallback(() => {
    if (user) {
      mutate(
        {
          data: {
            patron: {
              preferredPickupBranch: user.preferredPickupBranch,
              receiveEmail: user.receiveEmail,
              receivePostalMail: user.receivePostalMail,
              receiveSms: user.receiveSms,
              onHold: { from: "", to: "" }
            }
          }
        },
        {
          onSuccess: (result) => {
            // todo
            close(pauseReservation as string);
          },
          // todo error handling, missing in figma
          onError: () => {}
        }
      );
    }
  }, [mutate, user]);

  return (
    <Modal
      modalId={id}
      classNames="modal-cta"
      closeModalAriaLabelText={t("pauseReservationModalCloseModalText")}
      screenReaderModalDescriptionText={t(
        "pauseReservationModalAriaDescriptionText"
      )}
    >
      <div className="modal-pause__container">
        <h1 className="text-header-h3">
          {t("pauseReservationModalHeaderText")}
        </h1>
        <div className="mt-48 color-secondary-gray">
          <p className="text-body-medium-regular">
            {t("pauseReservationModalBreadText")}
          </p>
        </div>

        <div className="modal-pause__dropdowns mt-24">
          <div className="datepickers">
            <DateInput
              id="startDate"
              label={t("pauseReservationModalStartDateLabelText")}
            />
            <DateInput
              id="endDate"
              label={t("pauseReservationModalEndDateLabelText")}
            />
          </div>
        </div>

        <div className="modal-pause__text-link mt-24 color-secondary-gray">
          <p className="text-body-small-regular">
            {t("pauseReservationModalBelowInputsTextText")}
            <Link
              id="test-ereolen-button"
              // href={new URL("todo")}
              className="link-tag"
            >
              {t("pauseReservationModalLinkText")}
            </Link>
          </p>
        </div>
        <div className="modal-pause__button mt-48">
          <button
            type="button"
            onClick={save}
            className="btn-primary btn-filled btn-small arrow__hover--right-small"
          >
            {t("pauseReservationModalSaveButtonLabelText")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PauseReservation;
