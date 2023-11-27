import React, { FC, useCallback, useState, useEffect, useId } from "react";
import dayjs from "dayjs";
import { useQueryClient } from "react-query";
import Link from "../../../../components/atoms/links/Link";
import Modal, { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import {
  useUpdateV5,
  getGetPatronInformationByPatronIdV2QueryKey
} from "../../../../core/fbs/fbs";
import { Patron, PatronV5 } from "../../../../core/fbs/model";
import DateInputs from "../../../../components/date-inputs/date-inputs";
import { useUrls } from "../../../../core/utils/url";
import { getModalIds } from "../../../../core/utils/helpers/modal-helpers";

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
  const saveFormId = useId();

  const currentDate = dayjs().format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState<string>(currentDate);
  const [endDate, setEndDate] = useState<string>("");
  const pauseActive = user?.onHold?.from && user?.onHold?.to;

  const save = useCallback(
    (localStartDate?: string, localEndDate?: string) => {
      if (!user) {
        return;
      }
      // TODO: consolidate with the other save patron function
      // be aware the defaults are not necessarily the same in the different save patron functions
      const saveData = {
        preferredPickupBranch: user.preferredPickupBranch,
        receiveEmail: user.receiveEmail,
        receivePostalMail: user.receivePostalMail,
        receiveSms: user.receiveSms
      } as Patron;

      saveData.onHold = {
        from: localStartDate === "" ? undefined : localStartDate,
        to: localEndDate === "" ? undefined : localEndDate
      };

      mutate(
        {
          data: { patron: saveData }
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(
              getGetPatronInformationByPatronIdV2QueryKey()
            );
            close(pauseReservation as string);
          },
          // todo error handling, missing in figma
          onError: () => {}
        }
      );
    },
    [close, mutate, pauseReservation, queryClient, user]
  );

  const resetPauseDates = useCallback(() => {
    setStartDate(currentDate);
    setEndDate("");
    save();
  }, [currentDate, save]);

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
        <h2 className="text-header-h3">
          {t("pauseReservationModalHeaderText")}
        </h2>
        <div className="mt-48 color-secondary-gray">
          <p className="text-body-medium-regular mb-32">
            {t("pauseReservationModalBodyText")}
          </p>
        </div>
        <form
          id={saveFormId}
          onSubmit={(e) => {
            e.preventDefault();
            save(startDate, endDate);
          }}
        >
          <DateInputs
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            startDate={startDate}
            endDate={endDate}
          />
        </form>
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
            type="submit"
            form={saveFormId}
            className="btn-primary btn-filled btn-small"
          >
            {t("pauseReservationModalSaveButtonLabelText")}
          </button>
          {pauseActive && (
            <button
              type="button"
              onClick={resetPauseDates}
              className="btn-primary btn-small mt-16"
            >
              {t("pauseReservationModalCancelButtonLabelText")}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PauseReservation;
