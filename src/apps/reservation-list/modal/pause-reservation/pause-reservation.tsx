import React, { FC, useCallback, useState, useEffect, useId } from "react";
import Link from "../../../../components/atoms/links/Link";
import Modal, { useModalButtonHandler } from "../../../../core/utils/modal";
import { useText } from "../../../../core/utils/text";
import { useUrls } from "../../../../core/utils/url";
import { getModalIds } from "../../../../core/utils/helpers/modal-helpers";
import DateRangeInput from "../../../../components/date-inputs/DateRangeInput";
import useSavePatron from "../../../../core/utils/useSavePatron";
import { Patron } from "../../../../core/utils/types/entities";
import { getTodayDate } from "../../../../core/utils/helpers/date";

interface PauseReservationProps {
  id: string;
  user: Patron;
}

const PauseReservation: FC<PauseReservationProps> = ({ id, user }) => {
  const t = useText();
  const u = useUrls();
  const pauseReservationInfoUrl = u("pauseReservationInfoUrl");
  const { close } = useModalButtonHandler();
  const { pauseReservation } = getModalIds();
  const [isLoading, setIsLoading] = useState(false);
  const { savePatron } = useSavePatron({
    patron: user,
    fetchHandlers: {
      savePatron: {
        onSuccess: () => {
          setIsLoading(false);
          close(pauseReservation as string);
        },
        onError: () => {
          setIsLoading(false);
        }
      }
    }
  });
  const saveFormId = useId();
  const currentDate = getTodayDate();
  const [startDate, setStartDate] = useState<string>(currentDate);
  const [endDate, setEndDate] = useState<string>("");
  const pauseActive = user?.onHold?.from && user?.onHold?.to;

  const saveDates = useCallback(
    (start?: string, end?: string) => {
      if (!user) {
        return;
      }

      setIsLoading(true);
      savePatron({
        onHold: {
          from: start === "" ? undefined : start,
          to: end === "" ? undefined : end
        }
      });
    },
    [savePatron, user]
  );

  const resetPauseDates = useCallback(() => {
    setStartDate(currentDate);
    setEndDate("");
    saveDates();
  }, [currentDate, saveDates]);

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
              saveDates(startDate, endDate);
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
            disabled={isLoading}
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
