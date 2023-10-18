// Todo: Merge this component with ReservationFormListItem for consistency.
// They are very similar, and this will simplify code maintenance.
import React, { FC, ReactNode } from "react";
import { useText } from "../../core/utils/text";

export interface ListDetailsProps {
  icon: string;
  title: string;
  labels: string[] | string;
  showSelect?: boolean;
  setShowSelect?: (show: boolean) => void;
  children?: ReactNode;
  idForLabelledBy?: string;
}

const ListDetails: FC<ListDetailsProps> = ({
  icon,
  title,
  labels,
  showSelect,
  setShowSelect,
  idForLabelledBy,
  children
}) => {
  const t = useText();
  return (
    <div className="list-details" data-cy="reservation-form-list-item">
      <div className="list-details__icon">
        <img src={icon} alt="" />
      </div>
      <div className="list-details__container">
        <div>
          <h3 className="text-header-h5" id={idForLabelledBy}>
            {title}
          </h3>
          {typeof labels === "string" && (
            <p className="text-small-caption">{labels}</p>
          )}
          {typeof labels !== "string" &&
            labels.map((label: string) => (
              <p className="text-small-caption">{label}</p>
            ))}
        </div>
        <div className="list-details__dropdown">{children}</div>
      </div>
      {showSelect !== null && !showSelect && setShowSelect && (
        // todo add link-button in "src/components/Buttons"
        <button
          type="button"
          className="link-tag"
          onClick={() => setShowSelect(true)}
        >
          {t("reservationDetailsChangeText")}
        </button>
      )}
    </div>
  );
};

export default ListDetails;
