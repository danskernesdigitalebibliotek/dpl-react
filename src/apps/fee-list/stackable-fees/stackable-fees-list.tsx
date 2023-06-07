import React, { FC } from "react";
import AuthorYear from "../../../components/author-year/authorYear";
import { useText } from "../../../core/utils/text";
import fetchMaterial, {
  MaterialProps
} from "../../loan-list/materials/utils/material-fetch-hoc";

interface StackableFeeListProps {
  creationDateFormatted: string;
}

const StackableFeeList: FC<StackableFeeListProps & MaterialProps> = ({
  material,
  creationDateFormatted
}) => {
  const t = useText();
  const { materialType, title, authors, year } = material || {};
  return (
    <li>
      <div className="list-materials">
        <div className="list-materials__content">
          <div className="list-materials__content-status">
            <div className="status-label status-label--outline">
              {materialType}
            </div>
            <div className="status-label status-label--danger list-materials__content-status-label">
              {t("turnedInText", {
                placeholders: { "@date": creationDateFormatted }
              })}
            </div>
          </div>
          <p className="list-materials__content__header mt-8">{title}</p>
          <p className="text-small-caption">
            {/* TODO: Globalize "authors and year if available" */}
            <AuthorYear author={authors || ""} year={year || ""} />
          </p>
        </div>
        <div className="list-materials__status">
          <div className="status-label status-label--danger">
            {t("turnedInText", {
              placeholders: { "@date": creationDateFormatted }
            })}
          </div>
        </div>
      </div>
    </li>
  );
};

export default fetchMaterial(StackableFeeList);
