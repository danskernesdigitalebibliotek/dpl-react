import React from "react";
import { useText } from "../../core/utils/text";
import { OpeningHoursCategoriesType } from "./types";

type ConfirmAddRepeatedOpeningHourType = {
  startDateString: string;
  weekDayName: string;
  category: OpeningHoursCategoriesType;
  startTime: string;
  endTime: string;
  repeatedEndDate: string;
  confirmSubmit: () => void;
  closeDialog: () => void;
};

const ConfirmAddRepeatedOpeningHour = ({
  startDateString,
  weekDayName,
  category,
  startTime,
  endTime,
  repeatedEndDate,
  confirmSubmit,
  closeDialog
}: ConfirmAddRepeatedOpeningHourType) => {
  const t = useText();
  return (
    <div className="opening-hours-editor-form">
      <h2 className="opening-hours-editor-form__label">
        {t("openingHoursConfirmAddRepeatedText")}
      </h2>
      <table className="opening-hours-editor-form__table">
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
            <td>{startDateString}</td>
          </tr>
          <tr>
            <td>{t("openingHoursEventFormEndDateText")}:</td>
            <td>{repeatedEndDate}</td>
          </tr>
          <tr>
            <td>{t("openingHoursEventFormEveryWeekdayText")}:</td>
            <td>{weekDayName}</td>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        className="opening-hours-editor-form__cancel"
        onClick={closeDialog}
      >
        {t("openingHoursConfirmAddRepeatedCancelText")}
      </button>
      <button
        type="button"
        className="opening-hours-editor-form__submit"
        onClick={() => {
          confirmSubmit();
          closeDialog();
        }}
      >
        {t("openingHoursConfirmAddRepeatedSubmitText")}
      </button>
    </div>
  );
};

export default ConfirmAddRepeatedOpeningHour;
