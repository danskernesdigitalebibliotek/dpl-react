import React, { FC } from "react";
import { useText } from "../../../core/utils/text";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";

interface SelectableMaterialProps {
  creationDateFormatted: string;
}

const StackableFeeList: FC<SelectableMaterialProps & MaterialProps> = ({
  material,
  creationDateFormatted
}) => {
  const t = useText();
  const { materialType, authors, title, year } = material || "";
  return (
    <li>
      <div className="list-materials ">
        <div className="list-materials__content">
          <div className="list-materials__content-status">
            <div className="status-label status-label--outline ">
              {materialType}
            </div>
            <div className="status-label status-label--danger list-materials__content-status-label">
              {t("turnedInText")} {creationDateFormatted}
            </div>
          </div>
          <p className="text-header-h5 mt-8">{title}</p>
          <p className="text-small-caption">
            {authors} {year && <>({year})</>}
          </p>
        </div>
        <div className="list-materials__status">
          <div className="status-label status-label--danger ">
            {t("turnedInText")} {creationDateFormatted}
          </div>
        </div>
      </div>
    </li>
  );
};

export default fetchMaterial(StackableFeeList);
