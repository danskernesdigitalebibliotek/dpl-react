import React, { FC, ChangeEvent } from "react";
import ExpandIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
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
        <div className="dropdown">
          <select
            className="dropdown__select"
            onChange={(e) => onDropdownChange(e)}
          >
            <option
              key={null}
              selected={selected === null}
              className="dropdown__option"
              disabled
            >
              {t("listDetailsNothingSelectedLabelText")}
            </option>
            {options.map(({ label, value }: OptionsProps) => {
              return (
                <option
                  key={value}
                  selected={selected?.value === value}
                  className="dropdown__option"
                  value={value}
                >
                  {label}
                </option>
              );
            })}
          </select>
          <div className="dropdown__arrows">
            <img className="dropdown__arrow" src={ExpandIcon} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default ListDetailsDropdown;
