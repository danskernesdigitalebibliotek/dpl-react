import React, { FC } from "react";
import ExpandMore from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { useGetBranches } from "../../../core/utils/branches";
import { useText } from "../../../core/utils/text";

interface BranchesDropdownProps {
  selected: string;
  classNames?: string;
  onChange: (value: string) => void;
}

const BranchesDropdown: FC<BranchesDropdownProps> = ({
  selected,
  onChange,
  classNames
}) => {
  const t = useText();
  const branches = useGetBranches("blacklistedPickupBranchesConfig");

  return (
    <>
      <label
        htmlFor="branches-dropdown"
        className="text-body-medium-medium mt-32 mb-8"
      >
        {t("pickupBranchesDropdownLabelText")}
      </label>
      <div className={`dropdown mb-32 ${classNames || ""}`}>
        {branches && (
          <>
            <select
              required
              id="branches-dropdown"
              onChange={({ target }) => onChange(target.value)}
              className="dropdown__select"
            >
              {selected === "" && (
                <option
                  value=""
                  className="dropdown__option"
                  selected={selected === ""}
                  disabled
                >
                  {t("pickupBranchesDropdownNothingSelectedText")}
                </option>
              )}
              {branches.map(({ branchId, title }) => (
                <option
                  value={branchId}
                  selected={selected === branchId}
                  className="dropdown__option"
                >
                  {title}
                </option>
              ))}
            </select>
            <div className="dropdown__arrows">
              <img className="dropdown__arrow" src={ExpandMore} alt="" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BranchesDropdown;
