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
import { isDigital } from "../../utils/helpers";
import { listId, ListType } from "../../../../core/utils/types/list-type";
import SelectableMaterialSkeleton from "./selectable-material-skeleton";
import { isEnterOrSpacePressed } from "../../../../core/utils/helpers/general";

interface SelectableMaterialProps {
  identifier?: string | null;
  disabled?: boolean;
  item?: ListType;
  onMaterialChecked?: (listItem: ListType) => void;
  openDetailsModal?: (item: ListType) => void;
  selected?: boolean;
  statusMessageComponentMobile: ReactNode;
  statusMessageComponentDesktop: ReactNode;
  statusBadgeComponent: ReactNode;
  focused: boolean;
  displayedMaterial?: ReservationType;
  noHoverEffect?: boolean;
}

const SelectableMaterial: FC<SelectableMaterialProps & MaterialProps> = ({
  material,
  disabled,
  onMaterialChecked,
  selected,
  openDetailsModal,
  item,
  statusMessageComponentMobile,
  statusMessageComponentDesktop,
  statusBadgeComponent,
  focused,
  displayedMaterial,
  noHoverEffect = false
}) => {
  const t = useText();

  if (!item) return null;
  const {
    authorsShort = "",
    materialType,
    year = "",
    title = "",
    lang
  } = material || {};

  // The reason why the handlers are used on multiple containers is because of multiple reasons:
  // * We cannot attach them to the li or the list-materials container because it prevents the checkbox from being checked.
  // * We cannot make a container for the rest of the content with the handlers because it breaks the flexbox layout.
  const handleOnClick = () => {
    if (openDetailsModal) {
      openDetailsModal(item);
    }
  };
  const handleOnKeyUp = (
    e: React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    if (openDetailsModal && isEnterOrSpacePressed(e.key)) {
      openDetailsModal(item);
    }
  };

  return (
    <li className={clsx({ "arrow__hover--right-small": openDetailsModal })}>
      <div
        className={clsx("list-materials", [
          {
            "list-materials--disabled": disabled
          },
          { "list-materials--no-hover": noHoverEffect }
        ])}
      >
        {onMaterialChecked && (
          <div className="list-materials__checkbox mr-16">
            {!disabled && title && (
              <CheckBox
                onChecked={() => onMaterialChecked(item)}
                id={listId(item)}
                selected={selected}
                disabled={disabled}
                focused={focused}
                label={t("groupModalHiddenLabelCheckboxOnMaterialText", {
                  placeholders: { "@label": title }
                })}
                hideLabel
              />
            )}
            {disabled && <CheckBox id={listId(item)} disabled={disabled} />}
          </div>
        )}
        <div
          className={clsx("list-materials__content", {
            "cursor-pointer": openDetailsModal
          })}
          onMouseUp={handleOnClick}
          onKeyUp={handleOnKeyUp}
          role="button"
          tabIndex={0}
        >
          {materialType && (
            <div className="list-materials__content-status">
              <div className="status-label status-label--outline ">
                {materialType}
              </div>
              {statusBadgeComponent || null}
            </div>
          )}
          <p className="list-materials__content__header mt-8" lang={lang || ""}>
            {title}
          </p>
          <p className="text-small-caption">
            <AuthorYear author={authorsShort} year={year} />
          </p>
          <div className="list-materials__status list-materials__status--mobile">
            {statusMessageComponentMobile}
          </div>
        </div>
        <div className="list-materials__status list-materials__status--desktop">
          {displayedMaterial && (
            <ReservationInfo
              reservationInfo={displayedMaterial}
              showArrow={false}
              showStatusCircleIcon={false}
              reservationStatusClassNameOverride=""
              isDigital={isDigital(displayedMaterial)}
            />
          )}
          {statusMessageComponentDesktop}
        </div>
        {openDetailsModal && (
          <ArrowButton
            arrowLabelledBy={listId(item)}
            cursorPointer
            clickEventHandler={handleOnClick}
            keyUpEventHandler={handleOnKeyUp}
            classNames="list-materials__arrow arrow-button"
          />
        )}
      </div>
    </li>
  );
};

export default fetchDigitalMaterial(
  fetchMaterial(SelectableMaterial, SelectableMaterialSkeleton),
  SelectableMaterialSkeleton
);
