import React, { FC, useCallback, useState, useEffect } from "react";
import { Link } from "../../../../components/atoms/link";
import Modal, { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import { useUpdateV5 } from "../../../../core/fbs/fbs";
import { PatronV5 } from "../../../../core/fbs/model";
import { getModalIds } from "../../../../core/utils/helpers/general";
import { useConfig } from "../../../../core/utils/config";
import DateInputs from "../../../../components/date-inputs/date-inputs";
interface PauseReservationProps {
  id: string;
  user: PatronV5;
}

const PauseReservation: FC<PauseReservationProps> = ({ id, user }) => {
  const t = useText();
  const { mutate } = useUpdateV5();
  const { close } = useModalButtonHandler();
  const { pauseReservation } = getModalIds();
  const config = useConfig();
  // todo this should not be "as string" but config<string>, so this is a todo
  // to change the config method to support this
  const [startDate, setStartDate] = useState<string>(
    (config("pauseReservationStartDateConfig") as string) || ""
  );
  const [endDate, setEndDate] = useState<string>("");

  const save = useCallback(() => {
    if (user && startDate && endDate) {
      mutate(
        {
          data: {
            patron: {
              preferredPickupBranch: user.preferredPickupBranch,
              receiveEmail: user.receiveEmail,
              receivePostalMail: user.receivePostalMail,
              receiveSms: user.receiveSms,
              onHold: { from: startDate, to: endDate }
            }
          }
        },
        {
          onSuccess: () => {
            close(pauseReservation as string);
          },
          // todo error handling, missing in figma
          onError: () => {}
        }
      );
    }
  }, [close, endDate, mutate, pauseReservation, startDate, user]);

  useEffect(() => {
    if (user?.onHold?.from) {
      setStartDate(user.onHold.from);
    }
    if (user?.onHold?.to) {
      setEndDate(user.onHold.to);
    }
  }, [user?.onHold?.from, user?.onHold?.to]);

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

        <DateInputs
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
        />
        <div className="modal-pause__text-link mt-24 color-secondary-gray">
          <p className="text-body-small-regular">
            {t("pauseReservationModalBelowInputsTextText")}
            <Link
              id="test-ereolen-button"
              href={new URL("https://ereolen.dk/user/me/")}
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
