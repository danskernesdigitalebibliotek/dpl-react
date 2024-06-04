import * as React from "react";
import { useText } from "../../core/utils/text";

interface ReservationFormListItemProps {
  icon: string;
  title: string;
  text: string;
  subText?: string;
  changeHandler?: () => void;
  buttonAriaLabel?: string;
  isPossibleToChangeReservationDetails?: boolean;
}

const ReservationFormListItem: React.FC<ReservationFormListItemProps> = ({
  icon,
  title,
  text,
  subText,
  changeHandler,
  buttonAriaLabel,
  isPossibleToChangeReservationDetails = true
}) => {
  const t = useText();
  return (
    <div
      className="reservation-modal-list-item"
      data-cy="reservation-form-list-item"
    >
      <img src={icon} alt="" />
      <div
        data-cy="reservation-modal-list-item-text"
        className="reservation-modal-list-item-text"
      >
        <h3 className="text-header-h5">{title}</h3>
        <p className="text-small-caption">
          {text?.length > 0 ? text : t("missingDataText")}
        </p>
        {subText && <p className="text-small-caption">{subText}</p>}
      </div>
      {changeHandler && isPossibleToChangeReservationDetails && (
        <button
          onClick={changeHandler}
          type="button"
          className="link-tag text-small-caption cursor-pointer"
          aria-label={buttonAriaLabel}
        >
          {t("shiftText")}
        </button>
      )}
    </div>
  );
};

export default ReservationFormListItem;
