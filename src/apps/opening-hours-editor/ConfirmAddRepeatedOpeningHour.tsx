import React from "react";
import { useText } from "../../core/utils/text";
import { OpeningHoursCategoriesType } from "./types";
import { formatDate, formatWeekday } from "../../core/utils/helpers/date";

type ConfirmAddRepeatedOpeningHourType = {
  startDate: Date;
  category: OpeningHoursCategoriesType;
  startTime: string;
  endTime: string;
  repeatedEndDate: Date;
  confirmSubmit: () => void;
  closeDialog: () => void;
};

const ConfirmAddRepeatedOpeningHour = ({
  startDate,
  category,
  startTime,
  endTime,
  repeatedEndDate,
  confirmSubmit,
  closeDialog
}: ConfirmAddRepeatedOpeningHourType) => {
  const t = useText();
  return (
    <div
      className="opening-hours-editor-form"
      data-cy="opening-hours-editor-confirm-add-repeated-form"
    >
      <h2 className="opening-hours-editor-form__label">
        {t("openingHoursConfirmAddRepeatedText")}
      </h2>
      <table
        className="opening-hours-editor-form__table"
        data-cy="opening-hours-editor-form__table"
      >
        <tbody>
          <tr>
            <td>{t("openingHoursEventFormCategoryText")}:</td>
            <td>{category.title}</td>
          </tr>
          <tr>
            <td>{t("openingHoursEventFormStartTimeText")}:</td>
            <td>{startTime}</td>
          </tr>
          <tr>
            <td>{t("openingHoursEventFormEndTimeText")}:</td>
            <td>{endTime}</td>
          </tr>
          <tr>
            <td>{t("openingHoursEventFormStartDateText")}:</td>
            <td>{formatDate(startDate)}</td>
          </tr>
          <tr>
            <td>{t("openingHoursEventFormEndDateText")}:</td>
            <td>{formatDate(repeatedEndDate)}</td>
          </tr>
          <tr>
            <td>{t("openingHoursEventFormEveryWeekdayText")}:</td>
            <td>{formatWeekday(startDate)}</td>
          </tr>
        </tbody>
      </table>
      <button
        data-cy="opening-hours-editor-form__cancel"
        type="button"
        className="opening-hours-editor-form__cancel"
        onClick={closeDialog}
      >
        {t("openingHoursConfirmAddRepeatedCancelText")}
      </button>
      <button
        data-cy="opening-hours-editor-form__confirm"
        type="button"
        className="opening-hours-editor-form__submit"
        onClick={() => {
          confirmSubmit();
          closeDialog();
        }}
      >
        {t("openingHoursConfirmRepeatedSubmitText")}
      </button>
    </div>
  );
};

export default ConfirmAddRepeatedOpeningHour;
