// I dont know why eslint is complaining about label-has-associated-control
// as the label is associated with the input field. I will disable it for now.
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { OpeningHoursCategoriesType } from "./types";
import { useText } from "../../core/utils/text";
import {
  extractTime,
  getDateString,
  getStringForDateInput,
  getWeekDayName
} from "./helper";

export type EventFormOnSubmitType = (
  category: OpeningHoursCategoriesType,
  startTime: string,
  endTime: string,
  repeatedEndDate: string | null
) => void;

type EventFormProps = {
  initialTitle?: string;
  startDate: Date;
  endDate: Date;
  onSubmit: EventFormOnSubmitType;
  openingHoursCategories: OpeningHoursCategoriesType[];
  children?: React.ReactNode;
  isRepeatedOpeningHour?: boolean;
};

const EventForm: React.FC<EventFormProps> = ({
  initialTitle,
  startDate,
  endDate,
  onSubmit,
  openingHoursCategories,
  children,
  isRepeatedOpeningHour
}) => {
  const t = useText();
  const initialCategory = initialTitle
    ? openingHoursCategories.find((category) => category.title === initialTitle)
    : openingHoursCategories[0];

  const initialStartTime = extractTime(startDate);
  const initialEndTime = extractTime(endDate);
  const weekDayName = getWeekDayName(startDate);

  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [category, setCategory] = useState(initialCategory);
  const isSameTime = startTime === endTime;
  const [isRepeated, setIsRepeated] = useState(false);
  const [repeatedEndDate, setRepeatedEndDate] = useState<null | string>(null);

  // Reset the form when the initial values change
  // This is necessary because EventForm are reused
  useEffect(() => {
    setCategory(initialCategory);
    setStartTime(initialStartTime);
    setEndTime(initialEndTime);
    setIsRepeated(false);
    setRepeatedEndDate(null);
  }, [initialCategory, initialEndTime, initialStartTime]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category) {
      onSubmit(category, startTime, endTime, repeatedEndDate);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="opening-hours-editor-form"
      data-cy="opening-hours-editor-form"
    >
      <label
        className="opening-hours-editor-form__label"
        htmlFor="event-form-title"
      >
        {t("openingHoursEventFormTitleText")}
      </label>
      <select
        data-cy="opening-hours-editor-form-select"
        className="opening-hours-editor-form__select"
        id="event-form-title"
        value={category?.title}
        onChange={(e) => {
          setCategory(
            openingHoursCategories.find((item) => item.title === e.target.value)
          );
        }}
      >
        {openingHoursCategories.map((categoryItem) => (
          <option key={categoryItem.title} value={categoryItem.title}>
            {categoryItem.title}
          </option>
        ))}
      </select>
      <label
        className="opening-hours-editor-form__label"
        htmlFor="event-form-start-time"
      >
        {t("openingHoursEventFormStartTimeText")}
      </label>
      <input
        data-cy="opening-hours-editor-form-start-time"
        className="opening-hours-editor-form__time-input"
        id="event-form-start-time"
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <label
        className="opening-hours-editor-form__label"
        htmlFor="event-form-end-time"
      >
        {t("openingHoursEventFormEndTimeText")}
      </label>
      <input
        data-cy="opening-hours-editor-form-end-time"
        className="opening-hours-editor-form__time-input"
        id="event-form-end-time"
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        min={startTime}
        max="00:00"
      />
      {isRepeatedOpeningHour && (
        <>
          <div className="opening-hours-editor-form__checkbox">
            <input
              id="event-form-repeated"
              data-cy="opening-hours-editor-form-repeated"
              type="checkbox"
              checked={isRepeated}
              onChange={(e) => setIsRepeated(e.target.checked)}
            />
            <label
              className="opening-hours-editor-form__label"
              htmlFor="event-form-repeated"
            >
              {t("openingHoursEventFormRepeatedText", {
                placeholders: { "@startDate": getDateString(startDate) }
              })}
            </label>
          </div>

          <div className="opening-hours-editor-form__checkbox">
            <input
              id="event-form-weekly"
              data-cy="opening-hours-editor-form-week-day"
              type="checkbox"
              checked={isRepeated}
              disabled={!isRepeated}
            />
            <label className="" htmlFor="event-form-weekly">
              {t("openingHoursEventFormWeklyText")}
            </label>
          </div>

          <div className="opening-hours-editor-form__checkbox">
            <input
              id="event-form-week-day"
              data-cy="opening-hours-editor-form-week-day"
              type="checkbox"
              checked={isRepeated}
              disabled={!isRepeated}
            />
            <label className="" htmlFor="event-form-week-day">
              {weekDayName}
            </label>
          </div>

          <label
            className="opening-hours-editor-form__label"
            htmlFor="event-form-end-date"
          >
            {t("openingHoursEventFormEndDateText")}
          </label>
          <input
            type="date"
            className="opening-hours-editor-form__time-input"
            id="event-form-end-date"
            min={getStringForDateInput(startDate)}
            disabled={!isRepeated}
            required={isRepeated}
            value={repeatedEndDate || ""}
            onChange={(e) => setRepeatedEndDate(e.target.value)}
          />
        </>
      )}
      <button
        data-cy="opening-hours-editor-form-submit"
        type="submit"
        className="opening-hours-editor-form__submit"
        disabled={isSameTime}
      >
        {t("openingHoursEventFormSubmitText")}
      </button>
      {children}
    </form>
  );
};

export default EventForm;
