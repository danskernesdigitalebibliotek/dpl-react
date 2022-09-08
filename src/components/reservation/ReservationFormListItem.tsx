import * as React from "react";
import { useText } from "../../core/utils/text";

interface ReservationFormListItemProps {
  icon: string;
  title: string;
  text: string;
}

const ReservationFormListItem: React.FC<ReservationFormListItemProps> = ({
  icon,
  title,
  text
}) => {
  const t = useText();
  return (
    <div className="reservation-modal-list-item">
      <img src={icon} alt="" />
      <div className="reservation-modal-list-item-text">
        <h3 className="text-header-h5">{title}</h3>
        <p className="text-small-caption">{text ?? `Mangler data`}</p>
      </div>
      {/* <button
        type="button"
        className="link-tag text-small-caption cursor-pointer"
      >
        {t("shiftText")}
      </button> */}
    </div>
  );
};

export default ReservationFormListItem;
