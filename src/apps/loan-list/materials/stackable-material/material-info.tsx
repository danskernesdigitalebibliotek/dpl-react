import React, { FC, ReactNode } from "react";
import AuthorYear from "../../../../components/author-year/authorYear";
import { Cover } from "../../../../components/cover/cover";
import { BasicDetailsType } from "../../../../core/utils/types/basic-details-type";

interface MaterialInfoProps {
  material: BasicDetailsType;
  isbnForCover: string;
  periodical?: string | null;
  children?: ReactNode;
  openDetailsModal: () => void;
}

const MaterialInfo: FC<MaterialInfoProps> = ({
  material,
  isbnForCover,
  periodical,
  openDetailsModal,
  children
}) => {
  const { authors, materialType, year, title, description, pid, series } =
    material || {};
  const coverId = pid || isbnForCover;

  return (
    <div className="list-reservation__material">
      <div>
        <Cover
          id={coverId}
          idType={pid ? "pid" : "isbn"}
          size="small"
          animate={false}
          description={description || ""}
        />
      </div>
      <div className="list-reservation__information">
        <div>
          <div className="status-label status-label--outline">
            {materialType}
          </div>
        </div>
        <div className="list-reservation__about">
          <button
            onClick={openDetailsModal}
            type="button"
            className="list-reservation__header color-secondary-gray"
          >
            {title}
          </button>
          <p
            data-cy="reservation-about-author"
            className="text-small-caption color-secondary-gray"
          >
            <AuthorYear author={authors || ""} year={year || ""} />
          </p>
          {periodical && (
            <p
              data-cy="reservation-about-periodical"
              className="text-small-caption color-secondary-gray"
            >
              {periodical}
            </p>
          )}
          {series && (
            <p
              data-cy="reservation-about-series"
              className="text-small-caption color-secondary-gray"
            >
              {series}
            </p>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MaterialInfo;
