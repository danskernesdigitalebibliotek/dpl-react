import React from "react";

import { useText } from "../../core/utils/text";
import {
  MaterialGridFilterOption,
  MaterialGridFilterType
} from "./MaterialGridRelated.types";
import Dropdown from "../Dropdown/Dropdown";

type MaterialGridRelatedSelectProps = {
  filter: MaterialGridFilterType;
  onChange: (value: MaterialGridFilterType) => void;
  options: MaterialGridFilterOption[];
};

export const MaterialGridRelatedSelect: React.FC<
  MaterialGridRelatedSelectProps
> = ({ filter, onChange, options }) => {
  const t = useText();

  return (
    <Dropdown
      ariaLabel={t("materialGridRelatedSelectAriaLabelText")}
      arrowIcon="chevron"
      classNames="dropdown--grey-borders input-with-dropdown__dropdown material-grid-related__dropdown"
      innerClassNames={{
        select: "dropdown__select--inline focus-styling",
        arrowWrapper: "dropdown__arrows--inline"
      }}
      cyData="material-grid-related-select"
      options={options}
      defaultValue={filter}
      handleOnChange={(e) => onChange(e.target.value as MaterialGridFilterType)}
    />
  );
};
