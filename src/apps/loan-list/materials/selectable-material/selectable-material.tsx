import React, { FC, ReactNode } from "react";
import { useText } from "../../../../core/utils/text";
import fetchMaterial, { MaterialProps } from "../utils/material-fetch-hoc";
import fetchDigitalMaterial from "../utils/digital-material-fetch-hoc";
import CheckBox from "../../../../components/checkbox/Checkbox";
import AuthorYear from "../../../../components/author-year/authorYear";

interface SelectableMaterialProps {
  disabled?: boolean;
  id?: string | null;
  onMaterialChecked: (id: string) => void;
  openDetailsModal?: (modalId: string) => void;
  selected?: boolean;
  statusMessageComponentMobile: ReactNode;
  statusMessageComponentDesktop: ReactNode;
  statusBadgeComponent: ReactNode;
}

const SelectableMaterial: FC<SelectableMaterialProps & MaterialProps> = ({
  material,
  disabled,
  onMaterialChecked,
  selected,
  openDetailsModal,
  id,
  statusMessageComponentMobile,
  statusMessageComponentDesktop,
  statusBadgeComponent
}) => {
  const t = useText();

  if (!id) return null;
  const {
    authors = "",
    materialType,
    year = "",
    title = "",
    lang
  } = material || {};

  return (
    <li>
      <div
        className={`list-materials ${
          disabled ? "list-materials--disabled" : ""
        }`}
      >
        <div className="list-materials__checkbox mr-32">
          {!disabled && title && (
            <CheckBox
              onChecked={() => onMaterialChecked(id)}
              id={id}
              selected={selected}
              disabled={disabled}
              label={t("groupModalHiddenLabelCheckboxOnMaterialText", {
                placeholders: { "@label": title }
              })}
              hideLabel
            />
          )}
          {disabled && <CheckBox id={id} disabled={disabled} />}
        </div>
        <div className="list-materials__content">
          <div className="list-materials__content-status">
            <div className="status-label status-label--outline ">
              {materialType}
            </div>
          </div>
          <p className="list-materials__content__header mt-8" lang={lang || ""}>
            {title}
          </p>
          <p className="text-small-caption">
            <AuthorYear author={authors} year={year} />
          </p>
        </div>
        <div className="list-materials__status pl-4">
          {statusMessageComponentDesktop}
          <div>
            {statusBadgeComponent}
            {statusMessageComponentMobile}
            {openDetailsModal && (
              <button
                type="button"
                className="list-reservation__note"
                onClick={() => openDetailsModal(id)}
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
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default fetchDigitalMaterial(fetchMaterial(SelectableMaterial));
