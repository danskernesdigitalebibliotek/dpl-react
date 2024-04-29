import React, { ChangeEvent, FC, useState } from "react";
import { useText } from "../../core/utils/text";

enum OptionValue {
  THIS = "this",
  All = "all"
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
      value: OptionValue.THIS,
      label: t("openingHoursEditEventConfirmOptionThisText")
    },
    {
      value: OptionValue.All,
      label: t("openingHoursEditEventConfirmOptionAllText")
    }
  ];

  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.value === OptionValue.THIS ||
      event.target.value === OptionValue.All
    ) {
      setSelectedOption(event.target.value);
    }
  };

  return (
    <form className="opening-hours-editor-form">
      <h2 className="opening-hours-editor-form__label">{title}</h2>
      {options.map(({ value, label }) => (
        <div className="opening-hours-editor-form__radio" key={value}>
          <input
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
        data-cy="cy-opening-hours-editor-form__cancel"
        type="button"
        onClick={closeDialog}
      >
        {t("openingHoursConfirmAddRepeatedCancelText")}
      </button>

      <button
        className="opening-hours-editor-form__submit"
        data-cy="cy-opening-hours-editor-form__confirm"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          confirmSubmit(selectedOption === OptionValue.All);
        }}
      >
        {t("openingHoursConfirmRepeatedSubmitText")}
      </button>
    </form>
  );
};

export default ConfirmEditRepeatedOpeningHour;
