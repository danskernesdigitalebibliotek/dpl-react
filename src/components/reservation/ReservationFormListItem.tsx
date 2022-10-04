import * as React from "react";
import { useText } from "../../core/utils/text";

interface ReservationFormListItemProps {
  icon: string;
  title: string;
  text: string;
  changeHandler?: () => void;
}

const ReservationFormListItem: React.FC<ReservationFormListItemProps> = ({
  icon,
  title,
  text,
  changeHandler
}) => {
  const t = useText();
  return (
    <div className="reservation-modal-list-item">
      <img src={icon} alt="" />
      <div className="reservation-modal-list-item-text">
        <h3 className="text-header-h5">{title}</h3>
        <p className="text-small-caption">
          {text?.length > 0 ? text : t("missingDataText")}
        </p>
      </div>
      <button
        onClick={changeHandler}
        type="button"
        className="link-tag text-small-caption cursor-pointer"
      >
        {t("shiftText")}
      </button>
    </div>
  );
};

export default ReservationFormListItem;
