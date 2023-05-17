import React, { FC, useCallback } from "react";
import { formatDate, isDigital } from "../../utils/helpers";
import { useText } from "../../../../core/utils/text";
import StatusBadge from "../utils/status-badge";
import { LoanType } from "../../../../core/utils/types/loan-type";
import { LoanId } from "../../../../core/utils/types/ids";
import fetchMaterial, { MaterialProps } from "../utils/material-fetch-hoc";
import fetchDigitalMaterial from "../utils/digital-material-fetch-hoc";
import CheckBox from "../../../../components/checkbox/Checkbox";
import StatusMessage from "./StatusMessage";
import AuthorYear from "../../../../components/author-year/authorYear";

interface SelectableMaterialProps {
  loan: LoanType;
  disabled?: boolean;
  materialsToRenew: LoanId[];
  onChecked?: (loanId: LoanId) => void;
  openLoanDetailsModal: (modalId: string) => void;
}

const SelectableMaterial: FC<SelectableMaterialProps & MaterialProps> = ({
  loan,
  material,
  disabled,
  onChecked,
  materialsToRenew,
  openLoanDetailsModal
}) => {
  const t = useText();
  const { dueDate, faust, identifier, loanId } = loan;
  const {
    authors = "",
    materialType,
    year = "",
    title = "",
    lang
  } = material || {};

  const openLoanDetailsModalHandler = useCallback(() => {
    if (faust) {
      openLoanDetailsModal(faust);
    }
    if (identifier) {
      openLoanDetailsModal(identifier);
    }
  }, [faust, identifier, openLoanDetailsModal]);

  return (
    <li>
      <div
        className={`list-materials ${
          disabled ? "list-materials--disabled" : ""
        }`}
      >
        <div className="list-materials__checkbox mr-32">
          {faust && onChecked && loanId && title && (
            <CheckBox
              onChecked={() => onChecked(loanId)}
              id={faust}
              selected={Boolean(materialsToRenew?.indexOf(loanId) > -1)}
              disabled={disabled}
              label={t("groupModalHiddenLabelCheckboxOnMaterialText", {
                placeholders: { "@label": title }
              })}
              hideLabel
            />
          )}
          {isDigital(loan) && identifier && (
            <CheckBox selected={false} id={identifier} disabled />
          )}
        </div>
        <div className="list-materials__content">
          <div className="list-materials__content-status">
            <div className="status-label status-label--outline ">
              {materialType}
            </div>
          </div>
          <p className="text-header-h5 mt-8" lang={lang}>
            {title}
          </p>
          <p className="text-small-caption">
            <AuthorYear author={authors} year={year} />
          </p>
        </div>
        <div className="list-materials__status pl-4">
          <StatusMessage
            className="list-materials__status__note-desktop"
            loan={loan}
          />
          <div>
            {dueDate && (
              <StatusBadge
                dueDate={dueDate}
                neutralText={t("groupModalDueDateMaterialText", {
                  placeholders: { "@date": formatDate(dueDate) }
                })}
              />
            )}
            <StatusMessage
              className="list-materials__status__note-mobile"
              loan={loan}
            />
            <button
              type="button"
              className="list-reservation__note"
              onClick={openLoanDetailsModalHandler}
              aria-label={
                title
                  ? t("groupModalGoToMaterialAriaLabelText", {
                      placeholders: { "@label": title }
                    })
                  : ""
              }
            >
              {t("groupModalGoToMaterialText")}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default fetchDigitalMaterial(fetchMaterial(SelectableMaterial));
