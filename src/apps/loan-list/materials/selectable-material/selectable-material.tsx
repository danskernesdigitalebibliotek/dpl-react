import React, { FC, useCallback } from "react";
import { useText } from "../../../../core/utils/text";
import StatusBadge from "../utils/status-badge";
import { FaustId, LoanId } from "../../../../core/utils/types/ids";
import fetchMaterial, { MaterialProps } from "../utils/material-fetch-hoc";
import fetchDigitalMaterial from "../utils/digital-material-fetch-hoc";
import CheckBox from "../../../../components/checkbox/Checkbox";
import StatusMessage from "./StatusMessage";
import AuthorYear from "../../../../components/author-year/authorYear";

interface SelectableMaterialProps {
  disabled?: boolean;
  badgeDate?: string | null;
  selectedMaterials: LoanId[] | string[];
  id?: LoanId | string | null;
  onMaterialChecked?: (loanId: LoanId) => void;
  openDetailsModal: (modalId: string) => void;
  faust?: FaustId | null;
  identifier?: string | null;
  loanType?: string | null;
  renewalStatusList: string[];
  badgeText?: string;
}

const SelectableMaterial: FC<SelectableMaterialProps & MaterialProps> = ({
  material,
  disabled,
  onMaterialChecked,
  selectedMaterials,
  openDetailsModal,
  id,
  faust,
  identifier,
  badgeDate,
  loanType,
  renewalStatusList,
  badgeText
}) => {
  const t = useText();
  const { authors = "", materialType, year = "", title = "" } = material || {};

  const openDetailsModalHandler = useCallback(() => {
    if (faust) {
      openDetailsModal(faust);
    }
    if (identifier) {
      openDetailsModal(identifier);
    }
  }, [faust, identifier, openDetailsModal]);

  return (
    <li>
      <div
        className={`list-materials ${
          disabled ? "list-materials--disabled" : ""
        }`}
      >
        <div className="list-materials__checkbox mr-32">
          {faust && onMaterialChecked && id && title && (
            <CheckBox
              onChecked={() => onMaterialChecked(id)}
              id={faust}
              selected={Boolean(selectedMaterials?.indexOf(id) > -1)}
              disabled={disabled}
              label={t("groupModalHiddenLabelCheckboxOnMaterialText", {
                placeholders: { "@label": title }
              })}
              hideLabel
            />
          )}
          {Boolean(identifier) && identifier && (
            <CheckBox selected={false} id={identifier} disabled />
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
            <AuthorYear author={authors} year={year} />
          </p>
        </div>
        <div className="list-materials__status pl-4">
          <StatusMessage
            className="list-materials__status__note-desktop"
            loanType={loanType}
            renewalStatusList={renewalStatusList}
          />
          <div>
            {badgeDate && (
              <StatusBadge
                badgeDate={badgeDate}
                neutralText={badgeText}
                infoText={badgeText}
              />
            )}
            <StatusMessage
              className="list-materials__status__note-mobile"
              loanType={loanType}
              renewalStatusList={renewalStatusList}
            />
            <button
              type="button"
              className="list-reservation__note"
              onClick={openDetailsModalHandler}
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
