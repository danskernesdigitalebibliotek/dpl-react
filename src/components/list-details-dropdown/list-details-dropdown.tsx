import React, { FC, ChangeEvent } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { useText } from "../../core/utils/text";

export interface OptionsProps {
  value: string;
  label: string;
}

export interface ListDetailsDropdownProps {
  onDropdownChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: OptionsProps[];
  selected?: string | null;
  labelledBy: string;
}

const ListDetailsDropdown: FC<ListDetailsDropdownProps> = ({
  onDropdownChange,
  options,
  selected,
  labelledBy
}) => {
  const t = useText();

  return (
    <Dropdown
      labelledBy={labelledBy}
      defaultValue={selected || ""}
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
  );
};

export default ListDetailsDropdown;
