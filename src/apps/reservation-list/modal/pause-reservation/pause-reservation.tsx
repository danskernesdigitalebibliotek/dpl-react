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
import { useUrls } from "../../../../core/utils/url";
import { getModalIds } from "../../../../core/utils/helpers/modal-helpers";
import DateRangeInput from "../../../../components/date-inputs/DateRangeInput";

interface PauseReservationProps {
  id: string;
  user: PatronV5;
}

const PauseReservation: FC<PauseReservationProps> = ({ id, user }) => {
  const t = useText();
  const u = useUrls();
  const pauseReservationInfoUrl = u("pauseReservationInfoUrl");

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
      const saveData = user as Patron;

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
        <div className="modal-pause__subtitle">
          <p className="text-body-medium-regular">
            {t("pauseReservationModalBodyText")}
          </p>
        </div>
        <form
          id={saveFormId}
          onSubmit={(e) => {
            e.preventDefault();
            if (startDate && endDate) {
              save(startDate, endDate);
            }
          }}
        >
          <div className="modal-pause__date-range">
            <DateRangeInput
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              startDate={startDate}
              endDate={endDate}
              label={t("pauseReservationModalDateRangeLabelText")}
              placeholder={t("pauseReservationModalDateRangePlaceholderText")}
            />
          </div>
        </form>

        <div className="modal-pause__text-link">
          <p className="text-body-small-regular">
            {t("pauseReservationModalBelowInputsText")}
          </p>
        </div>
        <p className="text-body-small-regular">
          <Link
            id="pause-reservation-info-link"
            href={pauseReservationInfoUrl}
            className="link-tag"
          >
            {t("pauseReservationModalLinkText")}
          </Link>
        </p>
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
