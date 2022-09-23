import React, { FC, ReactNode } from "react";
import { Cover } from "../../../../components/cover/cover";
import { Pid } from "../../../../core/utils/types/ids";
import { BasicDetailsType } from "../../../../core/utils/types/basic-details-type";

interface MaterialInfoProps {
  material: BasicDetailsType;
  children?: ReactNode;
}

const MaterialInfo: FC<MaterialInfoProps> = ({ material, children }) => {
  const { authors, pid, materialType, description, year, title } = material;

  return (
    <div className="list-reservation__material">
      <div>
        <Cover
          pid={pid as Pid}
          size="small"
          animate={false}
          description={description || ""}
        />
      </div>
      <div className="list-reservation__information">
        {materialType && (
          <div>
            <div className="status-label status-label--outline">
              {materialType}
            </div>
          </div>
        )}
        <div className="list-reservation__about">
          <h3 className="text-header-h4">{title}</h3>
          <p className="text-small-caption color-secondary-gray">
            {authors && authors}
            {year && <>({year})</>}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default MaterialInfo;
