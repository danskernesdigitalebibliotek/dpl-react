import React, { FC, ReactNode } from "react";
import { getAuthorNames, getMaterialInfo } from "../../utils/helpers";
import { LoanMetaDataType } from "../../../../core/utils/helpers/LoanMetaDataType";
import { GetMaterialManifestationQuery } from "../../../../core/dbc-gateway/generated/graphql";
import { useText } from "../../../../core/utils/text";
import { Cover } from "../../../../components/cover/cover";
import { Pid } from "../../../../core/utils/types/ids";

interface MaterialInfoProps {
  loanMetaData: LoanMetaDataType;
  material: GetMaterialManifestationQuery;
  children: ReactNode;
}

const MaterialInfo: FC<MaterialInfoProps> = ({
  loanMetaData,
  material,
  children
}) => {
  const t = useText();
  const { creators, loanType, year, materialTitle, pid, description } =
    getMaterialInfo(loanMetaData, material);

  return (
    <div className="list-reservation__material">
      <div>
        <Cover
          pid={pid as Pid}
          size="small"
          animate={false}
          description={description}
        />
      </div>
      <div className="list-reservation__information">
        <div>
          <div className="status-label status-label--outline">{loanType}</div>
        </div>
        <div className="list-reservation__about">
          <h3 className="text-header-h4">{materialTitle}</h3>
          <p className="text-small-caption color-secondary-gray">
            {creators &&
              getAuthorNames(
                creators,
                t("loanListMaterialByAuthorText"),
                t("loanListMaterialAndAuthorText")
              )}{" "}
            {year && <>({year})</>}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default MaterialInfo;
