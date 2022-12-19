import React, { FC, useCallback, MouseEvent } from "react";
import { formatDate, isDigital } from "../../utils/helpers";
import { useText } from "../../../../core/utils/text";
import StatusBadge from "../utils/status-badge";
import { LoanType } from "../../../../core/utils/types/loan-type";
import fetchMaterial, { MaterialProps } from "../utils/material-fetch-hoc";
import fetchDigitalMaterial from "../utils/digital-material-fetch-hoc";
import CheckBox from "../../../../components/checkbox/Checkbox";
import { useModalButtonHandler } from "../../../../core/utils/modal";
import MaterialDetailsModal from "../../modal/material-details-modal";
import MaterialDetails from "../../modal/material-details";
import StatusMessage from "./StatusMessage";

interface SelectableMaterialProps {
  loan: LoanType;
  disabled?: boolean;
  materialsToRenew: number[];
  onChecked?: (loanId: number) => void;
}

const SelectableMaterial: FC<SelectableMaterialProps & MaterialProps> = ({
  loan,
  material,
  disabled,
  onChecked,
  materialsToRenew
}) => {
  const t = useText();
  const { open } = useModalButtonHandler();
  const { dueDate, faust, identifier, loanId } = loan;
  const { authors, materialType, year, title } = material || {};

  const selectListMaterial = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (faust) {
        open(faust);
      }
      if (identifier) {
        open(identifier);
      }
    },
    [faust, identifier, open]
  );

  return (
    <>
      <li>
        <div
          className={`list-materials ${
            disabled ? "list-materials--disabled" : ""
          }`}
        >
          <div className="mr-32">
            {loanId && faust && onChecked && (
              <CheckBox
                onChecked={() => onChecked(loanId)}
                id={faust}
                selected={Boolean(materialsToRenew?.indexOf(loanId) > -1)}
                disabled={disabled}
                label={t("groupModalHiddenLabelCheckboxOnMaterialText")}
                hideLabel
              />
            )}
            {isDigital(loan) && identifier && (
              <CheckBox
                selected={false}
                id={identifier}
                disabled
                label={t("groupModalHiddenLabelCheckboxOnMaterialText")}
                hideLabel
              />
            )}
          </div>
          <div className="list-materials__content">
            <div className="list-materials__content-status">
              <div className="status-label status-label--outline ">
                {materialType}
              </div>
            </div>
            <p className="text-header-h5 mt-8">{title}</p>
            <p className="text-small-caption">
              {authors}
              {year && <> ({year})</>}
            </p>
          </div>
          <div className="list-materials__status">
            <StatusMessage loan={loan} />
            <div>
              {dueDate && (
                <StatusBadge
                  dueDate={dueDate}
                  neutralText={t("groupModalDueDateMaterialText", {
                    placeholders: { "@date": formatDate(dueDate) }
                  })}
                />
              )}
              <button
                type="button"
                className="list-reservation__note"
                onClick={(e) => selectListMaterial(e)}
              >
                {t("groupModalGoToMaterialText")}
              </button>
            </div>
          </div>
        </div>
      </li>
      <MaterialDetailsModal modalEntity={loan} material={material}>
        <MaterialDetails
          faust={loan.faust}
          identifier={loan.identifier}
          loan={loan}
        />
      </MaterialDetailsModal>
    </>
  );
};

export default fetchDigitalMaterial(fetchMaterial(SelectableMaterial));
