import React, { FC, useState, ReactNode } from "react";
import { useText } from "../../core/utils/text";

export interface ListDetailsProps {
  icon: string;
  title: string;
  labels: string[] | string;
  children?: ReactNode;
}

const ListDetails: FC<ListDetailsProps> = ({
  icon,
  title,
  labels,
  children
}) => {
  const t = useText();
  const [showChildren, setShowChildren] = useState<boolean>(false);

  return (
    <div className="list-details">
      <div className="list-details__icon">
        <img src={icon} alt="" />
      </div>
      <div className="list-details__container">
        <div className="list-details__content">
          <p className="text-header-h5">{title}</p>
          {typeof labels === "string" && (
            <p className="text-small-caption">{labels}</p>
          )}
          {typeof labels !== "string" &&
            labels.map((label: string) => (
              <p className="text-small-caption">{label}</p>
            ))}
        </div>
      </div>
      {children && !showChildren && (
        <button
          type="button"
          className="link-tag"
          onClick={() => setShowChildren(true)}
        >
          {t("reservationDetailsListDetailsChangeText")}
        </button>
      )}
      {children && showChildren && children}
    </div>
  );
};

export default ListDetails;
