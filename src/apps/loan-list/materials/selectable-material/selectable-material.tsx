import React, { FC, ReactNode } from "react";
import clsx from "clsx";
import { useText } from "../../../../core/utils/text";
import fetchMaterial, { MaterialProps } from "../utils/material-fetch-hoc";
import fetchDigitalMaterial from "../utils/digital-material-fetch-hoc";
import CheckBox from "../../../../components/checkbox/Checkbox";
import AuthorYear from "../../../../components/author-year/authorYear";
import ReservationInfo from "../../../reservation-list/reservation-material/reservation-info";
import { ReservationType } from "../../../../core/utils/types/reservation-type";
import ArrowButton from "../../../../components/Buttons/ArrowButton";
import Arrow from "../../../../components/atoms/icons/arrow/arrow";

interface SelectableMaterialProps {
  disabled?: boolean;
  id?: string | null;
  onMaterialChecked?: (id: string) => void;
  openDetailsModal?: (modalId: string) => void;
  selected?: boolean;
  statusMessageComponentMobile: ReactNode;
  statusMessageComponentDesktop: ReactNode;
  statusBadgeComponent: ReactNode;
  focused: boolean;
  displayedMaterial?: ReservationType;
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
  statusBadgeComponent,
  focused,
  displayedMaterial
}) => {
  const t = useText();

  if (!id) return null;
  const {
    authorsShort = "",
    materialType,
    year = "",
    title = "",
    lang
  } = material || {};

  return (
    <li className="arrow arrow__hover--right-small">
      <div
        className={clsx("list-materials", {
          "list-materials--disabled": disabled
        })}
      >
        {onMaterialChecked && (
          <div className="list-materials__checkbox mr-32">
            {!disabled && title && (
              <CheckBox
                onChecked={() => onMaterialChecked(id)}
                id={id}
                selected={selected}
                disabled={disabled}
                focused={focused}
                label={t("groupModalHiddenLabelCheckboxOnMaterialText", {
                  placeholders: { "@label": title }
                })}
                hideLabel
              />
            )}
            {disabled && <CheckBox id={id} disabled={disabled} />}
          </div>
        )}
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
            <AuthorYear author={authorsShort} year={year} />
          </p>
        </div>
        <div className="list-materials__status pl-4">
          {statusMessageComponentDesktop}
          <div>
            {statusBadgeComponent}
            {statusMessageComponentMobile}
            {displayedMaterial && (
              <ReservationInfo
                reservationInfo={displayedMaterial}
                showArrow={false}
                showStatusCircleIcon={false}
                reservationStatusClassNameOverride=""
                openReservationDetailsModal={() => {}}
              />
            )}
          </div>
        </div>
        {openDetailsModal && (
          <div className="ml-8">
            <ArrowButton
              arrowLabelledBy="john"
              cursorPointer
              clickEventHandler={() => openDetailsModal(id)}
            />
          </div>
        )}
      </div>
    </li>
  );
};

export default fetchDigitalMaterial(fetchMaterial(SelectableMaterial));
