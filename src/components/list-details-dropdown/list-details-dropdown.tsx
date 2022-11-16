import React, { FC, ChangeEvent } from "react";
import { useText } from "../../core/utils/text";
import Dropdown from "../Dropdown/Dropdown";

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
          {t("listDetailsChangeText")}
        </button>
      )}
      {showSelect && (
        <Dropdown
          placeholder={{
            label: t("listDetailsNothingSelectedLabelText"),
            selected: selected === null,
            disabled: true
          }}
          list={options.map(({ value, label }: OptionsProps) => ({
            value,
            label,
            selected: selected?.value === value
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
