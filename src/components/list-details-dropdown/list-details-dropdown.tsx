import React, { FC, ChangeEvent } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { useText } from "../../core/utils/text";

export interface OptionsProps {
  value: string;
  label: string;
}

export interface ListDetailsDropdownProps {
  onDropdownChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  setShowSelect: (show: boolean) => void;
  showSelect: boolean;
  options: OptionsProps[];
  selected: OptionsProps | null;
}

const ListDetailsDropdown: FC<ListDetailsDropdownProps> = ({
  onDropdownChange,
  setShowSelect,
  showSelect,
  options,
  selected
}) => {
  const t = useText();

  return (
    <>
      {!showSelect && (
        <button
          type="button"
          className="link-tag"
          onClick={() => setShowSelect(true)}
        >
          {t("reservationDetailsChangeText")}
        </button>
      )}
      {showSelect && (
        <Dropdown
          defaultValue={selected?.value}
          placeholder={{
            label: t("listDetailsNothingSelectedLabelText"),
            disabled: true,
            value: ""
          }}
          options={options.map(({ value, label }) => ({
            value,
            label
          }))}
          ariaLabel=""
          arrowIcon="chevron"
          handleOnChange={(e) => onDropdownChange(e)}
        />
      )}
    </>
  );
};

export default ListDetailsDropdown;
