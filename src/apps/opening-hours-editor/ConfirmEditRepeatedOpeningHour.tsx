import React, { ChangeEvent, FC, useState } from "react";
import { useText } from "../../core/utils/text";

enum OptionValue {
  This = "This",
  All = "All"
}

type ConfirmEditRepeatedOpeningHourType = {
  title: string;
  confirmSubmit: (editSerie: boolean) => void;
  closeDialog: () => void;
};

const ConfirmEditRepeatedOpeningHour: FC<
  ConfirmEditRepeatedOpeningHourType
> = ({ confirmSubmit, closeDialog, title }) => {
  const t = useText();
  const options = [
    {
      value: OptionValue.This,
      label: t("openingHoursEditEventConfirmOptionThisText"),
      cy: "opening-hours-editor-form__radio-this"
    },
    {
      value: OptionValue.All,
      label: t("openingHoursEditEventConfirmOptionAllText"),
      cy: "opening-hours-editor-form__radio-all"
    }
  ];

  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.value === OptionValue.This ||
      event.target.value === OptionValue.All
    ) {
      setSelectedOption(event.target.value);
    }
  };

  return (
    <form className="opening-hours-editor-form">
      <h2 className="opening-hours-editor-form__label">{title}</h2>
      {options.map(({ value, label, cy }) => (
        <div className="opening-hours-editor-form__radio" key={value}>
          <input
            data-cy={cy}
            type="radio"
            id={value}
            value={value}
            checked={selectedOption === value}
            onChange={handleRadioChange}
          />
          <label htmlFor={value}>{label}</label>
        </div>
      ))}
      <button
        className="opening-hours-editor-form__cancel"
        data-cy="opening-hours-editor-form__cancel"
        type="button"
        onClick={() => {
          closeDialog();
          setSelectedOption(options[0].value);
        }}
      >
        {t("openingHoursConfirmAddRepeatedCancelText")}
      </button>
      <button
        className="opening-hours-editor-form__submit"
        data-cy="opening-hours-editor-form__confirm"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          confirmSubmit(selectedOption === OptionValue.All);
          setSelectedOption(options[0].value);
        }}
      >
        {t("openingHoursConfirmRepeatedSubmitText")}
      </button>
    </form>
  );
};

export default ConfirmEditRepeatedOpeningHour;
