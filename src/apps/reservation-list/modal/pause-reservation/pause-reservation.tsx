import React, { FC, useCallback, useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { Link } from "../../../../components/atoms/link";
import Modal, { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import {
  useUpdateV5,
  getGetPatronInformationByPatronIdV2QueryKey
} from "../../../../core/fbs/fbs";
import {
  Patron,
  PatronV5,
  Period,
  UpdatePatronRequestV4
} from "../../../../core/fbs/model";
import { getModalIds } from "../../../../core/utils/helpers/general";
import { useConfig } from "../../../../core/utils/config";
import DateInputs from "../../../../components/date-inputs/date-inputs";
import { useUrls } from "../../../../core/utils/url";

interface PauseReservationProps {
  id: string;
  user: PatronV5;
}

const PauseReservation: FC<PauseReservationProps> = ({ id, user }) => {
  const t = useText();
  const { pauseReservationInfoUrl } = useUrls();
  const queryClient = useQueryClient();
  const { mutate } = useUpdateV5();
  const { close } = useModalButtonHandler();
  const { pauseReservation } = getModalIds();
  const config = useConfig();
  const [startDate, setStartDate] = useState<string>(
    config("pauseReservationStartDateConfig")
  );
  const [endDate, setEndDate] = useState<string>("");

  const save = useCallback(() => {
    if (user) {
      const saveData = {
        preferredPickupBranch: user.preferredPickupBranch,
        receiveEmail: user.receiveEmail,
        receivePostalMail: user.receivePostalMail,
        receiveSms: user.receiveSms
      } as Patron;

      if (startDate || endDate) {
        saveData.onHold = {
          from: startDate === "" ? null : startDate,
          to: endDate === "" ? null : endDate
        };
      }

      mutate(
        {
          data: { patron: saveData }
        },
        {
          onSuccess: () => {
            close(pauseReservation as string);
            queryClient.invalidateQueries(
              getGetPatronInformationByPatronIdV2QueryKey()
            );
          },
          // todo error handling, missing in figma
          onError: () => {}
        }
      );
    }
  }, [close, endDate, mutate, pauseReservation, queryClient, startDate, user]);

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
          <p className="text-body-medium-regular mb-32">
            {t("pauseReservationModalBodyText")}
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
              id="pause-reservation-info-link"
              href={pauseReservationInfoUrl}
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
