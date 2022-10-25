import React, { FC } from "react";
import ExpandMore from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { excludeBlacklistedBranches } from "../../../components/reservation/helper";
import { AgencyBranch } from "../../../core/fbs/model";
import { useConfig } from "../../../core/utils/config";

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
  const config = useConfig();
  const branches = config<AgencyBranch[]>("branchesConfig", {
    transformer: "jsonParse"
  });

  const blacklistBranches = config("blacklistedPickupBranchesConfig", {
    transformer: "stringToArray"
  });

  let pickupModalBranches = branches;
  if (Array.isArray(blacklistBranches)) {
    pickupModalBranches = excludeBlacklistedBranches(
      branches,
      blacklistBranches
    );
  }

  return (
    <>
      <p className="text-body-medium mt-32 mb-8">Afhent reserveringer på</p>
      <div className={`dropdown mb-32 ${classNames || ""}`}>
        {pickupModalBranches && (
          <>
            <select
              onChange={({ target }) => onChange(target.value)}
              className="dropdown__select"
            >
              {selected === "" && (
                <option
                  className="dropdown__option"
                  selected={selected === ""}
                  disabled
                >
                  sdf todo
                </option>
              )}
              {pickupModalBranches.map(({ branchId, title }) => (
                <option
                  selected={selected === branchId}
                  className="dropdown__option"
                  value={branchId}
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
