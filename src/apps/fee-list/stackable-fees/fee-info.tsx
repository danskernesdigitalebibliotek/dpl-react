import React, { FC, ReactNode } from "react";
import AuthorYear from "../../../components/author-year/authorYear";
import { Cover } from "../../../components/cover/cover";
import { BasicDetailsType } from "../../../core/utils/types/basic-details-type";

interface FeeInfoProps {
  material: BasicDetailsType;
  isbnForCover: string;
  children: ReactNode;
}
const FeeInfo: FC<FeeInfoProps> = ({ material, isbnForCover, children }) => {
  const {
    authors = "",
    materialType = "",
    year = "",
    title = "",
    description = "",
    pid = "",
    series = ""
  } = material;
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
          <h3 className="text-header-h4">{title}</h3>
          <p className="text-small-caption color-secondary-gray">
            <AuthorYear author={authors || ""} year={year || ""} />
          </p>
          <p className="text-small-caption color-secondary-gray">{series}</p>
        </div>
        <div />
        {children}
      </div>
    </div>
  );
};

export default FeeInfo;
