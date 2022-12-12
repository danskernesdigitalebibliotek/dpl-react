import React, { FC, ReactNode } from "react";
import { Pid } from "../../core/utils/types/ids";
import { Cover } from "../cover/cover";

export interface ModalDetailsHeaderProps {
  authors: string | undefined | null;
  year: string | undefined | null;
  title: string | undefined | null;
  pid?: Pid | null;
  description: string | undefined | null;
  materialType: string | undefined | null;
  isbnForCover: string;
  periodical?: string | null;
  series?: string | null;
  children?: ReactNode;
}

const ModalDetailsHeader: FC<ModalDetailsHeaderProps> = ({
  authors,
  year,
  title,
  pid,
  description,
  materialType,
  isbnForCover,
  periodical,
  series,
  children
}) => {
  const coverId = pid || isbnForCover;

  return (
    <div className="modal-details__header">
      <div className="modal-details__cover">
        <div className="material-container">
          <span className="material material--large bg-identity-tint-120 material__animate">
            <Cover
              id={coverId}
              idType={pid ? "pid" : "isbn"}
              size="large"
              animate={false}
              description={description || ""}
            />
          </span>
        </div>
      </div>
      <div className="modal-details__material">
        <div className="modal-details__tags">
          {materialType && (
            <div className="status-label status-label--outline">
              {materialType}
            </div>
          )}
          {children}
        </div>
        <h2 className="modal-details__title text-header-h2">{title}</h2>
        <p className="text-body-medium-regular" data-cy="modal-authors">
          {authors}
          {year && <> ({year})</>}
        </p>
        {periodical && <p className="text-body-medium-regular">{periodical}</p>}
        {series && (
          <p data-cy="modal-series" className="text-body-medium-regular">
            {series}
          </p>
        )}
      </div>
    </div>
  );
};

export default ModalDetailsHeader;
