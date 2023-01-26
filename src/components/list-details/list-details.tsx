import React, { FC, ReactNode } from "react";

export interface ListDetailsProps {
  icon: string;
  title: string;
  labels: string[] | string;
  children?: ReactNode;
  idForLabelledBy?: string;
}

const ListDetails: FC<ListDetailsProps> = ({
  icon,
  title,
  labels,
  idForLabelledBy,
  children
}) => {
  return (
    <div className="list-details">
      <div className="list-details__icon">
        <img src={icon} alt="" />
      </div>
      <div className="list-details__container">
        <div className="list-details__content">
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
      </div>
      {children}
    </div>
  );
};

export default ListDetails;
